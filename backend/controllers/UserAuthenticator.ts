import { IUserSession } from "./dtos";
import { UserModel } from "../models/UserModel";
import encryptor from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'
import sessionsRepository, { SessionsRepository } from "./SessionsRepository";


export class UserAuthenticator {
    constructor(sessionDuration?: number, overwrite?: boolean) {
        this.userModel = new UserModel();
        this.sessionsRepo = sessionsRepository
        this.sessionDuration = sessionDuration || 30 * 60 * 1000 //30 mins * 60 seconds * 1000 millis  
        this.overwrite = overwrite === false ? false : true //default true 
    }

    private userModel = new UserModel();
    private sessionsRepo: SessionsRepository;
    private sessionDuration: number;
    private overwrite: boolean;

    async authenticateWithCredentials(uuid: string, username: string, password: string, overwrite?: boolean, duration?: number): Promise<IUserSession> {
        overwrite ||= overwrite === false ? false : this.overwrite
        duration ||= this.sessionDuration
        const foundUser = await this.userModel.getUserByName(username)
        if (foundUser.uuid === uuid && foundUser.username === username && await encryptor.compare(password, foundUser.password)) {
            this.sessionsRepo.sessions = this.sessionsRepo.sessions.filter(s => s.username != username)
            return await this.generateSession(username, password, overwrite)
        }
        else throw new Error('Wrong credentials')
        //there is no stored sesson on server
    }
    async authenticateWithSession(session: IUserSession, duration?: number): Promise<boolean> {
        duration ||= this.sessionDuration

        const foundSession = this.sessionsRepo.sessions.find(s => s.id == session.id)
        if (foundSession && new Date(foundSession.expires).getTime() > new Date().getTime()) {
            this.renewSession(foundSession, duration)
            return true
        }
        return false
    }
    async authenticateWithCookie(cookies: any): Promise<boolean> {
        return cookies.session && await this.authenticateWithSession(JSON.parse(cookies) as IUserSession)
    }

    async generateSession(username: string, password: string, overwrite?: boolean, duration?: number): Promise<IUserSession> {
        overwrite ||= overwrite === false ? false : this.overwrite
        duration ||= this.sessionDuration

        try {
            const foundUser = await this.userModel.getUserByName(username)
            const newSession = {
                ...foundUser,
                expires: new Date(new Date().getTime() + duration),
                id: uuidv4()
            }
            if (await encryptor.compare(password, foundUser.password!)) {
                if (overwrite)//logout other instances of same user
                    this.sessionsRepo.sessions.filter(session => session.username != newSession.username)
                this.sessionsRepo.sessions.push(newSession)
                return newSession
            }
            else throw new Error('Wrong Password')
        }
        catch (err) {
            console.error((err as Error).message);
            throw err
        }

    }
    renewSession(session: IUserSession, duration?: number): IUserSession {
        duration ||= this.sessionDuration

        for (let i = 0; i < this.sessionsRepo.sessions.length; i++)
            if (this.sessionsRepo.sessions[i] === session) {
                const renewedSession = {
                    ...session, expires: new Date(new Date().getTime() + duration)
                }
                //extend session
                this.sessionsRepo.sessions[i] = renewedSession
                return renewedSession
            }
        return session //fix compiler warning

    }
    logout(session: IUserSession, overwrite: boolean = true) {
        //remove session from list if (overwrite == true) remove all sessions of same user
        this.sessionsRepo.sessions = this.sessionsRepo.sessions.filter(s => overwrite ? !(s.id === session.id && s.username === session.username) : !(s.id === session.id))
    }

    validatePassword(password: string): boolean {
        return password.length >= 6 //just length
    }

}
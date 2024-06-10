import { DB } from "../core/DB";
import { IUser } from "./IUser";
import { v4 as uuidv4 } from 'uuid';

export class UserModel extends DB {

    getAllUsers: () => Promise<IUser[]> = async () => {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users', [])
            return rows
        }
        catch {
            throw new Error('Database error at getAllUsers')
        }
    }
    getUser: (uuid: string) => Promise<IUser> = async (uuid: string) => {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users where uuid=? limit 1', [uuid])
            return rows[0] as IUser
        }
        catch {
            throw new Error('Database error at getUser')
        }
    }

    getUserByName: (username: string) => Promise<IUser> = async (username: string) => {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users where username=? limit 1', [username])
            return rows[0] as IUser
        }
        catch {
            throw new Error('Database error at getUserByName')
        }
    }

    createUser: (user: any) => Promise<IUser> = async (user: any) => {
        try {

            await this.connection.query('insert into users (uuid,username,password) values (?,?,?)', [uuidv4(), user.username, user.password])
            return await this.getUser(user.uuid)
        }
        catch (err) {
            throw new Error('Database error at createUser')
        }
    }

    updateUserUsername: (uuid: string, newUsername: string) => Promise<IUser> = async (uuid: string, newUsername: string) => {
        try {
            await this.connection.query('update users set username=? where uuid=? limit 1', [newUsername, uuid])
            return await this.getUser(uuid)
        }
        catch (err) {
            throw new Error('Database error at updateUserUsername')
        }

    }

    updateUserPassword: (uuid: string, newPassword: string) => Promise<IUser> = async (uuid: string, newPassword: string) => {
        try {
            await this.connection.query('update users set password=? where uuid=? limit 1', [newPassword, uuid])
            return await this.getUser(uuid)
        }
        catch (err) {
            throw new Error('Database error at updateUserPassword')
        }

    }

    deleteUser: (uuid: string) => Promise<boolean> = async (uuid: string) => {
        try {
            await this.connection.query('delete from users where uuid=? limit 1', [uuid])
            return true
        }
        catch (err) {
            throw new Error('Database error at deleteUser')
        }
    }

}

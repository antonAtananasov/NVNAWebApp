import { DB } from "../core/DB";
import { IUser } from "./IUser";
import { v4 as uuidv4 } from 'uuid';

export class UserModel extends DB {
    // public getAllUsers = async () => {
    //     const [rows] = await this.connection.query<IUser[]>('select * from users')
    //     return rows
    // }

    public getUser = async (uuid: string) => {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users where uuid=? limit 1', [uuid])
            return rows[0]
        }
        catch {
            throw new Error('Database error')
        }
    }

    public getUserByName: (username: string) => Promise<IUser> = async (username: string) => {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users where username=? limit 1', [username])
            return rows[0]
        }
        catch {
            throw new Error('Database error')
        }
    }

    public createUser: (user: any) => Promise<void> = async (user: any) => {
        try {
            await this.connection.query('insert into users (uuid,username,password) values (?,?,?)', [uuidv4(), user.username, user.password])
        }
        catch (err) {
            throw new Error('Database error')
        }
    }

}

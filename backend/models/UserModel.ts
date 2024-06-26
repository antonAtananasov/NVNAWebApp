import { DB } from "../core/DB";
import { IUser } from "./IUser";
import { v4 as uuidv4 } from 'uuid';

export class UserModel extends DB {

    async getAllUsers(): Promise<IUser[]> {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users', [])
            return rows
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getAllUsers')
        }
    }
    async getUser(uuid: string): Promise<IUser> {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users where uuid=? limit 1', [uuid])
            return rows[0] as IUser
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getUser')
        }
    }

    async getUserByName(username: string): Promise<IUser> {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users where username=? limit 1', [username])
            return rows[0] as IUser
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getUserByName')
        }
    }

    async createUser(user: any): Promise<IUser> {
        try {

            await this.connection.query('insert into users (uuid,username,password) values (?,?,?)', [uuidv4(), user.username, user.password])
            return await this.getUser(user.uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at createUser')
        }
    }

    async updateUserUsername(uuid: string, newUsername: string): Promise<IUser> {
        try {
            await this.connection.query('update users set username=? where uuid=? limit 1', [newUsername, uuid])
            return await this.getUser(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at updateUserUsername')
        }

    }

    async updateUserPassword(uuid: string, newPassword: string): Promise<IUser> {
        try {
            await this.connection.query('update users set password=? where uuid=? limit 1', [newPassword, uuid])
            return await this.getUser(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at updateUserPassword')
        }

    }

    async deleteUser(uuid: string): Promise<boolean> {
        try {
            await this.connection.query('delete from users where uuid=? limit 1', [uuid])
            return true
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at deleteUser')
        }
    }

}

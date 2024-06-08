import { DB } from "../core/DB";
import { IUser } from "./IUser";

export class UserModel extends DB {
    public getAllUsers = async () => {
        const [rows] = await this.connection.query<IUser[]>('select * from users')
        return rows
    }
    public getUser = async (uuid: string) => {
        const [rows] = await this.connection.query<IUser[]>('select * from users where uuid=? limit 1', [uuid])
        return rows[0]
    }

}

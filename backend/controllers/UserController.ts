import { IUser } from "./IUser";
import { UserModel } from "../models/UserModel";
import encryptor from 'bcrypt';

export class UserController {
    private userModel: UserModel
    constructor() {
        this.userModel = new UserModel();
    }

    // getAllUsers: () => Promise<IUser[]> = async () => {
    //     return await this.userModel.getAllUsers() as IUser[];
    // }

    getUser: (id: string) => Promise<IUser> = async (uuid: string) => {
        return await this.userModel.getUser(uuid) as IUser;
    }
    getUserByName: (username: string) => Promise<IUser> = async (username: string) => {
        return await this.userModel.getUserByName(username) as IUser;
    }

    createUser: (user: IUser) => void = async (user: IUser) => {
        try {
            const hashedPassword = await encryptor.hash(user.password!, 10)
            return await this.userModel.createUser({ ...user, password: hashedPassword });
        }
        catch (err) {
            throw err
        }
    }
}
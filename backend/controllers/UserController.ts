import { IUser } from "./IUser";
import { UserModel } from "../models/UserModel";
import encryptor from 'bcrypt';

export class UserController {
    private userModel: UserModel
    constructor() {
        this.userModel = new UserModel();
    }

    getUser: (id: string) => Promise<IUser> = async (uuid: string) => {
        try {
            return await this.userModel.getUser(uuid) as IUser;
        }
        catch (err) {
            throw new Error('UserController: getUser: ' + (err as Error).message)
        }
    }
    getUserByName: (username: string) => Promise<IUser> = async (username: string) => {
        try {
            return await this.userModel.getUserByName(username) as IUser;
        }
        catch (err) {
            throw new Error('UserController: getUserByName: ' + (err as Error).message)
        }
    }

    createUser: (user: IUser) => void = async (user: IUser) => {
        try {
            const hashedPassword = await encryptor.hash(user.password!, 10)
            return await this.userModel.createUser({ ...user, password: hashedPassword });
        }
        catch (err) {
            throw new Error('UserController: createUser: ' + (err as Error).message)
        }
    }

    updateUserUsername: (uuid: string, username: string) => Promise<boolean> = async (uuid: string, username: string) => {
        try {
            return await this.userModel.updateUserUsername(uuid, username)
        }
        catch (err) {
            throw new Error('UserController: updateUserUsername: ' + (err as Error).message)
        }
    }
    updateUserPassword: (uuid: string, password: string) => Promise<boolean> = async (uuid: string, password: string) => {
        try {
            const hashedPassword = await encryptor.hash(password, 10)
            return await this.userModel.updateUserPassword(uuid, hashedPassword)
        }
        catch (err) {
            throw new Error('UserController: updateUserPassword: ' + (err as Error).message)
        }
    }
}
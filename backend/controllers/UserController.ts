import { IUser } from "./IUser";
import { UserModel } from "../models/UserModel";

export class UserController {
    private userModel: UserModel
    constructor() {
        this.userModel = new UserModel();
    }

    getAllUsers: () => Promise<IUser[]> = async () => {
        return await this.userModel.getAllUsers() as IUser[];
    }

    getUser: (id: string) => Promise<IUser> = async (uuid: string) => {
        return await this.userModel.getUser(uuid) as IUser;
    }
}
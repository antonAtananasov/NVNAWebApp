import { RowDataPacket } from "mysql2"
import { IUser as IUserDto } from "../controllers/dtos"

export interface IUser extends RowDataPacket { // how a row from the database maps to a javascript object
    uuid: string
    username: string
    password: string
    creationDate?: string //dates are received as strings  //database creates them by default
    planId?: number //database creates them by default
    planStartDate?: string //dates are received as strings //database creates them by default
}
export function convertToDto(obj: any): IUserDto[] {
    return obj.map((o: any) => ({
        ...o,
        creationDate: o.creation_date,
        planId: o.plan_id,
        plsnStartDate: o.plan_start_date

    } as IUserDto))
}

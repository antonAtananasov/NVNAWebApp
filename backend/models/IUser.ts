import { RowDataPacket } from "mysql2"

export interface IUser extends RowDataPacket { // how a row from the database maps to a javascript object
    uuid: string
    username: string
    password: string
    creationDate?: string //dates are received as strings  //database creates them by default
    planId?: number //database creates them by default
    planStartDate?: string //dates are received as strings //database creates them by default
}
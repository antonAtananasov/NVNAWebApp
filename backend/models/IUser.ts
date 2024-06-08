import { RowDataPacket } from "mysql2"

export interface IUser extends RowDataPacket { // how a row from the database maps to a javascript object
    uuid: string
    username: string
    password: string
    creationDate: string //dates are received as strings
    planId: number
    planStartDate: string //dates are received as strings
}
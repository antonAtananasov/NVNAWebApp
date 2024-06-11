import { RowDataPacket } from "mysql2"

export interface ISharedDocument extends RowDataPacket { //binds a document id to another user's id that is not the owner's
    id?: number // not using uuid as this only creates a unique key for value pairs
    documentUUID: string
    username: string
    permission: Permission //the type of permission (read, write, share, etc...); will be handled as enum later on
}
export enum Permission {
    READ = 'read',
    WRITE = 'write',
}
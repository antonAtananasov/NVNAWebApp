import { QueryResult, RowDataPacket } from "mysql2"

export interface IDocument extends RowDataPacket { // how a row from the database maps to a javascript object
    uuid: string
    ownerUUID: string
    name: string
    format?: string //allowed to be null or undefined
    content?: string //allowed to be null or undefined
    rootDocumentUUID?: string //points to the folder that contains this file
    isFolder?: boolean //differentiates files from folders
    creationDate?: string //dates are received as strings
    lastModifiedDate?: string //dates are received as strings
    lastAccessedDate?: string //dates are received as strings
    size?: number //file size in MB (0 for folder)
}
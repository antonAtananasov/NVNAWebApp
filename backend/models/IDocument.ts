import { QueryResult, RowDataPacket } from "mysql2"
import { IDocument as IDocumentDto } from "../controllers/dtos"

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
export interface IDocumentSize extends RowDataPacket {
    size: number
}
export function convertToDto(obj: any): IDocumentDto[] {
    return obj.map((o: any) => ({
        ...o,
        uuid: o.uuid,
        ownerUUID: o.owner_uuid,
        name: o.name,
        rootDocumentUUID: o.root_document_id,
        creationDate: o.creation_date,
        lastAccessedDate: o.last_accessed_date,
        lastModifiedDate: o.last_modified_date,
        size: o.size
    } as IDocumentDto
    ))
}

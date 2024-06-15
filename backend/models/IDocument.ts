import { RowDataPacket } from "mysql2"
import { IDocument as IDocumentDto } from "../controllers/dtos"

export interface IDocument extends RowDataPacket { // how a row from the database maps to a javascript object
    uuid: string
    owner_uuid: string
    name: string
    format?: string //allowed to be null or undefined
    content?: Buffer //allowed to be null or undefined
    root_document_uuid?: string //points to the folder that contains this file
    is_folder?: boolean //differentiates files from folders
    creation_date?: string //dates are received as strings
    last_modified_date?: string //dates are received as strings
    last_accessed_date?: string //dates are received as strings
    size?: number //file size in MB (0 for folder)
}
export interface IDocumentSize extends RowDataPacket {
    size: number
}
export function convertToDto(obj: IDocument[]): IDocumentDto[] {
    return obj.map((o: IDocument) => {
        const doc: IDocumentDto = {
            uuid: o.uuid,
            ownerUUID: o.owner_uuid,
            name: o.name,
            rootDocumentUUID: o.root_document_id,
            creationDate: o.creation_date,
            lastAccessedDate: o.last_accessed_date,
            lastModifiedDate: o.last_modified_date,
            size: o.size,
            content: new TextDecoder().decode(o.content)
        }
        return doc
    })
}

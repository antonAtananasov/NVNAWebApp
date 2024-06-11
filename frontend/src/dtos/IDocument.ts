export interface IDocument {
    uuid: string
    ownerUUID: string
    name: string
    format?: string
    content?: string
    rootDocumentUUID?: string
    isFolder?: boolean
    creationDate?: string
    lastModifiedDate?: string
    lastAccessedDate?: string
    size?: number
}
export interface ICreateDocumentRequest {
    name: string
    ownerUUID: string
    format?: string
    content?: string
    rootDocumentUUID?: string
    isFolder?: boolean

}
export interface IShareDocumentRequest {
    documentUUID: string,
    username: string,
    permission: Permission
}
export interface IUpdateDocumentContentRequest {
    uuid: string,
    content: string
}
export interface ISharedDocument { //binds a document id to another user's id that is not the owner's
    id?: number // not using uuid as this only creates a unique key for value pairs
    documentUUID: string
    username: string
    permission: Permission //the type of permission (read, write, share, etc...); will be handled as enum later on
}
export enum Permission {
    READ = 'read',
    WRITE = 'write',
}
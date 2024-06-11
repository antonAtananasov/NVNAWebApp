export interface IPlan {
    id: number //not using uuid, because it is not unsafe for plans to be visible by an incremented number
    storage: number//in megabytes
    cost: number//in BGN
    planName: string
}
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
export interface IRenameDocumentRequest {
    uuid: string, newName: string
}
export interface IUser { // how an object from the model maps to an object in the controller
    uuid?: string
    username: string
    password?: string
    creationDate?: string //dates are received as strings
    planId?: number
    planStartDate?: string //dates are received as strings
}
export interface IUserCredentials { // how an object from the model maps to an object in the controller
    username: string
    password: string
}
export interface IUserChangeCredentialsRequest extends IUserCredentials { // how an object from the model maps to an object in the controller
    newUsername?: string
    newPassword?: string
}
export interface IUserSession {
    expires: Date, //when the session becomes invalid
    id: string //session uuid
    uuid: string
    username: string
    creationDate?: string //dates are received as strings
    planId?: number
    planStartDate?: string //dates are received as strings

}

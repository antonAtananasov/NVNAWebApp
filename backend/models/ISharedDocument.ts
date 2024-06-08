export interface ISharedDocument { //binds a document id to another user's id that is not the owner's
    id?: number // not using uuid as this only creates a unique key for value pairs
    documentUUID: string
    userUUID: string
    permission: string //the type of permission (read, write, share, etc...); will be handled as enum later on
}
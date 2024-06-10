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
import { DB } from "../core/DB";
import { IDocument, IDocumentSize } from "./IDocument";
import { IPlan } from "./IPlan";
import { v4 as uuidv4 } from 'uuid';
import { ISharedDocument, Permission } from "./ISharedDocument";
import { IUser } from "./IUser";


export class DocumentModel extends DB {

    getAllDocuments: () => Promise<IDocument[]> = async () => {
        try {
            const [rows] = await this.connection.query<IDocument[]>('SELECT uuid,owner_uuid,name,format,root_document_uuid,is_folder,creation_date,last_modified_date,last_accessed_date, d.size FROM documents', [])
            return rows
        }
        catch {
            throw new Error('Database error at getAllDocuments')
        }
    }

    getDocument: (uuid: string) => Promise<IDocument> = async (uuid: string) => {
        try {
            const [rows] = await this.connection.query<IDocument[]>('select * from documents where uuid=? limit 1', [uuid])
            return rows[0]
        }
        catch {
            throw new Error('Database error at getDocument')
        }
    }

    getSharedDocumentsByUser: (uuid: string) => Promise<IDocument[]> = async (uuid: string) => {
        try {
            const [rows] = await this.connection.query<IDocument[]>(
                'SELECT d.uuid,d.owner_uuid,d.name,d.format,d.root_document_uuid,d.is_folder,d.creation_date,d.last_modified_date,d.last_accessed_date, d.size FROM documents d left JOIN shared_documents s ON s.document_uuid = d.uuid where d.owner_uuid=?',
                [uuid]
            )
            return rows
        }
        catch {
            throw new Error('Database error at getSharedDocumentsByUser')
        }
    }
    getReceivedDocumentsByUser: (uuid: string) => Promise<IDocument[]> = async (uuid: string) => {
        try {
            const [rows] = await this.connection.query<IDocument[]>(
                'SELECT d.uuid,d.owner_uuid,d.name,d.format,d.root_document_uuid,d.is_folder,d.creation_date,d.last_modified_date,d.last_accessed_date, d.size FROM documents d JOIN shared_documents s ON s.document_uuid = d.uuid where s.user_uuid = ? ',
                [uuid]
            )
            return rows
        }
        catch {
            throw new Error('Database error at getReceivedDocumentsByUser')
        }
    }

    getDocumentsByUser: (uuid: string, includeShared?: boolean) => Promise<IDocument[]> = async (uuid: string, includeShared?: boolean) => {
        try {
            let foundDocuments: IDocument[] = [];
            const [ownedDocuments] = await this.connection.query<IDocument[]>(
                'SELECT uuid,owner_uuid,name,format,root_document_uuid,is_folder,creation_date,last_modified_date,last_accessed_date, d.size FROM documents WHERE user_uuid=?',
                [uuid]
            )
            foundDocuments.push(...ownedDocuments)
            if (includeShared) {
                const shared_documents = await this.getSharedDocumentsByUser(uuid)
                if (shared_documents)
                    foundDocuments.push(...shared_documents)
            }
            return foundDocuments
        }
        catch {
            throw new Error('Database error at getDocumentsByUser')
        }
    }

    getTotalDocumentsSizeByUser: (uuid: string) => Promise<number> = async (uuid: string) => {
        try {
            const [rows] = await this.connection.query<IDocumentSize[]>('select sum(size) from documents where owner_uuid=? group by owner_uuid limit 1', [uuid])
            return rows[0].size
        }
        catch (err) {
            throw new Error('Database error at getTotalDocumentsSizeByUser')
        }
    }

    getFolderContents: (uuid: string) => Promise<IDocument[]> = async (uuid: string) => {
        try {
            const folder = await this.getDocument(uuid)
            if (!folder)
                throw new Error('Folder not found')
            if (!folder.isFolder)
                throw new Error('Requested document is not a folder')

            const [rows] = await this.connection.query<IDocument[]>('select * from documents where root_document_id=?', [uuid])
            return rows
        }
        catch (err) {
            throw new Error('Database error at getTotalDocumentsSizeByUser')
        }
    }

    createDocument: (document: any) => Promise<IDocument> = async (document: IDocument) => {
        try {
            const uuid = uuidv4()
            await this.connection.query('insert into documents (uuid,owner_uuid,format,content,root_document_uuid,isFolder,size) values (?,?,?,?,?,?,?)', [
                uuid,
                document.name,
                document.ownerUUID,
                document.format,
                document.content,
                document.rootDocumentUUID,
                document.isFolder,
                document.size
            ])
            return await this.getDocument(uuid)
        }
        catch (err) {
            throw new Error('Database error at createDocument')
        }
    }

    updateDocumentName: (uuid: string, newName: string) => Promise<IDocument> = async (uuid: string, newName: string) => {
        try {
            await this.connection.query('update documents set name=?,last_modified_date=current_timestamp where uuid=? limit 1', [newName, uuid])
            return await this.getDocument(uuid)
        }
        catch (err) {
            throw new Error('Database error at updateDocumentName')
        }
    }

    updateDocumentContent: (uuid: string, newContent: string) => Promise<IDocument> = async (uuid: string, newContent: string) => {
        try {
            await this.connection.query('update documents set content=?,last_modified_date=current_timestamp where uuid=? limit 1', [newContent, uuid])
            return await this.getDocument(uuid)
        }
        catch (err) {
            throw new Error('Database error at updateDocumentContent')
        }
    }

    accessDocument: (uuid: string) => Promise<IDocument> = async (uuid: string) => {
        try {
            const [rows] = await this.connection.query<IDocument[]>('update documents set last_accessed_date=current_timestamp where uuid=? limit 1', [uuid])
            return await this.getDocument(uuid)
        }
        catch {
            throw new Error('Database error at accessDocument')
        }
    }

    deleteDocument: (uuid: string) => Promise<IDocument> = async (uuid: string) => {
        try {
            await this.connection.query('delete from documents where uuid=? limit 1', [uuid])
            return await this.getDocument(uuid)
        }
        catch (err) {
            throw new Error('Database error at deleteDocument')
        }
    }

    async shareDocument(uuid: string, userUUID: string, permission: Permission): Promise<IDocument> {
        const sharedDocumentRecord: ISharedDocument = {
            documentUUID: uuid, userUUID, permission
        } as ISharedDocument
        try {
            await this.connection.query('insert into shared_documents (document_uuid, user_uuid, permission) values (?,?,?)', [uuid, userUUID, permission])
            return await this.getDocument(uuid)
        }
        catch (err) {
            throw new Error('Database error at shareDocument')
        }
    }
    async getPlan(id: number): Promise<IPlan> {
        try {
            const [rows] = await this.connection.query<IPlan[]>('select * from plans where id = ? limit 1', [id])
            return rows[0] as IPlan
        }
        catch (err) {
            throw new Error('Database error at getPlan')
        }
    }
    async getUserByDocument(uuid: string): Promise<IUser> {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users u join documents d on d.owner_uuid=u.uuid where d.uuid=?', [uuid])
            return rows[0] as IUser
        }
        catch (err) {
            throw new Error('Database error at getUserByDocument')
        }
    }
    async getUser(uuid: string): Promise<IUser> {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users uuid=?', [uuid])
            return rows[0] as IUser
        }
        catch (err) {
            throw new Error('Database error at getUser')
        }
    }
}

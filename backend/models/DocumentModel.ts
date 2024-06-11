import { DB } from "../core/DB";
import { IDocument, IDocumentSize } from "./IDocument";
import { IPlan } from "./IPlan";
import { v4 as uuidv4 } from 'uuid';
import { ISharedDocument, Permission } from "./ISharedDocument";
import { IUser } from "./IUser";
import { IRenameDocumentRequest, IShareDocumentRequest, IUpdateDocumentContentRequest } from "../controllers/dtos";


export class DocumentModel extends DB {

    async getAllDocuments(): Promise<IDocument[]> {
        try {
            const [rows] = await this.connection.query<IDocument[]>('SELECT uuid,owner_uuid,name,format,root_document_uuid,is_folder,creation_date,last_modified_date,last_accessed_date, d.size FROM documents', [])
            return rows
        }
        catch {
            throw new Error('Database error at getAllDocuments')
        }
    }

    async getDocument(uuid: string): Promise<IDocument> {
        try {
            const [rows] = await this.connection.query<IDocument[]>('select * from documents where uuid=? limit 1', [uuid])
            return rows[0]
        }
        catch {
            throw new Error('Database error at getDocument')
        }
    }

    async getSharedDocumentsByUser(uuid: string): Promise<IDocument[]> {
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
    async getReceivedDocumentsByUser(uuid: string): Promise<IDocument[]> {
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

    async getDocumentsByUser(uuid: string, includeShared?: boolean): Promise<IDocument[]> {
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

    async getTotalDocumentsSizeByUser(uuid: string): Promise<number> {
        try {
            const [rows] = await this.connection.query<IDocumentSize[]>('select sum(size) from documents where owner_uuid=? group by owner_uuid limit 1', [uuid])
            return rows[0].size
        }
        catch (err) {
            throw new Error('Database error at getTotalDocumentsSizeByUser')
        }
    }

    async getFolderContents(uuid: string): Promise<IDocument[]> {
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

    async createDocument(document: any): Promise<IDocument> {
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

    async updateDocumentName(renReq: IRenameDocumentRequest) {
        try {
            await this.connection.query('update documents set name=?,last_modified_date=current_timestamp where uuid=? limit 1', [renReq.newName, renReq.uuid])
            return await this.getDocument(renReq.uuid)
        }
        catch (err) {
            throw new Error('Database error at updateDocumentName')
        }
    }

    async updateDocumentContent(updateContentReq: IUpdateDocumentContentRequest): Promise<IDocument> {
        try {
            await this.connection.query('update documents set content=?,last_modified_date=current_timestamp,size=? where uuid=? limit 1', [updateContentReq.content, updateContentReq.uuid, updateContentReq.content.length])
            return await this.getDocument(updateContentReq.uuid)
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

    async shareDocument(shareReq: IShareDocumentRequest): Promise<IDocument> {
        const [rows] = await this.connection.query<IUser[]>('select * from users where username=? limit 1', [shareReq.username])
        const targetUserUUID = rows[0].uuid
        try {
            await this.connection.query('insert into shared_documents (document_uuid, user_uuid, permission) values (?,?,?)', [shareReq.documentUUID, targetUserUUID, shareReq.permission])
            return await this.getDocument(shareReq.documentUUID)
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
    async unshareDocument(uuid: string): Promise<ISharedDocument> {
        try {
            const [rows] = await this.connection.query<ISharedDocument[]>('delete from shared_documents where document_uuid=?', [uuid])
            return rows[0] as ISharedDocument
        }
        catch (err) {
            throw new Error('Database error at getUser')
        }
    }
}

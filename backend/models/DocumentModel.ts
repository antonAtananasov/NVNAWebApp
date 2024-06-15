import { DB } from "../core/DB";
import { IDocument, IDocumentSize, convertToDto as convertDocumentResultToDto } from "./IDocument";
import { IPlan, convertToDto as convertPlanResultToDto } from "./IPlan";
import { v4 as uuidv4 } from 'uuid';
import { ISharedDocument, convertToDto as convertSharedDocResultToDto } from "./ISharedDocument";
import { IUser, convertToDto as convertUserResultToDto } from "./IUser";
import { IRenameDocumentRequest, IShareDocumentRequest, IUpdateDocumentContentRequest, IUser as IUserDto, IDocument as IDocumentDto, IPlan as IPlanDto } from "../controllers/dtos";


export class DocumentModel extends DB {


    async getAllDocuments(): Promise<IDocumentDto[]> {
        try {
            const [rows] = await this.connection.query<IDocument[]>('SELECT uuid,owner_uuid,name,format,root_document_uuid,is_folder,creation_date,last_modified_date,last_accessed_date,size FROM documents', [])
            return convertDocumentResultToDto(rows)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getAllDocuments')
        }
    }

    async getDocument(uuid: string, withContent?: boolean): Promise<IDocumentDto> {
        if (withContent === undefined)//default is true
            withContent = true
        try {
            const [rows] = withContent ?
                await this.connection.query<IDocument[]>('select * from documents where uuid=? limit 1', [uuid]) :
                await this.connection.query<IDocument[]>('SELECT d.uuid,d.owner_uuid,d.name,d.format,d.root_document_uuid,d.is_folder,d.creation_date,d.last_modified_date,d.last_accessed_date, d.size FROM documents d', [uuid])
            return convertDocumentResultToDto(rows)[0]
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getDocument')
        }
    }

    async getSharedDocumentsByUser(uuid: string): Promise<IDocumentDto[]> {
        try {
            const [rows] = await this.connection.query<IDocument[]>(
                'SELECT d.uuid,d.owner_uuid,d.name,d.format,d.root_document_uuid,d.is_folder,d.creation_date,d.last_modified_date,d.last_accessed_date, d.size FROM documents d left JOIN shared_documents s ON s.document_uuid = d.uuid where d.owner_uuid=?',
                [uuid]
            )
            return convertDocumentResultToDto(rows)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getSharedDocumentsByUser')
        }
    }
    async getReceivedDocumentsByUser(uuid: string): Promise<IDocumentDto[]> {
        try {
            const [rows] = await this.connection.query<IDocument[]>(
                'SELECT d.uuid,d.owner_uuid,d.name,d.format,d.root_document_uuid,d.is_folder,d.creation_date,d.last_modified_date,d.last_accessed_date, d.size FROM documents d JOIN shared_documents s ON s.document_uuid = d.uuid where s.owner_uuid = ? ',
                [uuid]
            )
            return convertDocumentResultToDto(rows)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getReceivedDocumentsByUser')
        }
    }

    async getDocumentsByUser(uuid: string, includeShared?: boolean): Promise<IDocumentDto[]> {
        try {
            let foundDocuments: IDocumentDto[] = [];
            const [ownedDocuments] = await this.connection.query<IDocument[]>(
                'SELECT uuid,owner_uuid,name,format,root_document_uuid,is_folder,creation_date,last_modified_date,last_accessed_date,size FROM documents WHERE owner_uuid=?',
                [uuid]
            )
            foundDocuments.push(...ownedDocuments)
            if (includeShared) {
                const shared_documents = await this.getSharedDocumentsByUser(uuid)
                if (shared_documents)
                    foundDocuments.push(...shared_documents)
            }
            return convertDocumentResultToDto(foundDocuments)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getDocumentsByUser')
        }
    }

    async getTotalDocumentsSizeByUser(uuid: string): Promise<number> {
        try {
            const [rows] = await this.connection.query<IDocumentSize[]>('select sum(size) from documents where owner_uuid=? group by owner_uuid limit 1', [uuid])
            return convertDocumentResultToDto(rows)[0].size || 0
        }
        catch (err) {
            console.error((err as Error).message);
            return 0
        }
    }

    async getFolderContents(uuid: string): Promise<IDocumentDto[]> {
        try {
            const folder = await this.getDocument(uuid)
            if (!folder)
                throw new Error('Folder not found')
            if (!folder.isFolder)
                throw new Error('Requested document is not a folder')

            const [rows] = await this.connection.query<IDocument[]>('select * from documents where root_document_id=?', [uuid])
            return convertDocumentResultToDto(rows)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getTotalDocumentsSizeByUser')
        }
    }

    async createDocument(document: any): Promise<IDocumentDto> {
        try {
            const uuid = uuidv4()
            await this.connection.query<IDocument[]>('insert into documents (uuid,name,owner_uuid,format,content,root_document_uuid,is_folder,size) values (?,?,?,?,?,?,?,?)', [
                uuid,
                document.name,
                document.ownerUUID,
                document.format,
                document.content,
                document.rootDocumentUUID,
                document.isFolder,
                document.size / 1000
            ])
            return await this.getDocument(uuid, false)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at createDocument')
        }
    }

    async updateDocumentName(renReq: IRenameDocumentRequest): Promise<IDocumentDto> {
        try {
            await this.connection.query('update documents set name=?,last_modified_date=current_timestamp where uuid=? limit 1', [renReq.newName, renReq.uuid])
            return await this.getDocument(renReq.uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at updateDocumentName')
        }
    }

    async updateDocumentContent(updateContentReq: IUpdateDocumentContentRequest): Promise<IDocumentDto> {
        try {
            await this.connection.query('update documents set content=?,last_modified_date=current_timestamp,size=? where uuid=? limit 1', [updateContentReq.content, updateContentReq.content.length, updateContentReq.uuid])
            return await this.getDocument(updateContentReq.uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at updateDocumentContent')
        }
    }

    accessDocument: (uuid: string) => Promise<IDocumentDto> = async (uuid: string) => {
        try {
            const [rows] = await this.connection.query<IDocument[]>('update documents set last_accessed_date=current_timestamp where uuid=? limit 1', [uuid])
            return await this.getDocument(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at accessDocument')
        }
    }

    deleteDocument: (uuid: string) => Promise<IDocumentDto> = async (uuid: string) => {
        try {
            const findDoc = await this.getDocument(uuid)
            if (findDoc)
                await this.connection.query('delete from documents where uuid=? limit 1', [uuid])
            return findDoc
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at deleteDocument')
        }
    }

    async shareDocument(shareReq: IShareDocumentRequest): Promise<IDocumentDto> {
        const [rows] = await this.connection.query<IUser[]>('select * from users where username=? limit 1', [shareReq.username])
        const targetUserUUID = rows[0].uuid
        try {
            await this.connection.query('insert into shared_documents (document_uuid, owner_uuid, permission) values (?,?,?)', [shareReq.documentUUID, targetUserUUID, shareReq.permission])
            return await this.getDocument(shareReq.documentUUID)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at shareDocument')
        }
    }
    async getPlan(id: number): Promise<IPlanDto> {
        try {
            const [rows] = await this.connection.query<IPlan[]>('select * from plans where id = ? limit 1', [id])
            return convertPlanResultToDto(rows)[0]
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getPlan')
        }
    }
    async getUserByDocument(uuid: string): Promise<IUserDto> {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users u join documents d on d.owner_uuid=u.uuid where d.uuid=?', [uuid])
            return convertUserResultToDto(rows)[0]
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getUserByDocument')
        }
    }
    async getUser(uuid: string): Promise<IUserDto> {
        try {
            const [rows] = await this.connection.query<IUser[]>('select * from users where uuid=?', [uuid])
            return convertUserResultToDto(rows)[0]
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getUser')
        }
    }
    async unshareDocument(uuid: string): Promise<ISharedDocument> {
        try {
            const [rows] = await this.connection.query<ISharedDocument[]>('delete from shared_documents where document_uuid=?', [uuid])
            return convertSharedDocResultToDto(rows)[0] as ISharedDocument
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('Database error at getUser')
        }
    }
}

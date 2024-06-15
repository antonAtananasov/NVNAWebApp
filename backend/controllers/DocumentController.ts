import { DocumentModel } from "../models/DocumentModel";
import { ICreateDocumentRequest, IDocument, IShareDocumentRequest, IUpdateDocumentContentRequest, IPlan, IUser, IRenameDocumentRequest } from "./dtos";
import { v4 as uuidv4 } from 'uuid'
import { ISharedDocument } from "./dtos";

enum Permission {
    READ = 'read',
    WRITE = 'write'
}
export class DocumentController {
    private documentModel: DocumentModel
    constructor() {
        this.documentModel = new DocumentModel();
    }

    async createDocument(docReq: ICreateDocumentRequest): Promise<IDocument> {
        const doc: IDocument = {
            ...docReq,
            content: docReq.content || '',
            isFolder: docReq.isFolder || false,
            size: docReq.content?.length || 0,
            uuid: ''
        }
        try {
            return await this.documentModel.createDocument(doc) as IDocument
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: createDocument: ' + (err as Error).message)
        }
    }

    async getDocument(uuid: string): Promise<IDocument> {
        try {
            return await this.documentModel.accessDocument(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getDocument: ' + (err as Error).message)
        }

    }
    async getAllDocumentsByUser(userUUID: string): Promise<IDocument[]> {
        try {
            return await this.documentModel.getDocumentsByUser(userUUID)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getAllDocumentsByUser: ' + (err as Error).message)
        }

    }
    async shareDocument(shareReq: IShareDocumentRequest): Promise<IDocument> {
        try {
            return await this.documentModel.shareDocument(shareReq)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: shareDocument: ' + (err as Error).message)
        }

    }

    async getFolderContents(uuid: string): Promise<IDocument[]> {
        try {
            return await this.documentModel.getFolderContents(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getFolderContents: ' + (err as Error).message)
        }
    }
    async getSharedDocuments(userUUID: string): Promise<IDocument[]> {
        try {
            return await this.documentModel.getSharedDocumentsByUser(userUUID)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getSharedDocuments: ' + (err as Error).message)
        }
    }
    async getReceivedDocuments(uuid: string): Promise<IDocument[]> {
        try {
            return await this.documentModel.getReceivedDocumentsByUser(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getReceivedDocuments: ' + (err as Error).message)
        }
    }
    async getOccupiedStorage(uuid: string): Promise<number> {
        try {
            return await this.documentModel.getTotalDocumentsSizeByUser(uuid) || 0
        }
        catch (err) {
            console.error((err as Error).message);
            return 0
        }
    }
    async getPlan(id: number): Promise<IPlan> {
        try {
            return await this.documentModel.getPlan(id)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getPlan: ' + (err as Error).message)
        }
    }
    async getUserByDocument(uuid: string): Promise<IUser> {
        try {
            return await this.documentModel.getUserByDocument(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getUserByDocument: ' + (err as Error).message)
        }
    }
    async getUser(uuid: string): Promise<IUser> {
        try {
            return await this.documentModel.getUser(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getUser: ' + (err as Error).message)
        }
    }
    async updateDocumentContent(updateReq: IUpdateDocumentContentRequest): Promise<IDocument> {
        try {
            return await this.documentModel.updateDocumentContent(updateReq)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getUser: ' + (err as Error).message)
        }
    }
    async renameDocument(newName: IRenameDocumentRequest): Promise<IDocument> {
        try {
            return await this.documentModel.updateDocumentName(newName)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getUser: ' + (err as Error).message)
        }
    }

    async deleteDocument(uuid: string): Promise<IDocument> {
        try {
            return await this.documentModel.deleteDocument(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getUser: ' + (err as Error).message)
        }
    }
    async unshareDocument(uuid: string): Promise<ISharedDocument> {
        try {
            return await this.documentModel.unshareDocument(uuid)
        }
        catch (err) {
            console.error((err as Error).message);
            throw new Error('DocumentController: getUser: ' + (err as Error).message)
        }
    }





}
import { DocumentModel } from "../models/DocumentModel";
import { IDocument, IShareDocumentRequest } from "./IDocument";
import { v4 as uuidv4 } from 'uuid'
import { IPlan } from "./IPlan";
import { IUser } from "./IUser";
import { ISharedDocument } from "./IDocument";

enum Permission {
    READ = 'read',
    WRITE = 'write'
}
export class DocumentController {
    private documentModel: DocumentModel
    constructor() {
        this.documentModel = new DocumentModel();
    }

    async createDocument(ownerUUID: string, name: string, content: string | undefined, isFolder: boolean, size: number | undefined): Promise<IDocument> {
        content ||= ''
        size ||= 0
        const document: IDocument = {
            uuid: uuidv4(),
            ownerUUID,
            name,
            content,
            isFolder
        } as IDocument
        try {
            return await this.documentModel.createDocument(document) as IDocument
        }
        catch (err) {
            throw new Error('DocumentController: createDocument: ' + (err as Error).message)
        }
    }

    async getDocument(uuid: string): Promise<IDocument> {
        try {
            return await this.documentModel.accessDocument(uuid)
        }
        catch (err) {
            throw new Error('DocumentController: getDocument: ' + (err as Error).message)
        }

    }
    async shareDocument(shareReq: IShareDocumentRequest): Promise<IDocument> {
        try {
            return await this.documentModel.shareDocument(shareReq)
        }
        catch (err) {
            throw new Error('DocumentController: shareDocument: ' + (err as Error).message)
        }

    }

    async getFolderContents(uuid: string): Promise<IDocument[]> {
        try {
            return await this.documentModel.getFolderContents(uuid)
        }
        catch (err) {
            throw new Error('DocumentController: getFolderContents: ' + (err as Error).message)
        }
    }
    async getSharedDocuments(userUUID: string): Promise<IDocument[]> {
        try {
            return await this.documentModel.getSharedDocumentsByUser(userUUID)
        }
        catch (err) {
            throw new Error('DocumentController: getSharedDocuments: ' + (err as Error).message)
        }
    }
    async getReceivedDocuments(uuid: string): Promise<IDocument[]> {
        try {
            return await this.documentModel.getReceivedDocumentsByUser(uuid)
        }
        catch (err) {
            throw new Error('DocumentController: getReceivedDocuments: ' + (err as Error).message)
        }
    }
    async getOccupiedStorage(uuid: string): Promise<number> {
        try {
            return await this.documentModel.getTotalDocumentsSizeByUser(uuid)
        }
        catch (err) {
            throw new Error('DocumentController: getOccupiedStorage: ' + (err as Error).message)
        }
    }
    async getPlan(id: number): Promise<IPlan> {
        try {
            return await this.documentModel.getPlan(id)
        }
        catch (err) {
            throw new Error('DocumentController: getPlan: ' + (err as Error).message)
        }
    }
    async getUserByDocument(uuid: string): Promise<IUser> {
        try {
            return await this.documentModel.getUserByDocument(uuid)
        }
        catch (err) {
            throw new Error('DocumentController: getUserByDocument: ' + (err as Error).message)
        }
    }
    async getUser(uuid: string): Promise<IUser> {
        try {
            return await this.documentModel.getUser(uuid)
        }
        catch (err) {
            throw new Error('DocumentController: getUser: ' + (err as Error).message)
        }
    }
    async updateDocumentContent(uuid: string, content: string): Promise<IDocument> {
        try {
            return await this.documentModel.updateDocumentContent(uuid, content)
        }
        catch (err) {
            throw new Error('DocumentController: getUser: ' + (err as Error).message)
        }
    }

    async deleteDocument(uuid: string): Promise<IDocument> {
        try {
            return await this.documentModel.deleteDocument(uuid)
        }
        catch (err) {
            throw new Error('DocumentController: getUser: ' + (err as Error).message)
        }
    }
    async unshareDocument(uuid: string): Promise<ISharedDocument> {
        try {
            return await this.documentModel.unshareDocument(uuid)
        }
        catch (err) {
            throw new Error('DocumentController: getUser: ' + (err as Error).message)
        }
    }





}
import { DocumentModel } from "../models/DocumentModel";
import { IDocument } from "./IDocument";
import { v4 as uuidv4 } from 'uuid'
import { UserAuthenticator } from "./UserAuthenticator";
import { PlanModel } from "../models/PlanModel";
import { UserController } from "./UserController";

enum Permission {
    READ = 'read',
    WRITE = 'write'
}
export class DocumentController {
    private documentModel: DocumentModel
    constructor() {
        this.documentModel = new DocumentModel();
    }

    async createDocument(ownerUUID: string, name: string, content: string, isFolder: boolean): Promise<boolean> {
        const document: IDocument = {
            uuid: uuidv4(),
            ownerUUID,
            name,
            content,
            isFolder
        } as IDocument
        try {
            return await this.documentModel.createDocument(document)
        }
        catch (err) {
            throw new Error('DocumentController: createDocument: ' + (err as Error).message)
        }
    }

    async getDocument(uuid: string): Promise<IDocument> {
        try {
            return await this.documentModel.getDocument(uuid)
        }
        catch (err) {
            throw new Error('DocumentController: getDocument: ' + (err as Error).message)
        }

    }
    async shareDocument(uuid: string, userUUID: string, permission: Permission): Promise<boolean> {
        try {
            return await this.documentModel.shareDocument(uuid, userUUID, permission)
        }
        catch (err) {
            throw new Error('DocumentController: shareDocument: ' + (err as Error).message)
        }

    }


}
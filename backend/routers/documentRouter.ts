import { Router } from "express";
import { UserAuthenticator } from "../controllers/UserAuthenticator";
import { DocumentController } from "../controllers/DocumentController";
import { IDocument } from "../controllers/IDocument";
import { IUserSession } from "../controllers/IUser";

const documentRouter = Router()
const userAuthenticator = new UserAuthenticator()
const documentController = new DocumentController()

documentRouter.get('/', (req, res) => {
    res.send('hello documents')//verify controller serving requests

    //GET
    //read document
    documentRouter.get('/:userUUID/:documentUUID', async (req, res) => {
        const documentUUID = req.params.documentUUID
        const userUUID = req.params.userUUID
        try {
            if (!req.cookies.session) {
                res.status(401).send('Session not found or expired')
                return
            }
            const session = JSON.parse(req.cookies.session) as IUserSession

            const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
            if (userHasActiveSession) {
                const document = await documentController.getDocument(documentUUID) as IDocument
                if (document) {
                    if (!document.isFolder) {
                        if (document.ownerUUID === userUUID && session.uuid === userUUID) {
                            res.status(200).send(JSON.stringify(document))
                            return
                        }
                    }
                    else {
                        res.status(400).send('Is a directory')
                        return
                    }
                }
                else {
                    res.status(404).send('Document not found')
                    return
                }
            }
            else {
                res.status(401).send('Wrong session')
                return
            }
        }
        catch (err) {
            res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
            return
        }
    })

    //get folder contents
    documentRouter.get('/:userUUID/folder/:documentUUID', async (req, res) => {
        const documentUUID = req.params.documentUUID
        const userUUID = req.params.userUUID
        try {
            if (!req.cookies.session) {
                res.status(401).send('Session not found or expired')
                return
            }
            const session = JSON.parse(req.cookies.session) as IUserSession

            const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
            if (userHasActiveSession) {
                const document = await documentController.getDocument(documentUUID) as IDocument
                if (document) {
                    if (document.isFolder) {
                        if (document.ownerUUID === userUUID && session.uuid === userUUID) {
                            const folderContents = documentController.getFolderContents(documentUUID)
                            res.status(200).send(JSON.stringify(folderContents))
                            return
                        }
                    }
                    else {
                        res.status(400).send('Is a document')
                        return
                    }
                }
                else {
                    res.status(404).send('Document not found')
                    return
                }
            }
            else {
                res.status(401).send('Wrong session')
                return
            }
        }
        catch (err) {
            res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
            return
        }
    })

    //getSharedDocuments (outgoing)
    documentRouter.get('/:userUUID/shared', async (req, res) => {
        const userUUID = req.params.userUUID
        try {
            if (!req.cookies.session) {
                res.status(401).send('Session not found or expired')
                return
            }
            const session = JSON.parse(req.cookies.session) as IUserSession

            const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
            if (userHasActiveSession) {
                const documents = await documentController.getSharedDocuments(userUUID) as IDocument[]
                res.status(200).send(JSON.stringify(documents))
                return
            }
            else {
                res.status(401).send('Wrong session')
                return
            }
        }
        catch (err) {
            res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
            return
        }
    })
    //getReceivedDocuments (incoming)
    documentRouter.get('/:userUUID/received', async (req, res) => {
        const userUUID = req.params.userUUID
        try {
            if (!req.cookies.session) {
                res.status(401).send('Session not found or expired')
                return
            }
            const session = JSON.parse(req.cookies.session) as IUserSession

            const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
            if (userHasActiveSession && userUUID === session.uuid) {
                const documents = await documentController.getReceivedDocuments(userUUID) as IDocument[]
                res.status(200).send(JSON.stringify(documents))
                return
            }
            else {
                res.status(401).send('Wrong session')
                return
            }
        }
        catch (err) {
            res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
            return
        }
    })

    //POST
    //createDocument
    documentRouter.post('/:userUUID/', async (req, res) => {
        const userUUID = req.params.userUUID
        try {
            if (!req.cookies.session) {
                res.status(401).send('Session not found or expired')
                return
            }
            const session = JSON.parse(req.cookies.session) as IUserSession

            const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
            if (userHasActiveSession && session.uuid === userUUID) {
                const user = await documentController.getUser(userUUID)
                const occupiedStorage = await documentController.getOccupiedStorage(userUUID)
                const plan = await documentController.getPlan(user.planId || 0)
                const newDocument: IDocument = {
                    ownerUUID: userUUID,
                    name: req.body.name,
                    isFolder: req.body.isFolder,
                    content: req.body.content
                } as IDocument
                if (plan.storage > occupiedStorage + (newDocument.content?.length || 0)) {

                    const document = await documentController.createDocument(userUUID, newDocument.name, newDocument.content, newDocument.isFolder || false, newDocument.content?.length)
                    res.status(200).send(JSON.stringify(document))
                    return
                }
                else {
                    res.status(401).send('Not enough space')
                    return
                }
            }
            else {
                res.status(401).send('Wrong session')
                return
            }
        }
        catch (err) {
            res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
            return
        }
    })

    //shareDocument


    //PUT
    //updateDocument


    //DELETE
    //deleteDocument
    //unshareDocument

})

export default documentRouter;
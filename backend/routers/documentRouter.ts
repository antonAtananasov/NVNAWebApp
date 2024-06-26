import { Router } from "express";
import { UserAuthenticator } from "../controllers/UserAuthenticator";
import { DocumentController } from "../controllers/DocumentController";
import { ICreateDocumentRequest, IDocument, IRenameDocumentRequest, IShareDocumentRequest, IUpdateDocumentContentRequest, IUserSession } from "../controllers/dtos";

const documentRouter = Router()
const userAuthenticator = new UserAuthenticator()
const documentController = new DocumentController()

documentRouter.get('/', (req, res) => {
    res.send('hello documents')//verify controller serving requests
})
//GET
//get all documents of user
documentRouter.get('/gallery', async (req, res) => {
    try {
        if (!req.cookies.session) {
            res.status(401).send('Session not found or expired')
            return
        }
        const session = JSON.parse(req.cookies.session) as IUserSession

        const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
        if (userHasActiveSession) {
            const result = await documentController.getAllDocumentsByUser(session.uuid)
            res.status(200).send(result)
            return
        }
        else {
            res.status(401).send('Wrong session')
            return
        }
    }
    catch (err) {
        console.error((err as Error).message);
        res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
        return
    }
})

//get folder contents
documentRouter.get('/folder/:documentUUID', async (req, res) => {
    const documentUUID = req.params.documentUUID
    try {
        if (!req.cookies.session) {
            res.status(401).send('Session not found or expired')
            return
        }
        const session = JSON.parse(req.cookies.session) as IUserSession

        const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
        if (userHasActiveSession) {
            const userUUID = session.uuid

            if (documentUUID) {
                const document = await documentController.getDocument(documentUUID) as IDocument
                if (document) {
                    if (document.isFolder) {
                        if (document.ownerUUID === userUUID && session.uuid == userUUID) {
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
                documentController.getAllDocumentsByUser(session.uuid)
            }
        }
        else {
            res.status(401).send('Wrong session')
            return
        }
    }
    catch (err) {
        console.error((err as Error).message);
        res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
        return
    }
})

//read document
documentRouter.get('/document/:documentUUID', async (req, res) => {
    const documentUUID = req.params.documentUUID
    try {
        if (!req.cookies.session) {

            res.status(401).send('Session not found or expired')
            return
        }
        const session = JSON.parse(req.cookies.session) as IUserSession

        const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
        if (userHasActiveSession) {
            const userUUID = session.uuid

            const document = await documentController.getDocument(documentUUID) as IDocument
            if (document) {
                if (!document.isFolder) {
                    if (document.ownerUUID == userUUID && session.uuid == userUUID) {
                        res.status(200).send(JSON.stringify(document))
                        return
                    }
                    else {
                        res.status(401).send()
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
        console.error((err as Error).message);
        res.status(500).send("documentController: get /: " + (err as Error).message)
        return
    }
})


//getSharedDocuments (outgoing)
documentRouter.get('/shared/:userUUID', async (req, res) => {
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
        console.error((err as Error).message);
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
        console.error((err as Error).message);
        res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
        return
    }
})


//POST
//createDocument
documentRouter.post('/:userUUID', async (req, res) => {
    const newDocument: ICreateDocumentRequest = {
        ownerUUID: req.params.userUUID,
        name: req.body.name,
        isFolder: req.body.isFolder || false,
        content: req.body.content || ''
    } as IDocument

    try {
        if (!req.cookies.session) {
            res.status(401).send('Session not found or expired')
            return
        }
        const session = JSON.parse(req.cookies.session) as IUserSession

        const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
        const authorized = userHasActiveSession && session.uuid == newDocument.ownerUUID
        if (authorized) {
            const user = await documentController.getUser(newDocument.ownerUUID)
            const occupiedStorage = await documentController.getOccupiedStorage(newDocument.ownerUUID)
            const plan = await documentController.getPlan(user.planId || 0)
            if (plan.storage > occupiedStorage + (newDocument.content?.length || 0) / 1000) {

                const doc = await documentController.createDocument(newDocument)
                res.status(200).send(JSON.stringify(doc))
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
        console.error((err as Error).message);
        res.status(500).send("documentController: get /:userUUID: " + (err as Error).message)
        return
    }
})

//shareDocument
documentRouter.post('/share', async (req, res) => {
    try {
        const shareReq: IShareDocumentRequest = {
            documentUUID: req.body.uuid,
            username: req.body.userUUID,
            permission: req.body.permission
        }
        if (!req.cookies.session) {
            res.status(401).send('Session not found or expired')
            return
        }
        const session = JSON.parse(req.cookies.session) as IUserSession
        const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
        const doc = await documentController.getDocument(shareReq.documentUUID)
        if (!doc) {
            res.status(404).send()
        }
        if (userHasActiveSession && session.uuid == doc.ownerUUID) {

            const sharedDoc = await documentController.shareDocument(shareReq)
            if (sharedDoc) {
                res.status(200).send(sharedDoc)
                return
            }
            else {
                res.status(500).send()
                return
            }
        }
        else {
            res.status(401).send()
        }
    }
    catch (err) {
        console.error((err as Error).message);
        res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
        return
    }
})


//PUT
//updateDocumentContent
documentRouter.put('/:documentUUID', async (req, res): Promise<boolean> => {

    const updateDocumentContent: IUpdateDocumentContentRequest = {
        uuid: req.params.documentUUID,
        content: req.body.content,
    }
    const updateDocumentName: IRenameDocumentRequest = {
        uuid: req.params.documentUUID,
        newName: req.body.newName,
    }

    if (!updateDocumentName.newName && !updateDocumentContent.content) {
        res.status(400).send('No provided data to update document')
        return false
    }
    else {

        try {
            if (!req.cookies.session) {
                res.status(401).send('Session not found or expired')
                return false
            }
            else {
                const session = JSON.parse(req.cookies.session) as IUserSession
                const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
                const doc = await documentController.getDocument(updateDocumentContent.uuid)
                if (!doc) {
                    res.status(404).send()
                    return false
                }
                else {
                    if (userHasActiveSession && session.uuid == doc.ownerUUID) {

                        let docUpdatedContent: IDocument | undefined;
                        if (updateDocumentContent.content) {
                            docUpdatedContent = await documentController.updateDocumentContent(updateDocumentContent)
                            if (!docUpdatedContent) {
                                res.status(500).send()
                                return false
                            }
                        }
                        if (updateDocumentName.newName) {
                            docUpdatedContent = await documentController.renameDocument(updateDocumentName)
                            if (!docUpdatedContent) {
                                res.status(500).send()
                                return false
                            }

                        }

                        if (docUpdatedContent) {
                            res.status(200).send(docUpdatedContent)
                            return false
                        } else {
                            res.status(500).send('Unknown error')
                            return false
                        }

                    }
                    else {
                        res.status(401).send()
                        return false
                    }
                }
            }
        }
        catch (err) {
            console.error((err as Error).message);
            res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
            return false
        }
    }
})


//DELETE
//deleteDocument
documentRouter.delete('/:documentUUID', async (req, res) => {
    const documentUUID = req.params.documentUUID
    try {
        if (!req.cookies.session) {
            res.status(401).send('Session not found or expired')
            return
        }
        const session = JSON.parse(req.cookies.session) as IUserSession
        const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
        const doc = await documentController.getDocument(documentUUID)
        if (!doc) {
            res.status(404).send()
        }
        if (userHasActiveSession && session.uuid == doc.ownerUUID) {

            const target = await documentController.deleteDocument(documentUUID)
            if (target) {
                res.status(200).send(target)
                return
            }
            else {
                res.status(500).send()
                return
            }
        }
        else {
            res.status(401).send()
        }
    }
    catch (err) {
        console.error((err as Error).message);
        res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
        return
    }

})
//unshareDocument
documentRouter.delete('/:userUUID/shared', async (req, res) => {
    const documentUUID = req.params.userUUID //the id key of the share record in the database
    try {
        if (!req.cookies.session) {
            res.status(401).send('Session not found or expired')
            return
        }
        const session = JSON.parse(req.cookies.session) as IUserSession
        const userHasActiveSession = await userAuthenticator.authenticateWithSession(session)
        if (userHasActiveSession) {
            const doc = (await documentController.getSharedDocuments(session.uuid)).find(d => d.ownerUUID == documentUUID)
            if (!doc) {
                res.status(404).send('Document not found')
                return
            }

            const updatedDoc = await documentController.unshareDocument(documentUUID)
            if (updatedDoc) {
                res.status(200).send(updatedDoc)
                return
            }
            else {
                res.status(500).send()
                return
            }
        }
        else {
            res.status(401).send('Unauthorized')
            return
        }
    }
    catch (err) {
        console.error((err as Error).message);
        res.status(500).send("documentController: get /:userUUID/:documentUUID: " + (err as Error).message)
        return
    }

})


export default documentRouter;
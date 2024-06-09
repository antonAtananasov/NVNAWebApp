import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { IUser, IUserSession } from "../controllers/IUser";
import { UserAuthenticator } from "../controllers/UserAuthenticator";

const userRouter = Router()
const userController = new UserController()
const userAuthenticator = new UserAuthenticator()

//GET
userRouter.get('/', async (req, res) => { //test serving endpoint
    res.send('Hello users')
    // res.send(JSON.stringify(await userController.getAllUsers())) //unsecure
})

userRouter.get('/session', async (req, res) => { //test session authentication
    if (req.cookies.session) {//there is a session cookie
        const session: IUserSession = JSON.parse(req.cookies.session) as IUserSession
        const isSessionActive = await userAuthenticator.authenticateWithSession(session)
        if (isSessionActive) {//session exists and is active
            res.send('Session is active for user ' + session.username + ' until ' + session.expires)
            return
        }
        else { //session is not saved on server or expired
            res.send('Session not found or expired')
            return
        }
    }
    else { // no session cookie
        res.status(401).send('Session not found')
        return
    }
})

userRouter.get('/:uuid', async (req, res) => { //get user data
    if (req.cookies.session) { // there is a session cookie
        const session: IUserSession = JSON.parse(req.cookies.session) as IUserSession
        const isSessionActive = await userAuthenticator.authenticateWithSession(session)
        if (isSessionActive) { // session is stored on server and is active
            const uuid: string = req.params.uuid
            if (uuid !== session.uuid) { //the requesting user not is the requested target 
                res.status(401).send('User not authorized to perform this action')
                return
            }
            else {//the requesting user is the requested target 
                const user = await userController.getUser(uuid)
                res.status(200).send(JSON.stringify(user))
                return
            }
        }
        else { //session is not stored on server or expired
            res.status(401).send('Session expired')
            return
        }
    }
    else { //no session cookie
        res.status(401).send('Session not found')
        return
    }
})


//POST
userRouter.post('/', async (req, res) => { //create new user
    const user: IUser = {
        username: req.body.username,
        password: req.body.password
    }
    if (!userAuthenticator.validatePassword(req.body.password)) //password does not match the requirements
    {
        res.status(400).send('Password does not match the requirements')
        return
    }
    else
        try {
            const foundUser = await userController.getUserByName(user.username)
            if (!foundUser) { // user does not exist in the database
                userController.createUser(user)
                res.status(200).send()
                return
            }
            else { // user already exists
                res.status(401).send('User with that username already exists.')
                return
            }
        }
        catch (err) {
            res.status(500).send('UserRouter: post /: ' + (err as Error).message)
            return
        }
})

userRouter.post('/login', async (req, res) => { // login and create session
    const { username, password } = req.body
    try {
        const foundUser = await userController.getUserByName(username)
        if (!foundUser) { //no such user in the database
            res.status(404).send('No such user found')
            return
        }
        else // user is found in the database
            try {
                const session: IUserSession = await userAuthenticator.authenticateWithCredentials(username, password)
                if (session) { // user is successfully authenticated and new session is created
                    const sessionJSON = JSON.stringify(session)
                    res.status(200).cookie('session', sessionJSON).send(sessionJSON)
                    return
                }
                else { //user did not send correct credentials
                    res.status(401).send('Wrong password')
                    return
                }

            }
            catch (err) {
                res.status(400).send('UserRouter: post /login: ' + (err as Error).message)
                return
            }

    }
    catch (err) {
        res.status(500).send('UserRouter: post /login: ' + (err as Error).message)
        return
    }
})


//PUT
userRouter.put('/:uuid', async (req, res) => { //change user data (password or username)
    const { username, password } = req.body
    if (!(username && password)) {
        res.status(400).send('No credentials sent')
        return
    }
    let { newUsername, newPassword } = req.body
    if (!(newUsername || newPassword)) {
        res.status(400).send('No new credentials sent')
        return
    }
    else
        try {
            const foundUser = await userController.getUser(req.params.uuid)
            if (!foundUser) { //user with given uuid is not found in the database
                res.status(404).send('No such user found')
                return
            }
            else //user is found on the database
                try {
                    let session: IUserSession
                    try {
                        session = await userAuthenticator.authenticateWithCredentials(username, password) //require password, not session
                    }
                    catch {
                        res.status(400).send('Wrong credentials')
                        return
                    }
                    if (session) {// user sent correct credentials

                        if (newUsername && newUsername.length > 6) // user requests new username
                            if (!await userController.getUserByName(newUsername)) // username is not already taken
                                try { await userController.updateUserUsername(req.params.uuid, newUsername) }
                                catch (err) {
                                    res.status(500).send('UserRouter: put /:uuid: ' + (err as Error).message)
                                    return
                                }
                            else {
                                res.status(400).send('Username is already taken')
                                return
                            }
                        else newUsername = username
                        if (newPassword) // user requests new password
                            if (userAuthenticator.validatePassword(newPassword)) //password matches validation
                                try { await userController.updateUserPassword(req.params.uuid, newPassword) }
                                catch (err) {
                                    res.status(500).send('UserRouter: put /:uuid: ' + (err as Error).message)
                                    return
                                }
                            else {
                                res.status(400).send('Password does not match the requirements')
                                return
                            }
                        else newPassword = password

                        const newSession = await userAuthenticator.authenticateWithCredentials(newUsername, newPassword)
                        const sessionJSON = JSON.stringify(newSession)
                        res.status(200).cookie('session', sessionJSON).send(sessionJSON)
                        return
                    }
                    else {//user did not send correct credentials
                        res.status(401).send('Wrong password')
                        return
                    }

                }
                catch (err) {
                    res.status(400).send('UserRouter: put /:uuid: ' + (err as Error).message)
                    return
                }

        }
        catch (err) {
            res.status(500).send('UserRouter: put /:uuid: ' + (err as Error).message)
            return
        }
})


//DELETE
userRouter.delete('/login', async (req, res) => { //logout (remove session)
    const session: IUserSession = JSON.parse(req.cookies.session) as IUserSession
    const isUserAuthenticated = await userAuthenticator.authenticateWithSession(session)
    if (!isUserAuthenticated) {
        res.status(401).send('User does not control this session')
        return
    }
    userAuthenticator.logout(session, true)
    res.status(200).send('Session deleted.')
    return
})

userRouter.delete('/:uuid', async (req, res) => { //delete user
    const { username, password } = req.body
    try {
        const session = await userAuthenticator.authenticateWithCredentials(username, password)
        if (session) { // session is stored on server and is active
            const uuid: string = req.params.uuid
            if (uuid !== session.uuid) { //the requesting user not is the requested target 
                res.status(401).send('User not authorized to perform this action')
                return
            }
            else {//the requesting user is the requested target 
                userController.deleteUser(uuid)
                res.status(200).send()
                return
            }
        }
        else { //session is not stored on server or expired
            res.status(401).send('Wrong credentials')
            return
        }
    }
    catch (err) {
        res.status(500).send('UserRouter: delete /:uuid: ' + (err as Error).message)
        return
    }
})



export default userRouter;
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { IUser, IUserSession } from "../controllers/IUser";
import { UserAuthenticator } from "../controllers/UserAuthenticator";

const userRouter = Router()
const userController = new UserController()
const userAuthenticator = new UserAuthenticator()

//GET
userRouter.get('/', async (req, res) => { //
    res.send('Hello users') //test serving endpoint
    // res.send(JSON.stringify(await userController.getAllUsers())) //unsecure
})
userRouter.get('/session', async (req, res) => { //test session authentication
    if (req.cookies.session) {
        const session: IUserSession = JSON.parse(req.cookies.session) as IUserSession
        const isSessionActive = await userAuthenticator.authenticateWithSession(session)
        if (isSessionActive) {
            res.send('Session is active for user ' + session.username + ' until ' + session.expires) //test serving endpoint
            return
        }
        else {
            res.send('Session not found or expired') //test serving endpoint
            return
        }
    }
    else {
        res.status(401).send('Session not found')
        return
    }
    // res.send(JSON.stringify(await userController.getAllUsers())) //unsecure
})


//POST
userRouter.post('/', async (req, res) => { //create new user
    const hashedPassword: string = req.body.password
    const user: IUser = {
        username: req.body.username,
        password: hashedPassword
    }
    try {
        const foundUser = await userController.getUserByName(user.username)
        if (foundUser === null || foundUser === undefined) {
            userController.createUser(user)
            res.status(200).send()
            return
        }
        else {
            res.status(401).send('User with that username already exists.')
            return
        }
    }
    catch (err) {
        res.status(500).send(err)
        return
    }
})

userRouter.post('/login', async (req, res) => { //authenticate
    const { username, password } = req.body
    try {
        const foundUser = await userController.getUserByName(username)
        if (foundUser === null || foundUser === undefined) {
            res.status(404).send('No such user found')
            return
        }
        try {
            const session: IUserSession = await userAuthenticator.authenticateWithCredentials(username, password)
            if (session) {
                res.status(200).cookie('session', JSON.stringify(session)).send('Successfully authenticated user ' + session.username)
                return
            }
            else {
                res.status(401).send('Wrong password')
                return
            }

        }
        catch (err) {
            res.status(401).send((err as Error).message)
            return

        }

    }
    catch (err) {
        res.status(500).send((err as Error).message)
        return
    }
})
userRouter.delete('/login', async (req, res) => { //logout
    const session: IUserSession = JSON.parse(req.cookies.session) as IUserSession
    userAuthenticator.logout(session, true)
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

export default userRouter;
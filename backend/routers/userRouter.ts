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
            res.send('Session is active for user ' + session.username) //test serving endpoint
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

//DELETE

export default userRouter;
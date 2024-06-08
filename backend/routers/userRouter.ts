import { Router } from "express";
import { UserController } from "../controllers/UserController";

import { IUser } from "../controllers/IUser";
const userRouter = Router()
const userController = new UserController()

//GET
userRouter.get('/', async (req, res) => { //
    res.send('Hello users') //test serving endpoint
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
        userController.createUser(user)
        res.status(200).send()
    }
    catch (err) {
        res.status(500).send(err)
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
        if (await userController.authenticate(password, foundUser)) {
            res.status(200).send('Successfully authennticated')
            return
        }
        else {
            res.status(401).send('Wrong password')
            return
        }

    }
    catch {
        res.status(500).send()
        return
    }
})

//PUT

//DELETE

export default userRouter;
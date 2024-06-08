import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router()
const userController = new UserController()

//GET
userRouter.get('/', async (req, res) => {
    res.send(JSON.stringify(await userController.getAllUsers()))
})

userRouter.get('/:uuid', async (req, res) => {
    res.send(JSON.stringify(await userController.getUser(req.params.uuid)))
})

//POST

//PUT

//DELETE

export default userRouter;
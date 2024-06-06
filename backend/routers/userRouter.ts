import { Router } from "express";

const userRouter = Router()

userRouter.get('/', (req, res) => {
    res.send('hello users')//verify controller serving requests
})

export default userRouter;
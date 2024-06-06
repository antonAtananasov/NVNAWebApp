import { Router } from "express";

const documentRouter = Router()

documentRouter.get('/', (req, res) => {
    res.send('hello documents')//verify controller serving requests
})

export default documentRouter;
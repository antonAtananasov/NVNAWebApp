import express, { json } from "express"
import userRouter from "./routers/userRouter";
import documentRouter from "./routers/documentRouter";

const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(json())
app.use(cors())
app.use(cookieParser())


app.get('/', (req, res) => { //to quickly see if the server is handling requests
    res.send('hello world')
})

app.use('/api/users', userRouter) //all requests to localhost:3000/api/users will be redirected to the userRouter script/object
app.use('/api/documents', documentRouter) //all requests to localhost:3000/api/documents will be redirected to the documentRouter script/object


app.listen(3000, () => {
    console.log('Backend running.') // notiy the console that the backend service is running
});

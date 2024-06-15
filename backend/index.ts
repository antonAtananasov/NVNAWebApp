import express, { json } from "express"
import userRouter from "./routers/userRouter";
import documentRouter from "./routers/documentRouter";

const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(json())
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true, // This is required to allow credentials in CORS
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions))
app.use(cookieParser())


app.get('/', (req, res) => { //to quickly see if the server is handling requests
    res.send('hello world')
})

app.use('/api/users', userRouter) //all requests to /api/users will be redirected to the userRouter script/object
app.use('/api/documents', documentRouter) //all requests to /api/documents will be redirected to the documentRouter script/object


const port = 3001
app.listen(port, () => {
    console.info(`Backend running on port ${port}.`) // notiy the console that the backend service is running
});

import express from 'express';
import http from 'http'
const app = express();
import Routes from './routes'
import database from './config/database'
import cors from 'cors'
database()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app);
Routes(app);



server.listen(5000, () => {
    console.log('running on server')
})
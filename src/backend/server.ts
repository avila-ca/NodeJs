import dotenv from 'dotenv';
import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config()

const app = express();
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on('connection', (socket) => {
    console.log(`A user connected ---- id: ${socket.id}`)
    socket.on('message', (data) => {
        console.log(data)
        io.emit('messageResponse', data)
    })
    socket.on('disconnect', () => {
        console.log(`A user disconnected with id: ${socket.id}`)
    })
})

const port = process.env.PORT ?? 4001;

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'helloddd'
    })
})


serverHttp.listen(port, () => {
    console.log(`running on port: ${port}`)
})

import dotenv from 'dotenv';
import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'node:path';

dotenv.config()

const app = express();
const serverHttp = http.createServer(app);

const port = process.env.PORT ?? 4001;

serverHttp.listen(port, () => {
    console.log(`running on port: ${port}`)
})

const io = new Server(serverHttp, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on('connection', (socket) => {
    console.log(`A user connected ---- id: ${socket.id}`)
     socket.on('disconnect', () => {
        console.log(`A user disconnected with id: ${socket.id}`)
    })
    
    socket.on('message', (data) => {
        console.log(data)
        socket.emit('messageToAll', {
            username: data.name,
            message: data.text
          });
        //io.emit('messageResponse', data)
    })

    socket.on('addUser', (username) => {
        socket.data.name = username
        socket.broadcast.emit('newUser', {
            username: username
          });
    })
   
})


app.use(cors());

app.get('/', (req, res) => {
    res.send({ response: "I am alive" }).status(200);
})




import express from 'express';
import { Socket } from 'node:dgram';
import http from 'node:http';
import { Server } from 'socket.io';

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp)

app.get('/', (req, res) => {
    res.send('hello')
})

io.on('connection', (socket) => {
    console.log('A user connected')
})

serverHttp.listen(3000, () => {
    console.log('running on port: 3000')
})

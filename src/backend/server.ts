import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import helmet from 'helmet'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { chatRouter } from '../chat/infrastructure/routes/Routes'
import { auth } from './middleware/auth'

dotenv.config()

const port = process.env.PORT ?? 4001

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

let arrUsers:string[] = [];

io.on('connection', async (socket) => {

    socket.broadcast.emit('wellcome', 'A user has connected!!!')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })

  socket.on('addUser', (data) => {
    console.log(data)
    arrUsers.push(data)
    io.emit('newUser', arrUsers)
  }) 

  socket.on('deletedUser', (data) => {
    console.log(data)
    arrUsers = arrUsers.filter(value => value != data)
    socket.emit('currentUsers', arrUsers)

  })

  socket.on('chat message', async (msg, user) => {
    let result
    io.emit('chat message', msg, user)
  })

})

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use('/', chatRouter)
app.use('/chat', auth, chatRouter)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
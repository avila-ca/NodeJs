import { Router, Request, Response } from 'express'
import { registerController } from './controllers/registerController'
import { loginController } from './controllers/loginController'
import { messageController } from './controllers/messageController'
//import { createChatController } from './controllers/createChatController'

export const chatRouter = Router()

chatRouter.post('/register', registerController) 
chatRouter.post('/login', loginController)
//chatRouter.post('/api/create', createChatController)
chatRouter.post('/chat', messageController)
 
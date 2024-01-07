import { Router, Request, Response } from 'express'
import { registerController } from './controllers/registerController'
import { loginController } from './controllers/loginController'
//import { createChatController } from './controllers/createChatController'
//import { messageController } from './controllers/messageController'

export const chatRouter = Router()
chatRouter.post('/', (req:Request, res:Response) => {
    console.log('hellle');
    
}) 

chatRouter.post('/register', registerController) 
chatRouter.post('/login', loginController)
/* chatRouter.post('/api/create', createChatController)
chatRouter.post('/api/chat', messageController)
 */
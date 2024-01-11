import { Router } from 'express';
import { registerController } from './controllers/registerController';
import { loginController } from './controllers/loginController';
import { messageController } from './controllers/messageController';
import { loadMsgController } from './controllers/loadMsgController';

export const chatRouter = Router();

chatRouter.post('/register', registerController);
chatRouter.post('/login', loginController);
chatRouter.get('/chat/:id', loadMsgController);
chatRouter.post('/chat', messageController);

import { Request, Response } from 'express';
import { useCases } from '../../dependencyInjection';

export const messageController = async (req: Request, res: Response) => {
  const { chatId, users, senderId, text } = req.body;
  try {
    //await message.save();
    //const messages = await messageModel.find({ chatId });
    const messageInfo = await useCases.postMessage({
      chatId: chatId,
      users: users,
      senderId: senderId,
      text: text
    });
    res.status(200).json(messageInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

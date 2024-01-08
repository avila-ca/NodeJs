import { Request, Response } from "express"
import { messageModel } from "../../mongo/mongoMode/messageModel"

export const messageController = async (req: Request, res: Response) => {
    const {chatId, senderId, text}= req.body

    const message = new messageModel({
        chatId, senderId, text
    })

    try {
        await message.save()
        const messages = await messageModel.find({chatId})
        res.status(200).json(messages)
    } catch (error){
        console.log(error);
        res.status(500).json(error)
    }
}
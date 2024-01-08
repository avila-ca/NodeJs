import { Request, Response } from "express"
import { useCases } from "../../dependencyInjection"

export const createChatController = async(req: Request, res: Response) => {
    const {firstId, secondId} = req.body

    try {
        const chat = useCases.findOne({
            members: { $all: [firstId, secondId] }
        })
        if(chat) return res.status(200).json(chat)
/* 
        const newChat = new chatModel({
            members: [firstId, secondId]
        })
 */
        const response = await newChat.save()

        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}
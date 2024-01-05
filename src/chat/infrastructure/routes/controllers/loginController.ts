import { Request, Response } from "express"
import { userModel } from "../../mongoRepository/model/userModel"
import bcrypt from 'bcrypt'
import { createToken } from "./registerController";


export const loginController = async (req:Request, res:Response) => {
    const {userName, userPassword} = req.body
    try {
        let user = await userModel.findOne({userName})

        if(!user) return res.status(400).json('Invalid user name or password')

        const isValidPassword = await bcrypt.compare(userPassword, user.userPassword)

        if(!isValidPassword) return res.status(400).json('Invalid name or password')

        const token = createToken(user._id)

        res.status(200).json({_id:user._id, userName, token})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}
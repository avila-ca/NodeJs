import { userModel } from "../../mongoRepository/model/userModel";
import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Types } from "mongoose";

export const createToken = (_id: Types.ObjectId) => {
    const jwtkey = 'mi clave'
    return jwt.sign({_id}, jwtkey, {expiresIn:"1d"})
}

export const registerController = async (req: Request, res: Response) => {

    try {
        const {userName, userPassword} = req.body
    
        let user = await userModel.findOne({userName})
        if (user) return res.status(400).json("User name already exists")
        if (!userName || !userPassword) return res.status(400).json("All fields are required")
        user = new userModel({userName, userPassword})

        const salt = await bcrypt.genSalt(10)
        user.userPassword = await bcrypt.hash(user.userPassword, salt)

        await user.save()
        const token = createToken(user._id)

        res.status(200).json({_id: user._id, userName, token})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
    
}
import { Router, Request, Response } from 'express'
import { User } from "../../../domain/entity/User";
import { useCases } from "../../dependencyInjection";

export const registerController = async (req: Request, res: Response) => {

    try {
        const {userName, userPassword} = req.body
        const user = await useCases.postRegisterUser({
            userName: userName, 
            userPassword: userPassword
        })
        if (!user) return res.status(400).json("User name already exists")
        if (!userName || !userPassword) return res.status(400).json("All fields are required")
       
        res.status(200).json({userName})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
    
}
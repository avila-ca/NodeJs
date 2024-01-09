import { Types } from "mongoose"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

//const jwtkey = process.env.SECRET_KEY

export const createToken = (_id: Types.ObjectId) => {
    const jwtkey = process.env.SECRET_KEY || 'mi clave'

    return jwt.sign({_id}, jwtkey, {expiresIn:"4m"})
}
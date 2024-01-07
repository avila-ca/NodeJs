import { Schema } from "mongoose"

export interface User {
    id?:string,
    userName:string,
    userPassword?:string,
    token?:string
    message?:string,
    timestamp?:Date
}

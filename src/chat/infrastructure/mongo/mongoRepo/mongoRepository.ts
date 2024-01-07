import { ChatRepository } from "../../../domain/repository/ChatRepository";
import { User } from "../../../domain/entity/User";
import { userModel } from "../mongoMode/chatModel";
import bcrypt from 'bcrypt'

export class MongoChatRepository implements ChatRepository {
   
    async postLoginUser(newUser:User): Promise<User | null> {
        const {userName, userPassword} = newUser
        try {
            if (!userName || !userPassword) return null
            let userLogged = await userModel.findOne({userName})
            if (!userLogged) return null
            const isValidPassword = !userLogged
            ? null
            : bcrypt.compare(userPassword, userLogged.userPassword)
    
            if(!isValidPassword) return null
            
            return {userName: userLogged.userName}
        } catch (error) {
            console.log(error);
            return null
        }
    } 
    async postRegisterUser(newuser: User): Promise<User | null> {
    
        let user = await userModel.findOne({userName: newuser.userName})
        
        if (user) return null
        if (!newuser.userName || !newuser.userPassword) return null
        user = new userModel({userName: newuser.userName, userPassword: newuser.userPassword})

        const salt = await bcrypt.genSalt(10)
        user.userPassword = await bcrypt.hash(user.userPassword, salt)

        await user.save()

        return ({id: user._id.toString(), userName:newuser.userName})
    }
}
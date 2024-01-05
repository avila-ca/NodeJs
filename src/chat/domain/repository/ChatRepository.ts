import { User } from "../entity/User";

export interface ChatRepository{
    postLoginUser(user:User): Promise<User>
    postRegisterUser(user:User): Promise<User>
}
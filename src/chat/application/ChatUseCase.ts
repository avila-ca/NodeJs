import { User } from "../domain/entity/User";
import { ChatRepository } from "../domain/repository/ChatRepository";

export class ChatUseCase {
    constructor(private readonly chatRepository: ChatRepository){}

    async postLoginUser(user:User): Promise<User | null> {
        try {
            const loggedUser = await this.chatRepository.postLoginUser(user);
            return loggedUser
        } catch (error) {
            throw new Error('post login method error')
        }
    }

    async postRegisterUser(user:User): Promise<User | null> {
        try {
            const newuser = await this.chatRepository.postRegisterUser(user);            
            return newuser
        } catch (error) {
            throw new Error('post register method error')
        }
    }
}
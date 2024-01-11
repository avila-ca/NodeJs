import { Message } from '../entity/Message';
import { User } from '../entity/User';

export interface ChatRepository {
  postLoginUser(user: User): Promise<User | null>;
  postRegisterUser(user: User): Promise<User | null>;
  postMessage(messageInfo: Message): Promise<Message | null>;
  getMessages(id: string): Promise<Message[] | null>;
}

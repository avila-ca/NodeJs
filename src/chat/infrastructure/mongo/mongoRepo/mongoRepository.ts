import { ChatRepository } from '../../../domain/repository/ChatRepository';
import { User } from '../../../domain/entity/User';
import { userModel } from '../mongoMode/userModel';
import bcrypt from 'bcrypt';
import { createToken } from '../../../../backend/middleware/createToken';
import { Message } from '../../../domain/entity/Message';
import { messageModel } from '../mongoMode/messageModel';

export class MongoChatRepository implements ChatRepository {
  async postLoginUser(newUser: User): Promise<User | null> {
    const { userName, userPassword } = newUser;
    try {
      if (!userName || !userPassword) return null;
      const userLogged = await userModel.findOne({ userName });
      if (!userLogged) return null;
      const isValidPassword = !userLogged
        ? null
        : bcrypt.compare(userPassword, userLogged.userPassword);

      if (!isValidPassword) return null;

      const token = createToken(userLogged._id);

      return {
        id: userLogged._id.toString(),
        userName: userLogged.userName,
        token: token
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async postRegisterUser(newuser: User): Promise<User | null> {
    const user = await userModel.findOne({ userName: newuser.userName });

    if (user) return null;
    if (!newuser.userName || !newuser.userPassword) return null;
    //user = new userModel({userName: newuser.userName, userPassword: newuser.userPassword})

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newuser.userPassword, salt);

    const userRegistered = {
      userName: newuser.userName,
      userPassword: hashPass
    };
    const createdUser = await userModel.create(userRegistered);
    const token = createToken(createdUser._id);

    return {
      id: createdUser._id.toString(),
      userName: newuser.userName,
      token: token
    };
  }

  async postMessage(messageInfo: Message): Promise<Message | null> {
    //console.log(messageInfo);
    const session = await messageModel.findOne({ chatId: messageInfo.chatId });
    if (!session) return null;
    const createMessage = await messageModel.create(messageInfo);
    if (!createMessage) return null;
    return messageInfo;
  }

  async getMessages(id: string): Promise<Message[] | null> {
    const oldMessages = await messageModel
      .find({ chatId: id })
      .sort({ createdAt: 1 })
      .exec();
    if (!oldMessages) return null;
    return oldMessages;
  }
}

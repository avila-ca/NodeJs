import { ChatUseCase } from "../application/ChatUseCase";
import { MongoChatRepository } from "./mongo/mongoRepo/mongoRepository";

const mongoRepository = new MongoChatRepository();
export const useCases = new ChatUseCase(mongoRepository)
// import { Chat } from "../chat/Chat";
import { ChatLight } from "../shared/liste-chat-light/chat-light/chat-light";

export interface Candidature{
    id: number;
    chat:ChatLight;
    status:string;
}
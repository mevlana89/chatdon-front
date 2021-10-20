import { Chat } from "../chat/Chat";
import { ChatLight } from "../shared/liste-chat-light/chat-light/chat-light";
import { Candidat } from "../utilisateur/candidat";

export interface Candidature{
    id: number;
    chat:ChatLight;
    status:string;
    candidat:Candidat ;
}
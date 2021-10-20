import { Candidat } from "../utilisateur/candidat";
import { Chat } from "../chat/Chat";

export class CreateCandidature{
id: number = 0;
chat:Chat =new Chat();
candidat:Candidat =new Candidat();
status : string ="";
}
import { utilisateur } from "./utilisateur";
import { Chat } from "../chat/Chat";

export class Donateur extends utilisateur {
  chatsProposes : Chat[] = [];
}

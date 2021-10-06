import { Donateur } from "../utilisateur/donateur";
import { PhotoChat } from "./PhotoChat";

export class Chat {

  id: number = 0;
  nom: string = "";
  categorieAge: string = "";
  race: string = "";
  sexe: string = "";
  taille: string = "";
  pelage: string = "";
  caractere: string = "";
  zoneGeo: string = "";
  descriptif: string = "";
  sociableEnfant: boolean = false;
  sociableChat: boolean = false;
  sociableChien: boolean = false;
  // TODO : candidatures: Candidature[];
  lstPhotos: PhotoChat[] = [];
  donateur: Donateur | undefined;

}

 import { Candidature } from "src/app/candidature/candidature.model";
import { PhotoChat } from "./PhotoChat";

export class ChatLight {

    id: number = 0;
    nom: string = "";
    //categorieAge: string = "";
    //race: string = "";
    //sexe: string = "";
    //taille: string = "";
    //pelage: string = "";
    //caractere: string = "";
    //zoneGeo: string = "";
    descriptif: string = "";
    //sociableEnfant: boolean = false;
    //sociableChat: boolean = false;
    //sociableChien: boolean = false;
    // TODO : candidatures: Candidature[];
    lstPhotos: PhotoChat[] = [];
    candidaturesEnCours: Candidature[] = [];
    lstCandidaturesRefusees: Candidature[] = [];
    lstCandidatures: Candidature[] = [];
}

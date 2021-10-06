import { utilisateur } from "./utilisateur";

export class Candidat extends utilisateur {

    typeHebergement: string = "";
    surfaceHebergement: number = 0;
    presenceJardin: boolean = false;
    sociableChat: boolean = false;
    sociableChien: boolean = false;
    nbEnfant: number = 0;
    ageBenjamin: number = 0;

}

import { adresse } from "./adresse";

export abstract class utilisateur {

    id: number = 0;
    nom: string = "";
    prenom: string = "";
    mail: string = "";
    telephone: string = "";
    motDePasse1: string = "";
    motDePasse2: string = "";
    adresseDTO: adresse | undefined ;
  }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PhotoChat } from '../PhotoChat';
import { CARACTERES, CATEGORIES_AGE, PELAGES, RACES, REGIONS, SEXES, TAILLES, DONATEUR } from 'src/app/shared/listes';
import { Chat } from '../Chat';
import { ChatService } from '../chat.service';
import { Donateur } from 'src/app/utilisateur/donateur';

@Component({
  selector: 'app-edit-chat',
  templateUrl: './edit-chat.component.html',
  styleUrls: ['./edit-chat.component.css']
})
export class EditChatComponent implements OnInit {

  leChat: Chat = new Chat();
  addPhoto: string = "";
  public Tailles = TAILLES;
  public Sexes = SEXES;
  public Races = RACES;
  public Cat_Age = CATEGORIES_AGE;
  public Pelages = PELAGES;
  public Caracteres = CARACTERES;
  public Regions = REGIONS;
  modeEdition: boolean = false;

  // éléments des select, vide si nouveau chat, sinon avec valeurs du chat
  raceChat: string = "";
  tailleChat: string = "";
  sexeChat: string = "";
  categorieAgeChat: string = "";
  pelageChat: string = "";
  caractereChat: string = "";
  zoneGeoChat: string = "";

  donateur: Donateur = new Donateur;

  constructor(private serviceChat: ChatService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let role: string | null = localStorage.getItem('role');
    if ((role == null)||(role != DONATEUR)) {
      console.log("Not donateur, go away ! role : " + role);
      this.router.navigate(['/']);
      return;
    }
    let stringDonateur: string | null = localStorage.getItem(DONATEUR);
    if (stringDonateur != null) {
      this.donateur = JSON.parse(stringDonateur);
    } else {
      console.log("profil donateur not found, exit !");
      this.router.navigate(['/']);
      return;
    }
    this.route.paramMap.subscribe(( params: ParamMap) => {
      if (params.get('id') == null) {
        this.leChat.donateur = this.donateur;
        return;
      }
      let chatId: number = parseInt(params.get('id')!);
      this.modeEdition = true;
      this.serviceChat.getChatById(chatId).subscribe(data => {
          this.leChat = data;
          this.raceChat = this.leChat.race;
          this.tailleChat = this.leChat.taille;
          this.sexeChat = this.leChat.sexe;
          this.categorieAgeChat = this.leChat.categorieAge;
          this.pelageChat = this.leChat.pelage;
          this.caractereChat = this.leChat.caractere;
          this.zoneGeoChat = this.leChat.zoneGeo;

          if (this.leChat.donateur?.id != this.donateur.id) {
            console.log("Mauvais donateur ! exit !");
            if (this.leChat != null) {
              if (this.leChat.donateur != null) {
                console.log("leChat.donateur.id = "+ this.leChat.donateur.id + " donateur id = " + this.donateur.id);
              } else {
                console.log("le donateur est null !");
              }
            } else {
              console.log("leChat est null ! ");
            }
            this.router.navigate(['/']);
          }

          if (this.leChat.lstPhotos == null) {
            console.log("pas de photos, init lst");
            this.leChat.lstPhotos = [];
          }

        }
      )
    });
  }

  sauveChat() {
    if (this.modeEdition) {
      this.updateChat();
    } else {
      this.createChat();
    }
  }

  createChat() {
    console.log("debut create");
    if (this.leChat.nom.length == 0){
      console.log("chat sans nom... sortie");
      return;
    }
    console.log(this.leChat.nom + ", " + this.leChat.caractere + ", " + this.leChat.race);
    this.serviceChat.createChat(this.leChat).subscribe(
    rsp => {
      console.log("retour service => id : " + rsp.id + " nom : " + rsp.nom + ", " + rsp.caractere + ", " + rsp.race);
      this.router.navigate(['/fichechat/', rsp.id]);
    },
    error => {
      console.log(" createChat error!");
      console.log(error);
    });
  }

  updateChat() {
    console.log("debut update");
    this.serviceChat.updateChat(this.leChat).subscribe(
    rsp => {
      console.log(" updateChat : " + rsp);
      this.router.navigate(['/fichechat/', rsp.id]);
    },
    error => {
      console.log(" updateChat error!");
      console.log(error);
    });
  }

  deleteFiche() {
    console.log("Delete Fiche ! ");
    this.serviceChat.deleteChatById(this.leChat.id).subscribe(
      rsp => {
        console.log(" deleteChat response : " + rsp);
        this.router.navigate(['/']);
      }
    )
  }

  cancelCreateOrEdit() {
    console.log("cancel ! retour accueil")
    this.router.navigate(['/']);
  }

  addUrlPhoto() {
    console.log("addUrlPhoto : " + this.addPhoto);
    const laPhoto = new PhotoChat();
    laPhoto.cheminPhoto = this.addPhoto;
    this.leChat.lstPhotos.push(laPhoto);
    this.addPhoto = "";
  }

  removeUrlPhoto(photo: PhotoChat) {
    this.leChat.lstPhotos.forEach((value,index) => {
      if (value==photo) this.leChat.lstPhotos.splice(index, 1);
    });
  }

}

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

  constructor(private serviceChat: ChatService, private route: ActivatedRoute, private router: Router) { }

  chatId: number = 0;

  donateur: Donateur = new Donateur;

  ngOnInit(): void {

    let role: string | null = localStorage.getItem('role');
    if ((role == null)||(role != DONATEUR)) {
      console.log("Not donateur, no edit ! role : " + role);
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
      this.chatId = parseInt(params.get('id')!);
      this.modeEdition = true;
      this.serviceChat.getChatById(this.chatId).subscribe(data => {
          this.leChat = data;
          if (this.leChat.donateur?.id != this.donateur.id) {
            console.log("Mauvais donateur ! exit !");
            this.router.navigate(['/']);
          }
        }
      )
    });
  }

  createChat() {
    console.log("debut create");
    console.log(this.leChat.nom + ", " + this.leChat.caractere + ", " + this.leChat.race);
    this.serviceChat.createChat(this.leChat).subscribe(
    rsp => {
      console.log("retour service : " + rsp.nom + ", " + rsp.caractere + ", " + rsp.race);
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
    },
    error => {
      console.log(" updateChat error!");
      console.log(error);
    });
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

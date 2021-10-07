import { Component, OnInit } from '@angular/core';
import { Chat } from '../Chat';
import { ChatService } from '../chat.service';
import { TAILLES, SEXES, RACES, CATEGORIES_AGE, PELAGES, CARACTERES, REGIONS, DONATEUR } from '../../shared/listes';
import { PhotoChat } from '../PhotoChat';
import { Donateur } from 'src/app/utilisateur/donateur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit {

  leChat: Chat = new Chat();
  addPhoto: string = "";

  public Tailles = TAILLES;

  public Sexes = SEXES;

  public Races = RACES;

  public Cat_Age = CATEGORIES_AGE;

  public Pelages = PELAGES;

  public Caracteres = CARACTERES;

  public Regions = REGIONS;

  constructor(private serviceChat: ChatService, private router: Router) { }

  ngOnInit(): void {
    let role: string | null = localStorage.getItem('role');
    if ((role == null)||(role != DONATEUR)) {
      console.log("Not donateur, no creation ! role : " + role);
      this.router.navigate(['/']);
      return;
    }
    let stringDonateur: string | null = localStorage.getItem(DONATEUR);
    if (stringDonateur != null) {
      let donateur: Donateur = JSON.parse(stringDonateur);
      this.leChat.donateur = donateur;
    } else {
      console.log("profil donateur not found, exit !");
      this.router.navigate(['/']);
      return;
    }


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

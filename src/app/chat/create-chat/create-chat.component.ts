import { Component, OnInit } from '@angular/core';
import { Chat } from '../Chat';
import { ChatService } from '../chat.service';
import { TAILLES, SEXES, RACES, CATEGORIES_AGE, PELAGES, CARACTERES, REGIONS } from '../../shared/listes';
import { PhotoChat } from '../PhotoChat';

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

  constructor(private serviceChat: ChatService) { }

  ngOnInit(): void {

  }

  createChat() {
    console.log("debut create");
    this.serviceChat.createChat(this.leChat).subscribe(
    rsp => {
      console.log(" createChat : " + rsp);
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

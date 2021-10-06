import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhotoChat } from '../PhotoChat';
import { CARACTERES, CATEGORIES_AGE, PELAGES, RACES, REGIONS, SEXES, TAILLES } from 'src/app/shared/listes';
import { Chat } from '../Chat';
import { ChatService } from '../chat.service';

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

  constructor(private serviceChat: ChatService, private route: ActivatedRoute) { }

  chatId: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(( params: ParamMap) => {
      if (params.get('id') == null) {
        return;
      }
      this.chatId = parseInt(params.get('id')!);
      this.serviceChat.getChatById(this.chatId).subscribe(data => {
          this.leChat = data;
        }
      )
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

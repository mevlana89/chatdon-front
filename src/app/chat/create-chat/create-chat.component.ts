import { Component, OnInit } from '@angular/core';
import { Chat } from '../Chat';
import { ChatService } from '../chat.service';


enum Sexes {
  'male',
  'femelle'
}

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit {

  leChat: Chat = new Chat();



  sexes = Sexes;


  constructor(private serviceChat: ChatService) { }

  ngOnInit(): void {

  }

  test() {
    console.log("debut test create");
    this.serviceChat.createChat(this.leChat).subscribe(
    rsp => {
      console.log(" createChat : " + rsp);
    },
    error => {
      console.log(" createChat error!");
      console.log(error);
    });




  }
}

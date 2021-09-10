import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Chat } from '../model/Chat';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-fiche-chat',
  templateUrl: './fiche-chat.component.html',
  styleUrls: ['./fiche-chat.component.css']
})
export class FicheChatComponent implements OnInit {

  constructor(private serviceChat: ChatService, private route: ActivatedRoute) { }

  leChat: Chat = new Chat();
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

}



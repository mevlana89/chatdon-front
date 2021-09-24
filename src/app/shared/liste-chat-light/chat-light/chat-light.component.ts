import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-light',
  templateUrl: './chat-light.component.html',
  styleUrls: ['./chat-light.component.css']
})
export class ChatLightComponent implements OnInit {

  @Input()
  chats: any | undefined; 
  
  constructor() { }

  ngOnInit(): void {
  }

}

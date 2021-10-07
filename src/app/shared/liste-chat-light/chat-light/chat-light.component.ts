import { Component, Input, OnInit } from '@angular/core';
import { ChatLight } from './chat-light';

@Component({
  selector: 'app-chat-light',
  templateUrl: './chat-light.component.html',
  styleUrls: ['./chat-light.component.css']
})
export class ChatLightComponent implements OnInit {

  @Input()
  chat: ChatLight | undefined; 
  
  constructor() { }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheChatComponent } from './fiche-chat/fiche-chat.component';
import { SharedModule } from '../shared/shared.module';
import { CreateChatComponent } from './create-chat/create-chat.component';

@NgModule({
  declarations: [
    FicheChatComponent,
    CreateChatComponent,

  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChatModule { }

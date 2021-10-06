import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheChatComponent } from './fiche-chat/fiche-chat.component';
import { SharedModule } from '../shared/shared.module';
import { CreateChatComponent } from './create-chat/create-chat.component';
import { EditChatComponent } from './edit-chat/edit-chat.component';
import { EditFicheChatComponent } from './edit-fiche-chat/edit-fiche-chat.component';

@NgModule({
  declarations: [
    FicheChatComponent,
    CreateChatComponent,
    EditChatComponent,
    EditFicheChatComponent,

  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChatModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheChatComponent } from './fiche-chat/fiche-chat.component';
import { SharedModule } from '../shared/shared.module';
import { EditChatComponent } from './edit-chat/edit-chat.component';
import { EditFicheChatComponent } from './edit-fiche-chat/edit-fiche-chat.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [
    FicheChatComponent,
    EditChatComponent,
    EditFicheChatComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
   MatCarouselModule.forRoot()
  ]
})
export class ChatModule { }

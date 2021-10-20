import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatComponent } from './candidat/candidat.component';
import { DonateurComponent } from './donateur/donateur.component';
import { SharedModule } from '../shared/shared.module';
import { MesChatsComponent } from './donateur/mes-chats/mes-chats.component';
import { SuggestionChatsComponent } from './candidat/suggestion-chats/suggestion-chats.component';
import { EditDonateurComponent } from './edit-donateur/edit-donateur.component';

@NgModule({
  declarations: [
    CandidatComponent,
    DonateurComponent,
    MesChatsComponent,
    SuggestionChatsComponent,
    EditDonateurComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UtilisateurModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatComponent } from './candidat/candidat.component';
import { DonateurComponent } from './donateur/donateur.component';
import { SharedModule } from '../shared/shared.module';
import { MesChatsComponent } from './donateur/mes-chats/mes-chats.component';

@NgModule({
  declarations: [
    CandidatComponent,
    DonateurComponent,
    MesChatsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UtilisateurModule { }

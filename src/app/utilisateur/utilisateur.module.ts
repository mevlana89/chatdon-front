import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatComponent } from './candidat/candidat.component';
import { DonateurComponent } from './donateur/donateur.component';



@NgModule({
  declarations: [
    CandidatComponent,
    DonateurComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UtilisateurModule { }

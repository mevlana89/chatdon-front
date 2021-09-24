import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatComponent } from './candidat/candidat.component';
import { DonateurComponent } from './donateur/donateur.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CandidatComponent,
    DonateurComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UtilisateurModule { }

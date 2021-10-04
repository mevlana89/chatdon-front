import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { CreateChatComponent } from './chat/create-chat/create-chat.component';
import { FicheChatComponent } from './chat/fiche-chat/fiche-chat.component';
import { CandidatComponent } from './utilisateur/candidat/candidat.component';

const routes: Routes = [
  {
    path: 'fichechat/:id',
    component: FicheChatComponent,
  },
  {
    path: 'fichechat',
    component: FicheChatComponent,
  },
  {
    path: 'createchat',
    component: CreateChatComponent,
  },
  {
    path: 'candidat',
    component: CandidatComponent,
  },
  {
    path: 'accueil',
    component: AccueilComponent,
  },
  {
    path: '',
    component: AccueilComponent,
  },

  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

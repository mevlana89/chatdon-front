import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { CreateChatComponent } from './chat/create-chat/create-chat.component';
import { EditChatComponent } from './chat/edit-chat/edit-chat.component';
import { FicheChatComponent } from './chat/fiche-chat/fiche-chat.component';
import { CandidatComponent } from './utilisateur/candidat/candidat.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { MesChatsComponent } from './utilisateur/donateur/mes-chats/mes-chats.component';

const routes: Routes = [
  {
    path: 'updatechat/:id',
    component: EditChatComponent,
  },
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
    path:'candidatures',
    component:CandidatureComponent,
  },
  {
    path: '',
    component: AccueilComponent,
  },
  {
    path: 'mesChats',
    component: MesChatsComponent,
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

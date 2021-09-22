import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FicheChatComponent } from './chat/fiche-chat/fiche-chat.component';

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

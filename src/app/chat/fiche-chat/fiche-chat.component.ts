import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Chat } from '../Chat';
import { ChatService } from '../chat.service';
import { DONATEUR, CANDIDAT } from 'src/app/shared/listes';
import { Donateur } from 'src/app/utilisateur/donateur';
import { Candidat } from 'src/app/utilisateur/candidat';

@Component({
  selector: 'app-fiche-chat',
  templateUrl: './fiche-chat.component.html',
  styleUrls: ['./fiche-chat.component.css']
})
export class FicheChatComponent implements OnInit {

  constructor(private serviceChat: ChatService, private route: ActivatedRoute, private router: Router) { }

  leChat: Chat = new Chat();
  chatId: number = 0;

  isDonateurDuChat: boolean = false;
  isCandidatDuChat: boolean = false;
  isCandidat: boolean = false;

  donateur: Donateur = new Donateur;
  candidat: Candidat = new Candidat;

  ngOnInit(): void {

    this.route.paramMap.subscribe(( params: ParamMap) => {
      if (params.get('id') == null) {
        return;
      }
      this.chatId = parseInt(params.get('id')!);

      this.serviceChat.getChatById(this.chatId).subscribe(data => {

        this.leChat = data;
        let role: string | null = localStorage.getItem('role');
        if (role == DONATEUR) {
          console.log("profil donateur");
          let stringDonateur: string | null = localStorage.getItem(DONATEUR);
          if (stringDonateur != null) {
            this.donateur = JSON.parse(stringDonateur);
            if (this.donateur.id == this.leChat.donateur?.id) {
              console.log("id identique, donateur du chat");
              this.isDonateurDuChat = true;
            }
          }
        }
        if (role == CANDIDAT) {
          let stringCandidat: string | null = localStorage.getItem(CANDIDAT);
          if (stringCandidat != null) {
            this.candidat = JSON.parse(stringCandidat);
            // TODO: tester si candidature déjà faite, ou si juste candidat
            // pour mettre soit isCandidatDuChat ou isCandidat à true
          }

        }
      }, error => {
        console.log("Erreur recup chat ! ");
        this.router.navigate(['/']);
      });
    });
  }

  editChat() {
    this.router.navigate(['/updatechat/', this.leChat.id]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Candidature } from 'src/app/candidature/candidature.model';
import { CandidatureService } from 'src/app/candidature/candidature.service';
import { Chat } from 'src/app/chat/Chat';
import { ChatLight } from 'src/app/shared/liste-chat-light/chat-light/chat-light';
import { DONATEUR } from 'src/app/shared/listes';
import { Donateur } from '../../donateur';
import { UtilisateurService } from '../../utilisateur.service';

@Component({
  selector: 'app-mes-chats',
  templateUrl: './mes-chats.component.html',
  styleUrls: ['./mes-chats.component.css']
})
export class MesChatsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public utilisateurService: UtilisateurService, private candidatureService: CandidatureService) { }

  donateur: any = Donateur;

  listeChatLight: ChatLight[] = [];
  listeCandidatureParChat: Candidature[] = [];
  candidatureEnCours: Candidature[] = [];

  ngOnInit(): void {
     let role: string | null = localStorage.getItem('role');
     if ((role == null)||(role != DONATEUR)) {
       console.log("Not donateur, no creation ! role : " + role);
       this.router.navigate(['/']);
       return;
     }
     let stringDonateur: string | null = localStorage.getItem(DONATEUR);
     if (stringDonateur != null) {
       let donateur: Donateur = JSON.parse(stringDonateur);
       this.donateur.id = donateur.id;
       //this.leChat.donateur = donateur;
     } else {
       console.log("profil donateur not found, exit !");
       this.router.navigate(['/']);
       return;
    }

    // console.log("test");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.utilisateurService.findAllCatsByDonatorId(this.donateur.id).subscribe( data => { console.log (this.listeChatLight = data);
         for (let chatsLight of this.listeChatLight){
           this.route.paramMap.subscribe((params: ParamMap) => {
             this.candidatureService.getAllCandidaturesByCatId(chatsLight.id).subscribe( data => { console.log (chatsLight.lstCandidatures = data );
              // console.log ("this.listeChatLight"+ this.listeChatLight);
              chatsLight.candidaturesEnCours = chatsLight.lstCandidatures.filter(candidature => candidature.status == "en cours");
              chatsLight.lstCandidaturesRefusees = chatsLight.lstCandidatures.filter(candidature => candidature.status == "refusée");
              //console.log ("chatsLight.candidaturesEnCours : " + chatsLight.candidaturesEnCours[0].id);
            })
         });
         }
       })
  });

  }
}

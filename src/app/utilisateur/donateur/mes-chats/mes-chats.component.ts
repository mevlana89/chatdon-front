import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { flatMap, map, mergeMap, tap } from 'rxjs/operators';
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
export class MesChatsComponent implements OnInit, OnChanges {
  responseData: any;

  constructor(private route: ActivatedRoute, private router: Router, public utilisateurService: UtilisateurService, private candidatureService: CandidatureService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

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
    
    console.log("test0");

  /*  const currentCityTemperature$ = this.utilisateurService.findAllCatsByDonatorId(3).pipe(map(x => {
      // console.log("alo")
      for (let chatsLight of x)
      {
        this.candidatureService.getAllCandidaturesByCatId(chatsLight.id).subscribe(data => {
          chatsLight.lstCandidatures = data;
          console.log(chatsLight.lstCandidatures);
          //this.listeChatLight[0].lstCandidatures = chatsLight.lstCandidatures;
          // chatsLight.candidaturesEnCours = chatsLight.lstCandidatures.filter((candidature: { status: string; }) => candidature.status == "en cours");
          // console.log (this.listeChatLight);
        })
      }
      return this.candidatureService.getAllCandidaturesByCatId(7).subscribe();}));
      
      */

      // mergeMap(chat => 
      // {
      //   for (let chatsLight of chat)
      //   return this.candidatureService.getAllCandidaturesByCatId(7);
      // }));
    
    //currentCityTemperature$.subscribe(x => console.log(x));

    // this.utilisateurService.findAllCatsByDonatorId(5).pipe(
    //      mergeMap(chat => this.candidatureService.getAllCandidaturesByCatId(chat.id))).subscribe();



    // .pipe(
    //   mergeMap(chat => this.candidatureService.getAllCandidaturesByCatId(chat.id))
    // );

    // this.utilisateurService.findAllCatsByDonatorId(this.donateur.id).pipe(tap (u => this.listeChatLight = u ),
    // mergeMap (u => this.candidatureService.getAllCandidaturesByCatId(this.listeChatLight.))
    
    // ).subscribe( data => { this.listeChatLight = data;});

    console.log("test1");
//     this.route.paramMap.subscribe((params: ParamMap) => {
       this.utilisateurService.findAllCatsByDonatorId(this.donateur.id).subscribe( data => { console.log (this.listeChatLight = data);
         console.log("test2");
          for (let chatsLight of this.listeChatLight)
          {
            console.log("chatsLight : " + chatsLight.id)
            //this.route.paramMap.subscribe((params: ParamMap) => {
              this.candidatureService.getAllCandidaturesByCatId(chatsLight.id).subscribe( data => { console.log (chatsLight.lstCandidatures = data );
               // console.log ("this.listeChatLight"+ this.listeChatLight);
               console.log("chatsLight : " + chatsLight)
               chatsLight.candidaturesEnCours = chatsLight.lstCandidatures.filter(candidature => candidature.status == "en cours");
               chatsLight.lstCandidaturesRefusees = chatsLight.lstCandidatures.filter(candidature => candidature.status == "refusée");
               console.log("test3");
               console.log ("chatsLight.candidaturesEnCours : " + chatsLight.candidaturesEnCours);
               //console.log ("chatsLight.candidaturesEnCours : " + chatsLight.candidaturesEnCours[0].id);
             })
          //});
          }
        })
   //});

  }

  

//   getDataSynchronous() {
//     return this.http.get(this.jsonFile).toPromise()
//  }
  
}

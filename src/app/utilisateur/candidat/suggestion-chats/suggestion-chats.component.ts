import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChatLight } from 'src/app/shared/liste-chat-light/chat-light/chat-light';
import { FilterDto } from 'src/app/shared/liste-chat-light/FilterDto';
import { ListeChatLightService } from 'src/app/shared/liste-chat-light/liste-chat-light.service';
import { CANDIDAT } from 'src/app/shared/listes';
import { Candidat } from '../../candidat';

@Component({
  selector: 'app-suggestion-chats',
  templateUrl: './suggestion-chats.component.html',
  styleUrls: ['./suggestion-chats.component.css']
})
export class SuggestionChatsComponent implements OnInit, OnChanges {

  filterDto: FilterDto = new FilterDto();
  
  listeChatLight: ChatLight[] = [];

  candidat: any = Candidat;

  constructor(private servicelisteChat : ListeChatLightService,private router: Router, private route: ActivatedRoute) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.servicelisteChat.getSuggestCatsByCandidatId(this.candidat.id, this.filterDto).subscribe( data => { console.log (this.listeChatLight = data) })
  });
  }

  ngOnInit(): void {
    let role: string | null = localStorage.getItem('role');
     if ((role == null)||(role != CANDIDAT)) {
       console.log("Not donateur, no creation ! role : " + role);
       this.router.navigate(['/']);
       return;
     }
     let stringDonateur: string | null = localStorage.getItem(CANDIDAT);
     if (stringDonateur != null) {
       let candidat: Candidat = JSON.parse(stringDonateur);
       this.candidat.id = candidat.id;
       //this.leChat.donateur = donateur;
     } else {
       console.log("profil donateur not found, exit !");
       this.router.navigate(['/']);
       return;
    }
  this.candidat.id = 1;
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.servicelisteChat.getSuggestCatsByCandidatId(this.candidat.id, this.filterDto).subscribe( data => { console.log (this.listeChatLight = data) })
  });
  }


}

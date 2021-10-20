import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChatLight } from 'src/app/shared/liste-chat-light/chat-light/chat-light';
import { FilterDto } from 'src/app/shared/liste-chat-light/FilterDto';
import { ListeChatLightService } from 'src/app/shared/liste-chat-light/liste-chat-light.service';
import { CANDIDAT, CARACTERES, CATEGORIES_AGE, PELAGES, RACES, REGIONS, SEXES, TAILLES } from 'src/app/shared/listes';
import { Candidat } from '../../candidat';

@Component({
  selector: 'app-suggestion-chats',
  templateUrl: './suggestion-chats.component.html',
  styleUrls: ['./suggestion-chats.component.css']
})
export class SuggestionChatsComponent implements OnInit, OnChanges {

  public displaySearch = false;

      // Declare all controls with validation rules
      orderForm = this.fb.group({
        categorieAge: ['',/*Validators.required*/],
        race: ['', [/*Validators.required*/]],
        sexe: ['', [/*Validators.required*/]],
        pelage: ['', [/*Validators.required*/]],
        zoneGeo: ['', [/*Validators.required*/]]
      });

      public Sexes = SEXES;
      public Races = RACES;
      public Cat_Age = CATEGORIES_AGE;
      public Pelages = PELAGES;
      public Regions = REGIONS;

  filterDto: FilterDto = new FilterDto();
  
  listeChatLight: ChatLight[] = [];

  candidat: any = Candidat;

  constructor(private servicelisteChat : ListeChatLightService,private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }
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
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.servicelisteChat.getSuggestCatsByCandidatId(this.candidat.id, this.orderForm.value).subscribe( data => { console.log (this.listeChatLight = data) })
  });
  }

  searchDisplay(){
    this.displaySearch = !this.displaySearch;
  }

  rechercheChats() {
    this.filterDto = this.orderForm.value;
    this.servicelisteChat.getSuggestCatsByCandidatId(this.candidat.id, this.orderForm.value).subscribe( data => { console.log (this.listeChatLight = data) });

    //this.servicelisteChat.getAllUnreservedCats(this.orderForm.value).subscribe( data => { console.log (this.listeChatLight = data) });
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CreateCandidature } from '../candidature/candidature';
import { Candidature } from '../candidature/candidature.model';
import { CandidatureService } from '../candidature/candidature.service';
import { ChatLight } from '../shared/liste-chat-light/chat-light/chat-light';
import { CANDIDAT, DONATEUR, STATUS_ENCOURS } from '../shared/listes';
import { Candidat } from '../utilisateur/candidat';
import { Donateur } from '../utilisateur/donateur';
import { UtilisateurService } from '../utilisateur/utilisateur.service';


@Component({
  selector: 'app-consult-candidat',
  templateUrl: './consult-candidat.component.html',
  styleUrls: ['./consult-candidat.component.css']
})
export class ConsultCandidatComponent implements OnInit {
   
  candidat:Candidat=new Candidat;
  idCandidat:number=0;
  

  constructor(public utilisateurService:UtilisateurService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(( params: ParamMap) => {
      if (params.get('id') == null) {
        return;
      }
      this.idCandidat = parseInt(params.get('id')!);
      this.consultCandidat(this.idCandidat);
  });
}



  consultCandidat(idCandidat:number):void{
  this.utilisateurService.getCandidatById(idCandidat).subscribe(
    data=>{
      console.log(data);
      this.candidat=data;
    }
    
  )

     }
    }
     

   
   
   
 



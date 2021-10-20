import { Component, OnInit } from '@angular/core';
import { Candidature } from './candidature.model';
import { CandidatureService } from 'src/app/candidature/candidature.service';
import { Candidat } from '../utilisateur/candidat';
import { STATUS_ENCOURS } from '../shared/listes';


@Component({
  selector: 'app-candidature',
  template: '*ngIf="true" Annuler ',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
 

  constructor(private candidatureService: CandidatureService) { }
  candidatures: Candidature[] | undefined;
  candidat: Candidat = new Candidat;


 
  ngOnInit(): void {
    const candidat=localStorage.getItem("Candidat");
    if (candidat!= undefined){
      this.candidat=JSON.parse(candidat);
      console.log(JSON.parse(candidat).id);
      console.log(JSON.parse(candidat).nom);
      this.candidatureService.getAllCandidaturesByCandidatId(this.candidat.id)
      .subscribe((candidatures: Candidature[]) => {
        console.log(candidatures);
        this.candidatures = candidatures   
      })
      

    }
    
  }

  annulerCandidature(idCandidature:number){
    console.log("annuler candidature" + idCandidature);
    if (idCandidature >0){
      console.log("annuler candidature" + idCandidature);
      this.candidatureService.deleteCandidatureById(idCandidature).subscribe(
        data=>{
          console.log(data);
          this.candidatureService.getAllCandidaturesByCandidatId(this.candidat.id)
          .subscribe((candidatures: Candidature[]) => {
          console.log(candidatures);
          this.candidatures = candidatures   
      })
          alert('Votre candidature a été supprimée avec succès.');
        }
      )
    }
   
  }

}

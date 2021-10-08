import { Component, OnInit } from '@angular/core';
import { Candidature } from './candidature.model';
import { CandidatureService } from './candidature.service';


@Component({
  selector: 'app-candidature',
  template: '*ngIf="true" Annuler ',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {

  constructor(private candidatureService: CandidatureService) { }
  candidatures: Candidature[] | undefined;

 
  ngOnInit(): void {
    const candidat=localStorage.getItem("Candidat");
    if (candidat!= undefined){
      console.log(JSON.parse(candidat).id);
      console.log(JSON.parse(candidat).nom);
      this.candidatureService.getAllCandidaturesByCandidatId(JSON.parse(candidat).id)
      .subscribe((candidatures: Candidature[]) => {
        console.log(candidatures);
        this.candidatures = candidatures
      
      
      })
      

    }
    
  }

}

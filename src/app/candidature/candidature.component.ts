import { Component, OnInit } from '@angular/core';
import { Candidature } from './candidature.model';
import { CandidatureService } from './candidature.service';


@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {

  constructor(private candidatureService: CandidatureService) { }
  candidatures: Candidature[] | undefined;


  ngOnInit(): void {
    this.candidatureService.getAllCandidaturesByCandidatId(Number(localStorage.getItem("id")))
      .subscribe((candidatures: Candidature[]) => this.candidatures = candidatures)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Donateur } from '../donateur';
import { UtilisateurService } from '../utilisateur.service';


@Component({
  selector: 'app-donateur',
  templateUrl: './donateur.component.html',
  styleUrls: ['./donateur.component.css']
})
export class DonateurComponent implements OnInit {

  hide = true;
  private baseUrl = environment.wsRootUrl;
  newDonateur = new Donateur;

  constructor(private fb: FormBuilder, public utilisateurService: UtilisateurService, public router: Router) { }

  ngOnInit(): void {
  }

  createDonateurForm = this.fb.group ({
    id:[''],
    nom: [''],
    prenom: [''],
    mail: [''],
    telephone: [''],
    motDePasse1: [''],
    motDePasse2: [''],
    rue:[''],
    codePostal:[''],
    ville:[''],
    chatsProposes:['']
  })

  addDonateur(){
    this.utilisateurService.createDonateur(this.newDonateur)
         .subscribe( (data:Donateur) => console.log(data));
    //                                  this.router.navigate(['/donateurs',donateur.id]));
  }

}

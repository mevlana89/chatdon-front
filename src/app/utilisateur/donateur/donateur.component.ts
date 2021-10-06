import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  readonly radioFormControl = new FormControl(null);

 // donateur :Donateur = new Donateur();

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

    //chatsProposes:['[]']
  })

  addProfil(){
    if (this.createDonateurForm.valid){
      if (this.radioFormControl.value == 1) {
         this.addDonateur();
        }
      else {
        console.log("canditat");
      }
    }
  }
  addDonateur(){
    if (this.createDonateurForm.valid) {
      const donateur:Donateur = this.createDonateurForm.value;
      this.utilisateurService.createDonateur(donateur)
          .subscribe( (data:Donateur) => { console.log(data) } );
    }
      //   this.router.navigate(['/donateurs',donateur.id]));
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Donateur } from '../donateur';
import { UtilisateurService } from '../utilisateur.service';
import { Chat } from '../../chat/Chat';
import { DONATEUR, CANDIDAT } from 'src/app/shared/listes';
import { Candidat } from '../candidat';
import { adresse } from '../adresse';
import { passwordValidator, forbidenExtensionValidator } from '../form-validators';

@Component({
  selector: 'app-donateur',
  templateUrl: './donateur.component.html',
  styleUrls: ['./donateur.component.css']
})
export class DonateurComponent implements OnInit {

  hide = true;
  private baseUrl = environment.wsRootUrl;
  readonly radioFormControl = new FormControl(null);
  chatInit : Chat[] = [];
  donateur: Donateur|undefined;
  idConnected: number = 0;

 // donateur :Donateur = new Donateur();

  constructor(private fb: FormBuilder, public utilisateurService: UtilisateurService, public router: Router) { }

  ngOnInit(): void {
    this.getIdConnected();
  }

  createDonateurForm = this.fb.group ({
    id:[''],
    nom: ['',Validators.required],
    prenom: [''],
    mail: ['',[Validators.required,Validators.email, forbidenExtensionValidator('.fr')]],
    telephone: ['',Validators.pattern(new RegExp("[0-9]{10}")) ],
    motDePasse1: ['',[Validators.required, Validators.minLength(3), passwordValidator]],
    motDePasse2: ['',[Validators.required, Validators.minLength(3), passwordValidator]],
    adresseDTO: this.fb.group ({
      id:[''],
      rue:[''],
      codePostal:['',Validators.required],
      ville:['']
    }),
    chatsProposes:[this.chatInit]
  })

  // Enrgistrement si creation ou maj
  addUpdateProfil(){
    if (this.createDonateurForm.valid){
      console.log ( 'this.idConnected (addUpdateProfil) : ' , this.idConnected, 'this.radioFormControl.value : ' , this.radioFormControl.value);
      //create
      if (this.idConnected == 0) {
        if (this.radioFormControl.value == 1) {
          this.addDonateur();
          }
        else {
          console.log("canditat à mettre en place- add");
        }
      }
      //update
      else {
        if (this.radioFormControl.value == 1) {
          this.updateDonateur();
        }
        else {
          console.log("canditat à mettre en place update");
        }
      }
    }
  }

  addDonateur(){
    if (this.createDonateurForm.valid) {
      const donateur:Donateur = this.createDonateurForm.value;
      console.log('save :', donateur);
      this.utilisateurService.createDonateur(donateur)
          .subscribe(
            (data:Donateur) => {
              console.log(data);
              alert('Votre compte a été enregistré avec succès. Veuillez vous connecter svp.');
              this.router.navigate( ['/'] );
            }
          );
    }
  }

  updateDonateur(){
    if (this.createDonateurForm.valid){
      console.log( 'id à maj (updateDonateur) : ' , this.idConnected);
      this.donateur = this.createDonateurForm.value;

      console.log( 'donateur : ', this.createDonateurForm.value )
      this.utilisateurService.updateDonateur(this.idConnected, this.createDonateurForm.value)
          .subscribe(
            (data : Donateur) => {
              this.donateur = data;
              alert('Votre compte a été mis à jour avec succès.');
              // Maj du local Storage
              this.utilisateurService.getDonateurById(this.idConnected).subscribe(
                dataD => {
                  this.donateur = dataD;
                  console.log("set localStorage : " + DONATEUR);
                  localStorage.setItem("role", DONATEUR);
                  localStorage.setItem(DONATEUR, JSON.stringify(this.donateur));
                });
            }
          );
    }
  }

  // getters
  getIdConnected(){
    let roleConnected : string | null = localStorage.getItem('role');
    if ( roleConnected !=null && roleConnected == DONATEUR){
        let donateurString :string | null = localStorage.getItem(DONATEUR);
        if (donateurString !=null ) {
          let donateur : Donateur = JSON.parse( donateurString );
          this.idConnected = donateur.id;
          console.log(' id lu (getUtilisateurConnected)  : ' + this.idConnected + ' donateur : ' + donateur) ;
          // actualisation du formBuilder
          this.editFormBuilder("1",donateur);
        }
    }
  }

 // delete
 deleteUtilisateur(): void {
   // Read de local Storage
    this.getIdConnected();
    console.log(' id à supp (deleteUtilisateur) : ' + this.idConnected);
    // delete by id find in the local storage
    this.utilisateurService.deleteDonateurById(this.idConnected)
      .subscribe(
        response => {
          console.log(response);
          this.utilisateurService.reset();
          alert('Votre compte a été supprimé avec succès.');
          // maj du local Storage
          localStorage.setItem("role", "");
          localStorage.setItem(DONATEUR,"");
          localStorage.setItem(CANDIDAT, "");
          // retour à l'acceuil
          this.router.navigate(['/acceuil']);
        },
        error => {
          console.log(error);
        });
  }

  // Gestion des Forms
  editFormBuilder(role:string, donateur: Donateur){
    this.radioFormControl.setValue(role);
    console.log('fb : ' , donateur );
        this.createDonateurForm.setValue({
          id:donateur.id,
          nom: donateur.mail,
          prenom: donateur.prenom,
          mail: donateur.mail,
          telephone: donateur.telephone,
          motDePasse1: null,
          motDePasse2: null,
          adresseDTO: {
            id:donateur.adresseDTO?.id,
            rue:donateur.adresseDTO?.rue,
            codePostal:donateur.adresseDTO?.codePostal,
            ville:donateur.adresseDTO?.ville
          },
          chatsProposes:donateur.chatsProposes
        })
  }

}

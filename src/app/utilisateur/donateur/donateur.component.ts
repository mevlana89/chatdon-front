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
import { utilisateur } from '../utilisateur';

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
  candidat : Candidat | undefined;
  idConnected: number = 0;
  roleConnectedSave: string ='';

  typeHebergementP : string | undefined;
  surfaceHebergementP : number=0;
  presenceJardinP : boolean | undefined;
  sociableChatP : boolean | undefined;
  sociableChienP : boolean | undefined;
  ageBenjaminP  : number=0;

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
  addUpdateDonateur(){
    if (this.createDonateurForm.valid){
      console.log ( 'this.idConnected (addUpdateProfil) : ' , this.idConnected, 'this.radioFormControl.value : ' , this.radioFormControl.value);
      //create
      if (this.idConnected == 0) {
        if (this.radioFormControl.value === '1') {
          this.addDonateur();
          }
      }
      //update
      else {
        if (this.radioFormControl.value === '1') {
          this.updateDonateur();
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
      console.log(' role', this.roleConnectedSave);
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

  onReceiveAddCandidat(candidatForm : any){
    console.log('----- onReceiveAddCandidat');
    console.log ('Candidat Form: ', candidatForm );
    console.log('donateur form :' , this.createDonateurForm.value);
    console.log('id : ' , this.createDonateurForm.value.id);
    // JSon width CreateDonateurForm (parent) and candidatForm(child)
    this.candidat = {
        id: this.createDonateurForm.value.id,
        nom : this.createDonateurForm.value.nom,
        prenom : this.createDonateurForm.value.prenom,
        mail : this.createDonateurForm.value.mail,
        telephone : this.createDonateurForm.value.telephone,
        motDePasse1: this.createDonateurForm.value.motDePasse1,
        motDePasse2: this.createDonateurForm.value.motDePasse2,
        adresseDTO: {
          id:this.createDonateurForm.value.adresseDTO?.id,
          rue:this.createDonateurForm.value.adresseDTO?.rue,
          codePostal:this.createDonateurForm.value.adresseDTO?.codePostal,
          ville:this.createDonateurForm.value.adresseDTO?.ville
        },
        typeHebergement : candidatForm.typeHebergement,
        surfaceHebergement : candidatForm.surfaceHebergement,
        presenceJardin : candidatForm.presenceJardin,
        sociableChat : candidatForm.sociableChat,
        sociableChien : candidatForm.sociableChien,
        ageBenjamin : candidatForm.ageBenjamin
    }
    console.log('candidat : ' , this.candidat);
    console.log('this.createDonateurForm.value.id: ', this.createDonateurForm.value.id);
    if (this.createDonateurForm.value.id == null || this.createDonateurForm.value.id === 0 ) {
      this.utilisateurService.createCandidat(this.candidat)
      .subscribe(
        (data:Candidat) => {
          console.log ('--- creation candidat')
          console.log(data);
          alert('Votre compte a été enregistré avec succès. Veuillez vous connecter svp.');
          this.router.navigate( ['/'] );
        }
      );
    } else {
      this.utilisateurService.updateCandidat(this.idConnected, this.candidat)
      .subscribe(
        (data : Candidat) => {
          console.log ('--- update candidat')
          this.candidat = data;
          alert('Votre compte a été mis à jour avec succès.');
          // Maj du local Storage
          this.utilisateurService.getCandidatById(this.idConnected).subscribe(
            dataD => {
              this.candidat = dataD;
              console.log("set localStorage : " + CANDIDAT);
              localStorage.setItem("role", CANDIDAT);
              localStorage.setItem(CANDIDAT, JSON.stringify(this.candidat));
            });
        }
      );
    }
  }

  updateCandidat(){
    if (this.createDonateurForm.valid){
      console.log( 'id à maj (updateCandidat) : ' , this.idConnected);
      console.log(' role', this.roleConnectedSave);
      this.utilisateurService.getCandidatById(this.idConnected).subscribe(
        data => {
          this.candidat = data;
        }
      )

      console.log( 'donateur : ', this.candidat)
      this.utilisateurService.updateCandidat(this.idConnected, this.candidat!)
          .subscribe(
            (data : Candidat) => {
              this.candidat = data;
              alert('Votre compte a été mis à jour avec succès.');
              // Maj du local Storage
              this.utilisateurService.getCandidatById(this.idConnected).subscribe(
                dataD => {
                  this.candidat = dataD;
                  console.log("set localStorage : " + CANDIDAT);
                  localStorage.setItem("role", CANDIDAT);
                  localStorage.setItem(CANDIDAT, JSON.stringify(this.candidat));
                });
            }
          );
    }
  }
  // getters
  getIdConnected(){
    let roleConnected : string | null = localStorage.getItem('role');
    console.log(' getConnected : ', roleConnected);
    if ( roleConnected !=null && roleConnected == DONATEUR){
        this.roleConnectedSave = roleConnected;
        let donateurString :string | null = localStorage.getItem(DONATEUR);
        if (donateurString !=null ) {
          let donateur : Donateur = JSON.parse( donateurString );
          this.idConnected = donateur.id;
          console.log(' id lu (getUtilisateurConnected)  : ' + this.idConnected + ' donateur : ' + donateur) ;
          // actualisation du formBuilder
          this.editFormBuilderDonateur("1",donateur);
        }
    }
    if ( roleConnected !=null && roleConnected == CANDIDAT){
      let candidatString :string | null = localStorage.getItem(CANDIDAT);
      if (candidatString !=null ) {
        this.roleConnectedSave = roleConnected;
        let candidat : Candidat = JSON.parse( candidatString );
        this.idConnected = candidat.id;
        console.log(' id lu (getUtilisateurConnected)  : ' + this.idConnected + ' candidat : ' + candidat) ;
        // actualisation du formBuilder
        this.editFormBuilderCandidat("2",candidat);
      }
  }
  }

 // delete
 deleteUtilisateur(): void {
   // Read de local Storage
    this.getIdConnected();
    console.log(' id à supp (deleteUtilisateur) : ' , this.idConnected )
    console.log(' role save : ', this.roleConnectedSave);
    // delete by id find in the local storage
    if (this.roleConnectedSave == DONATEUR) {
      console.log("supp donateur")
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
    if (this.roleConnectedSave == CANDIDAT) {
      console.log("supp candidat")
      this.utilisateurService.deleteCandidatById(this.idConnected)
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


  }

  // Gestion des Forms
  editFormBuilderDonateur(role:string, donateur: Donateur){
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

  editFormBuilderCandidat(role:string, candidat: Candidat){
    this.radioFormControl.setValue(role);
    console.log('fb : ' , candidat );
    this.createDonateurForm.setValue({
          id:candidat.id,
          nom: candidat.mail,
          prenom: candidat.prenom,
          mail: candidat.mail,
          telephone: candidat.telephone,
          motDePasse1: null,
          motDePasse2: null,
          adresseDTO: {
            id:candidat.adresseDTO?.id,
            rue:candidat.adresseDTO?.rue,
            codePostal:candidat.adresseDTO?.codePostal,
            ville:candidat.adresseDTO?.ville
          },
          chatsProposes:null
    })
    this.typeHebergementP = candidat.typeHebergement;
    this.surfaceHebergementP= candidat.surfaceHebergement;
    this.presenceJardinP = candidat.presenceJardin;
    this.sociableChatP = candidat.sociableChat;
    this.sociableChienP = candidat.sociableChien;
    this.ageBenjaminP  = candidat.ageBenjamin;
    console.log('type hebergement candidat: ', candidat.typeHebergement);
    console.log('type hebergement : ', this.typeHebergementP);
  }

}

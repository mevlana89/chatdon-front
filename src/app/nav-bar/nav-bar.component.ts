import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DONATEUR, CANDIDAT } from '../shared/listes';
import { Candidat } from '../utilisateur/candidat';
import { Donateur } from '../utilisateur/donateur';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor( private utilisateurService: UtilisateurService, private router: Router) { }

  role!: string | null;

  mail: string = "";
  pass: string = "";

  isVisiteur: boolean = false;
  isDonateur: boolean = false;
  isCandidat: boolean = false;

  profilCandidat: Candidat | undefined;
  profilDonateur: Donateur | undefined;

  // permet d'afficher les inputs de connexion
  whileLogin: boolean = false;
  // gère le retour mauvais mot de passe
  wrongLogin: boolean = false;

  ngOnInit(): void {

    this.updateRole();

  }

  showLogin() {
    this.whileLogin = true;
    this.wrongLogin = false;
  }

  login() {
    this.whileLogin = false;
    this.wrongLogin = false;
    console.log("start login")
    this.utilisateurService.getProfilUtilisateur(this.mail, this.pass).subscribe(
      data => {
        console.log("retour getProfilUtilisateur : " + data);
        if (data == DONATEUR) {
          this.utilisateurService.getDonateurByMail(this.mail, this.pass).subscribe(
            dataD => {
              this.profilDonateur = dataD;
              console.log("set localStorage : " + DONATEUR)
              localStorage.setItem("role", DONATEUR);
              localStorage.setItem(DONATEUR, JSON.stringify(this.profilDonateur));
              localStorage.setItem(CANDIDAT, "");
              this.updateRole();
            });
        } else if (data == CANDIDAT) {
          this.utilisateurService.getCandidatByMail(this.mail, this.pass).subscribe(
            dataC => {
              this.profilCandidat = dataC;
              console.log("set localStorage : " + CANDIDAT)
              localStorage.setItem("role", CANDIDAT);
              localStorage.setItem(CANDIDAT, JSON.stringify(this.profilCandidat));
              localStorage.setItem(DONATEUR, "");
              this.updateRole();
            });
        } else {
          if (data == "WrongPass") {
            console.log("WrongPass");
          } else {
            console.log("No user found!");
          }
          this.wrongLogin = true;
          localStorage.setItem(CANDIDAT, "");
          localStorage.setItem(DONATEUR, "");
          localStorage.setItem("role", "");
          this.updateRole();
        }
      });
    }

  logout() {
    localStorage.setItem("role", "");
    localStorage.setItem(CANDIDAT, "");
    localStorage.setItem(DONATEUR, "");
    this.whileLogin = false;
    this.updateRole();
    this.router.navigate(['/']);
  }

  updateRole() {

    this.role = localStorage.getItem("role");
    if (this.role != null) {
     // this.utilisateurService.logginChange.next(this.role);
    }
    if ((this.role == null)||(this.role=="")) {
      this.isVisiteur = true;
      this.isDonateur = false;
      this.isCandidat = false;
    }
    if (this.role == DONATEUR) {
      this.isDonateur = true;
      this.isVisiteur = false;
      this.isCandidat = false;
    }
    if (this.role == CANDIDAT) {
      this.isCandidat = true;
      this.isVisiteur = false;
      this.isDonateur = false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { DONATEUR, CANDIDAT } from '../shared/listes';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  role!: string | null;

  nom: string = "";
  pass: string = "";

  isVisiteur: boolean = false;
  isDonateur: boolean = false;
  isCandidat: boolean = false;

  whileLogin: boolean = false;

  ngOnInit(): void {

    this.updateRole();

  }

  showLogin() {
    this.whileLogin = true;
  }

  login() {
    this.whileLogin = false;
    // TODO: faire appel REST vers back pour remonter l'utilisateur et son rôle
    if (this.nom.startsWith("c")) {
      console.log("set localStorage : " + CANDIDAT)
      localStorage.setItem("role", CANDIDAT);
    } else {
      console.log("set localStorage : " + DONATEUR)
      localStorage.setItem("role", DONATEUR);
    }
    this.updateRole();
  }

  logout() {
    localStorage.setItem("role", "");
    this.whileLogin = false;
    this.updateRole();
  }

  updateRole() {

    this.role = localStorage.getItem("role");

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
    console.log(this.isVisiteur ? "Visiteur" : "Role : " + this.role);

  }

}

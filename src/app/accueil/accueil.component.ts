import { Component, OnInit } from '@angular/core';
import { FilterDto } from '../shared/liste-chat-light/FilterDto';
import { TAILLES, SEXES, RACES, CATEGORIES_AGE, PELAGES, CARACTERES, REGIONS, DONATEUR, CANDIDAT } from '../shared/listes';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private fb: FormBuilder, private utilisateurService: UtilisateurService) { }

  public displaySearch = false;

    // Declare all controls with validation rules
    orderForm = this.fb.group({
      categorieAge: ['',/*Validators.required*/],
      race: ['', [/*Validators.required*/]],
      sexe: ['', [/*Validators.required*/]],
      taille: ['', [/*Validators.required*/]],
      pelage: ['', [/*Validators.required*/]],
      caractere: ['', [/*Validators.required*/]],
      zoneGeo: ['', [/*Validators.required*/]],
      sociableChat: ['', [/*Validators.required*/]],
      sociableChien: ['', [/*Validators.required*/]],
      sociableEnfant: ['', [/*Validators.required*/]]
    });

  filterDto: FilterDto = new FilterDto();

  isCandidat: boolean = false;
  isDonateur: boolean = false;
  isVisiteur: boolean = false;

  public Tailles = TAILLES;
  public Sexes = SEXES;
  public Races = RACES;
  public Cat_Age = CATEGORIES_AGE;
  public Pelages = PELAGES;
  public Caracteres = CARACTERES;
  public Regions = REGIONS;

  ngOnInit(): void {
    this.utilisateurService.logginChange.subscribe(data => {
      console.log("logginChange detecté depuis accueil");
      this.gestionLoggin()
    } );
    this.filterDto = this.orderForm.value;
    this.gestionLoggin();
  }

  gestionLoggin() {
    let role: string | null = localStorage.getItem('role');
    if (role == DONATEUR) {
      console.log("Hello donateur");
      this.isCandidat = false;
      this.isDonateur = true;
      this.isVisiteur = false;
    } else if (role == CANDIDAT) {
      console.log("Hello candidat");
      this.isCandidat = true;
      this.isDonateur = false;
      this.isVisiteur = false;
    } else {
      console.log("Hello visiteur");
      this.isCandidat = false;
      this.isDonateur = false;
      this.isVisiteur = true;
    }

  }


  rechercheChats() {
    this.filterDto = this.orderForm.value;

    //console.log('oderForm submitted : ', this.orderForm.value);
    //this.ngOnInit();

  }
  searchDisplay(){
    this.displaySearch = !this.displaySearch;
  }
}

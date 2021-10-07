import { Component, OnInit } from '@angular/core';
import { FilterDto } from '../shared/liste-chat-light/FilterDto';
import { TAILLES, SEXES, RACES, CATEGORIES_AGE, PELAGES, CARACTERES, REGIONS } from '../shared/listes';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

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

  public Tailles = TAILLES;

  public Sexes = SEXES;

  public Races = RACES;

  public Cat_Age = CATEGORIES_AGE;

  public Pelages = PELAGES;

  public Caracteres = CARACTERES;

  public Regions = REGIONS;

  ngOnInit(): void {
/**
        // get Observable from FormGroup
        this.orderForm.valueChanges
        // listen to value change
        .subscribe(value => {
          console.log('orderForm value changes : ', value);
        });
         */
        this.filterDto = this.orderForm.value;
        //console.log("this.filterDto.race: ", this.filterDto.race);

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

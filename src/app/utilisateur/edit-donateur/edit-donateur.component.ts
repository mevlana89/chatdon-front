import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Donateur } from '../donateur';
import { UtilisateurService } from '../utilisateur.service';
import { Chat } from '../../chat/Chat';
import { DONATEUR} from 'src/app/shared/listes';
import { Candidat } from '../candidat';
import { passwordValidator, forbidenExtensionValidator } from '../form-validators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-edit-donateur',
  templateUrl: './edit-donateur.component.html',
  styleUrls: ['./edit-donateur.component.css']
})
export class EditDonateurComponent implements OnInit {

    private baseUrl = environment.wsRootUrl;
    chatInit : Chat[] = [];
    donateur: Donateur|undefined;

    createDonateurForm = this.fb.group ({
      id:[''],
      nom: [''],
      prenom: [''],
      mail: [''],
      telephone: [''],
      motDePasse1: [''],
      motDePasse2: [''],
      adresseDTO: this.fb.group ({
        id:[''],
        rue:[''],
        codePostal:[''],
        ville:['']
      }),
      chatsProposes:[this.chatInit]
    })

    constructor(private fb: FormBuilder, public utilisateurService: UtilisateurService, public router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        console.log("edit-donateur-component : ");

        this.activatedRoute.paramMap.subscribe( ( params: ParamMap) => {
          console.log('id Donateur :', params.get('id') );
          if (params.get('id') !== undefined) {
            this.utilisateurService.getDonateurById(Number(params.get('id'))).subscribe(
                (data:Donateur) => {
                  console.log(data);

                  console.log('donateur : ', this.donateur);
                  this.createDonateurForm.setValue({
                    id:data?.id,
                    nom: data?.nom,
                    prenom: data?.prenom,
                    mail: data?.mail,
                    telephone: data?.telephone,
                    motDePasse1: null,
                    motDePasse2: null,
                    adresseDTO: {
                      id:data?.adresseDTO?.id,
                      rue:data?.adresseDTO?.rue,
                      codePostal:data?.adresseDTO?.codePostal,
                      ville:data?.adresseDTO?.ville
                    },
                    chatsProposes:data?.chatsProposes
                  })
                }
            );
          }
        })


    }








  }

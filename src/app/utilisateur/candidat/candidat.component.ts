import { Component, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Candidat } from '../candidat';
import { UtilisateurService } from '../utilisateur.service';
import { Router } from '@angular/router';
import { EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnChanges {

  constructor(private fb: FormBuilder, private utilisateurService : UtilisateurService,  public router: Router) { }

  ngOnChanges(): void {
    console.log('Age benjamin : ',  this.ageBenjaminC );
    console.log('top jardin :', this.presenceJardinC);
    console.log('top chat :', this.sociableChatC);
    console.log('top chien : ', this.sociableChienC);
    this.createCandidatForm.get('typeHebergement')?.setValue(this.typeHebergementC);
    this.createCandidatForm.get('surfaceHebergement')?.setValue(this.surfaceHebergementC);
    this.createCandidatForm.get('presenceJardin')?.setValue(this.presenceJardinC);
    this.createCandidatForm.get('sociableChat')?.setValue(this.sociableChatC);
    this.createCandidatForm.get('sociableChien')?.setValue(this.sociableChienC);
    this.createCandidatForm.get('ageBenjamin')?.setValue(this.ageBenjaminC);
  }


  @Output()
  addCandidat : EventEmitter<Candidat> = new EventEmitter<Candidat>();

  @Input()
  typeHebergementC : string | undefined;
  @Input()
  surfaceHebergementC : number=0;
  @Input()
  presenceJardinC : boolean | undefined;
  @Input()
  sociableChatC :boolean | undefined;
  @Input()
  sociableChienC : boolean | undefined;
  @Input()
  ageBenjaminC : number=0;

  createCandidatForm = this.fb.group({
    typeHebergement: ['',  [Validators.required]],
    surfaceHebergement: ['', [Validators.required]],
    presenceJardin: ['', [Validators.required]],
    sociableChat: ['', [Validators.required]],
    sociableChien: ['', [Validators.required]],
    ageBenjamin: ['', [Validators.required]]
  });

  typeHebergement: any[] = [ 'Appart', 'Maison'];


  onSubmit() {
    // Get form value as JSON object
    console.log('oderForm submitted : ', this.createCandidatForm.value);
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  addCandidatToParent(){
    console.log("add candidat : " + this.createCandidatForm);
    if (this.createCandidatForm.valid) {
      const candidat: Candidat = this.createCandidatForm.value;
      console.log('send candidat to parent ');
      this.addCandidat.emit(this.createCandidatForm.value);
    }
  }

}

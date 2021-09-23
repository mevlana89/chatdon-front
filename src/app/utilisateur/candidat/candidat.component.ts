import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createCandidatForm = this.fb.group({
    typeHebergement: ['',  [Validators.required]],
    surfaceHebergement: ['', [Validators.required]],
    presenceJardin: ['', [Validators.required]],
    sociableChat: ['', [Validators.required]],
    sociableChien: ['', [Validators.required]],
    // nbEnfant: ['', [Validators.required, Validators.email]],
    // ageBenjamin: ['', [Validators.required]]
  });

  typeHebergement: any[] = [
    {name: 'Appart', sound: 'Woof!'},
    {name: 'Maison', sound: 'Meow!'},
    {name: 'Maison@maison.fr', sound: 'Meow!'}
  ];
  
  onSubmit() {
    // Get form value as JSON object
    console.log('oderForm submitted : ', this.createCandidatForm.value);
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  
}

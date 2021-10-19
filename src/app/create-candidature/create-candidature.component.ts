import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-candidature',
  templateUrl: './create-candidature.component.html',
  styleUrls: ['./create-candidature.component.css']
})
export class CreateCandidatureComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createCandidatureForm = this.fb.group({});
  onSubmit() {
    // Get form value as JSON object
    console.log('oderForm submitted : ', this.createCandidatureForm.value);
  }

}

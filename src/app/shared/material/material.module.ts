import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
<<<<<<< HEAD
import { MatIconModule } from '@angular/material/icon';
||||||| b90ce31
=======
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

>>>>>>> main

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
<<<<<<< HEAD
    MatGridListModule,
    MatIconModule
||||||| b90ce31
    MatGridListModule
=======
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule

>>>>>>> main
  ], exports:[
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
<<<<<<< HEAD
    MatGridListModule,
    MatIconModule
||||||| b90ce31
    MatGridListModule
=======
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule
>>>>>>> main
  ]
})
export class MaterialModule { }

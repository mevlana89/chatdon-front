import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule
  ], exports:[
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule
  ]
})
export class MaterialModule { }

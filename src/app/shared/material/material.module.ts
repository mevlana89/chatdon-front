import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule
  ], exports:[
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule
  ]
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule
  ], exports:[
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class MaterialModule { }

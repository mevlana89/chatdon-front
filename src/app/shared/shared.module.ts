import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeChatLightComponent } from './liste-chat-light/liste-chat-light.component';
import { ChatLightComponent } from './liste-chat-light/chat-light/chat-light.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListeChatLightComponent,
    ChatLightComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ], exports:[
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ListeChatLightComponent,
    ChatLightComponent,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class SharedModule { }

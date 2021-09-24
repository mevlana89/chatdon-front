import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeChatLightComponent } from './liste-chat-light/liste-chat-light.component';
import { ChatLightComponent } from './liste-chat-light/chat-light/chat-light.component';

@NgModule({
  declarations: [
    ListeChatLightComponent,
    ChatLightComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ], exports:[
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ListeChatLightComponent,
    ChatLightComponent
  ]
})
export class SharedModule { }

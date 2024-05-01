import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './components/logo/logo.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    CustomInputComponent,
    HeaderComponent,
    LogoComponent
  ],
  exports: [
    CustomInputComponent,
    HeaderComponent,
    LogoComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }

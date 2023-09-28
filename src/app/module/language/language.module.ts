import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './language.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LanguageComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    LanguageComponent
  ]
})
export class languageModule { }
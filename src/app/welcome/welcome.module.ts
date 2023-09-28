import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { languageModule } from '../module/language/language.module';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }
]

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    languageModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ]
})
export class WelcomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PopupComponent } from './popup.component';
import { languageModule } from '../language/language.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: PopupComponent,
  }
]

@NgModule({
  declarations: [PopupComponent],
  imports: [
    CommonModule,
    languageModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ]
})
export class PopupModule { }

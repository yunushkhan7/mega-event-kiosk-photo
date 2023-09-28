import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { languageModule } from '../language/language.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  }
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    languageModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
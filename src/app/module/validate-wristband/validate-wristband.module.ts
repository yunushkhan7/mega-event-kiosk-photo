import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanWristbandComponent } from './scan-wristband/scan-wristband.component';
import { Routes, RouterModule } from '@angular/router';
import { languageModule } from '../language/language.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: ScanWristbandComponent
  }
];

@NgModule({
  declarations: [
    ScanWristbandComponent
  ],
  imports: [
    ToastrModule.forRoot({ preventDuplicates: true }),
    CommonModule,
    languageModule,
    TranslateModule,
    FormsModule,
    NgxSpinnerModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class ValidateWristbandModule { }

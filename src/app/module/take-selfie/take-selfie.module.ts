import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfieComponent } from './selfie/selfie.component';
import { Routes, RouterModule } from '@angular/router';
import { SelectPhotoComponent } from './select-photo/select-photo.component';
import { languageModule } from '../language/language.module';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentComponent } from './payment/payment.component';
import { PrintingComponent } from './printing/printing.component';
import { PrintingSuccessComponent } from './printing/printing-success/printing-success.component';
import { PrintingFailedComponent } from './printing/printing-failed/printing-failed.component';
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';
import { PaymentFailedComponent } from './payment/payment-failed/payment-failed.component';
import { CameraComponent } from './camera/camera.component';
import {WebcamModule} from 'ngx-webcam';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import {NgxImageCompressService} from 'ngx-image-compress';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  // {
  //   path: '',
  //   component: SelectPhotoComponent
  // },
  {
    path: '',
    component: SelectPhotoComponent
  },
  {
    path: 'printing',
    component: PrintingComponent
  },
  {
    path: 'printingFailed',
    component: PrintingFailedComponent
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent
  },
  {
    path: 'printingSuccess',
    component: PrintingSuccessComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'paymentFailed',
    component: PaymentFailedComponent
  },
  {
    path: 'paymentSuccess',
    component: PaymentSuccessComponent
  },
  {
    path: 'camera',
    component: CameraComponent
  }
];

@NgModule({
  declarations: [
    SelfieComponent,
    SelectPhotoComponent,
    PaymentComponent,
    PrintingComponent,
    PrintingSuccessComponent,
    PrintingFailedComponent,
    PaymentSuccessComponent,
    PaymentFailedComponent,
    CameraComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    languageModule,
    TranslateModule,
    NgxSpinnerModule,
    WebcamModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class TakeSelfieModule { }

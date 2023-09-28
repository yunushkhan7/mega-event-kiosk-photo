import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./module/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'dashboard/popup',
    loadChildren: () => import('./module/popup/popup.module').then(m => m.PopupModule),
  },
  {
    path: 'select-photo',
    loadChildren: () => import('./module/take-selfie/take-selfie.module').then(m => m.TakeSelfieModule),
  },
  {
    path: 'scan-wristband',
    loadChildren: () => import('./module/validate-wristband/validate-wristband.module').then(m => m.ValidateWristbandModule),
  },
  {
    path: 'gallery',
    loadChildren: () => import('./module/online-gallery/online-gallery.module').then(m => m.OnlineGalleryModule),
  },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

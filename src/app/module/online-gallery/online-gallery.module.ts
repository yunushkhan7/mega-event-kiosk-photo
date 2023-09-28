import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PhotoNotAvailableComponent } from './photo-not-available/photo-not-available.component';
import { ShowPhotosOnlineComponent } from './show-photos-online/show-photos-online.component';
import { ViewImagesOnlineComponent } from './view-images-online/view-images-online.component';

const routes: Routes = [
  {
    path: 'photo-not-avialable',
    component: PhotoNotAvailableComponent
  },
  {
    path: 'show-photo-online',
    component: ShowPhotosOnlineComponent
  },
  {
    path: 'view-image-online',
    component: ViewImagesOnlineComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class OnlineGalleryModule { }

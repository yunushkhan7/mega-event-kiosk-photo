import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import {NgxImageCompressService} from 'ngx-image-compress';
import { PhotoNotAvailableComponent } from './module/online-gallery/photo-not-available/photo-not-available.component';
import { ShowPhotosOnlineComponent } from './module/online-gallery/show-photos-online/show-photos-online.component';
import { ViewImagesOnlineComponent } from './module/online-gallery/view-images-online/view-images-online.component';
import { KeyboardComponent } from './shared/module/keyboard/keyboard.component';
import { SharedModule } from './shared/shared.module';
import { authInterceptor } from './service/auth.interceptor';
import { JwtService } from './service/jwt.service';
import { ApiService } from './service/api.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    PhotoNotAvailableComponent,
    ShowPhotosOnlineComponent,
    ViewImagesOnlineComponent
  ],
  imports: [
    ToastrModule.forRoot({ preventDuplicates: true }),
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
    TranslateModule.forRoot({
    loader: {
       provide: TranslateLoader,
       useFactory: httpTranslateLoader,
       deps: [HttpClient]
       }
    }), BrowserAnimationsModule
  ],
  providers: [
    ApiService,JwtService,
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
    {provide: LocationStrategy, useClass: PathLocationStrategy} ,NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

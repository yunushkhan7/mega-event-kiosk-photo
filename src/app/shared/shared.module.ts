import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyboardKeyDirective, MyAutofocusDirective } from './directives/keyboard-key.directive';
import { OskInputDirective } from './directives/osk-input.directive';
import { KeyboardComponent } from './module/keyboard/keyboard.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const components = [
  KeyboardComponent,
  OskInputDirective,
  KeyboardKeyDirective,
  MyAutofocusDirective,
  PopUpComponent
]


@NgModule({
  declarations: [
    KeyboardComponent,
  OskInputDirective,
  KeyboardKeyDirective,
  MyAutofocusDirective,
  PopUpComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
         provide: TranslateLoader,
         useFactory: httpTranslateLoader,
         deps: [HttpClient]
         }
      })
  ],
  exports: [...components],
})
export class SharedModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

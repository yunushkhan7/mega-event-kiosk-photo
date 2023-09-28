import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {

  defaultLangCode =  'en';
  language = [
    { code: 'en', key: 'english', value: 'English' },
    { code: 'ch', key: 'Chinese', value: '中國人' },
    { code: 'ja', key: 'Japanese', value: '日本語' },
    { code: 'ko', key: 'Korea', value: '韓国' },
  ];
  activeLang: any;
  ifLangSelected: any;

  constructor(
    public translate: TranslateService,
  ){
    this.ifLangSelected = localStorage.getItem('currentLanguage');

    if (this.ifLangSelected) {
      (translate.getLangs().includes(this.ifLangSelected || '') ?
        this.activeLang = localStorage.getItem('currentLanguage')  :
        this.activeLang = this.defaultLangCode
      )
    }
    else{
      this.activeLang = this.defaultLangCode;
    }
  }

  ngOnInit() {

    if(this.ifLangSelected){
      this.activeLang = this.ifLangSelected;


    }else{
      this.activeLang = this.defaultLangCode;

    }
    this.translate.use(this.activeLang);
  }

  onLanguageChange() {
    localStorage.setItem('currentLanguage', this.activeLang);
    this.translate.use(this.activeLang);
 }

}

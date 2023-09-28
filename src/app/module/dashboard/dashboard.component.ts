import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    public translate: TranslateService,
    private api: ApiService
  ){}

  ngOnInit() {

  }


  goTo(){
    this.router.navigate(['/scan-wristband'])


  }

  goToValidateWristband(){
    this.router.navigate(['/scan-wristband'])
  }

  switchLang(lang: string) {
    this.translate.use(lang);
 }

  navigateTo(){
    this.router.navigate(['/welcome'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../service/api.service';
import config from '../../assets/json/config.json';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../shared/pop-up/pop-up.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  date = new Date();
  intervalId: any;
logInRes:any ="";
  constructor(
    private router: Router,
    public translate: TranslateService,
    private api: ApiService,
    public dialog: MatDialog,private spinner: NgxSpinnerService
  ){}

  ngOnInit() {
    this.spinner.hide();




    this.intervalId = setInterval(() => {
      this.date = new Date();
    }, 1000);



  }

  authorizationApi(){
     // this.api.login(config?.loginDetails).subscribe((res:any) => {
      this.spinner.show();
      this.api.authorisedToken().subscribe((res:any) => {

        console.log('first',res)

        if(res?.message == 'Successfully Token Generated!'){
          this.logInRes=res?.data;

        sessionStorage.setItem('token', res?.data?.jwtToken);
        localStorage.setItem('kisokId', res?.data?.kioskId);
        localStorage.setItem('venueId', res?.data?.venueId);
        this.getValidationforSchedule();
        }else{
      this.spinner.hide();

          this.logInRes = '';
        }
        this.spinner.hide();
      },(err:any) => {
        this.spinner.hide();
        this.logInRes = '';
        this.showserverErrorPopUp()
      })
  }

  switchLang(lang: string) {
    this.translate.use(lang);
 }



  navigateTo(){
    this.router.navigate(['/scan-wristband']);

  }

  getValidationforSchedule(){
        const encoded = encodeURI(this.logInRes?.dailySchedule);
        console.log(decodeURI(encoded));
        this.spinner.show();
    this.api.getValidationforSchedule(decodeURI(encoded)).subscribe((res:any) => {
      if(this.logInRes){
        if(res?.data?.data == "closed"){
      this.spinner.hide();

          this.showWeAreClosedPopUp()
         }else{
          this.navigateTo()
         }
      }
      this.spinner.hide();

    },
    (err) => {
      this.spinner.hide();

      this.showserverErrorPopUp()
    })
  }

  showserverErrorPopUp(){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '900px',
      height:'1000px',
      data: {
        type:'serverError'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        // this.authorizationApi();
      }
    });
  }

  showWeAreClosedPopUp(){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '80%',
      // height:'1000px',
      panelClass:'popupclass1',
      data: {
        type:'weAreClosedPopUp'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){

      }
    });
  }
}

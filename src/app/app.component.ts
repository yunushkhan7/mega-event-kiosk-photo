import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'kiosk-photo';
  isKeyBoardActive: any;
  userActivity:any;
  userInactive: Subject<any> = new Subject();
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public translate: TranslateService) {
    translate.addLangs(['en', 'ch']);
    this.translate.use('en');
    this.setTimeout();
    this.userInactive.subscribe(() =>  {
       this.showNoActivityPopUp()
    });
}

ngOnInit() {

}

setTimeout() {
  // this.userActivity = setTimeout(() => this.userInactive.next(undefined), 20000);
  this.userActivity = setTimeout(() => this.userInactive.next(undefined), 60000);
}
@HostListener('window:keydown')
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

// @HostListener('window:keydown.control.p', ['$event'])
//   preventPrint(event: KeyboardEvent) {
//     event.preventDefault();
//   }
isClassActive(event){
  this.isKeyBoardActive=event
}

showNoActivityPopUp(){

 let arry = ['/welcome','/select-photo/payment'];
 let pageUrl =  !arry.includes(this.router.url)
console.log('checking',pageUrl)
  if(pageUrl){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '900px',
      // height:'1000px',
      panelClass:'popupclass3',
      data: {
        type:'countDown'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){

      }
    });
  }


}

}

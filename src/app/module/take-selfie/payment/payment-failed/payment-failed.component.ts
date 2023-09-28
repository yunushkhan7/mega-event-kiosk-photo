import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit  {
  faliureMessage :any;
  userActivity:any;
  userInactive: Subject<any> = new Subject();
  constructor(
    private router: Router
  ){}

  ngOnInit() {
    // var goTO = localStorage.getItem('showPrint');
    this.faliureMessage= localStorage.getItem('faliureMessage');

    // setTimeout(()=>{
    //   if(goTO == 'show'){
    //   this.router.navigate(['/select-photo/printing']);

    //   }else{
    //     this.router.navigate(['/welcome']);

    //   }
    // }, 3000);
  }

  tryAgain(){
    console.log('false try again')
    this.router.navigate(['/select-photo/payment']);
  }

  // setTimeout() {
  //   this.userActivity = setTimeout(() => this.userInactive.next(undefined), 5000);
  //   var goTO = localStorage.getItem('showPrint');

  //   if(goTO == 'show'){
  //     this.router.navigate(['/select-photo/printing']);

  //     }else{
  //       this.router.navigate(['/welcome']);

  //     }
  // }

  @HostListener('window:keydown')
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    // this.setTimeout();
  }

  navigateTo(){
    // this.router.navigate(['/welcome'])
  }

 
}

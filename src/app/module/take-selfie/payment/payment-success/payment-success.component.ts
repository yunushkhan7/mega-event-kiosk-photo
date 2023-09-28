import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  totalAmt:any = 0.00;
  constructor(
    private router: Router
  ){}

  ngOnInit() {
    this.totalAmt = localStorage.getItem('totalAmt');
    setTimeout(()=>{
      let goTo;
      goTo =  localStorage.getItem('showPrint');
      if(goTo == 'show'){
      this.router.navigate(['/select-photo/printing']);

      }else{
        this.router.navigate(['/welcome']);
      }
    }, 3000);
  }

  navigateTo(){
    this.router.navigate(['/welcome'])
  }
}

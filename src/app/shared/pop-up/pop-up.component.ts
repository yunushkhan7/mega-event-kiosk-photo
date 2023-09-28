import { Component, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContentObserver } from '@angular/cdk/observers';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  popUpType: any;
  popUpData: any;
  display: any;
  percentValue: number = 100;
  progressValue: number = 5;
  totalValue: number = 5;
  percentagevalue: number = 5;
  intervalTimer;
  pageUrl:any;
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.popUpType = data?.type;
    this.popUpData = data?.data;
    if (this.popUpType == 'countDown') {
      this.timer(1);
    }
  }
  ngOnInit() {
    this.pageUrl = this.router.url;
    console.log('this.router.url',this.router.url);

  }

  cancel() {
    this.dialogRef.close({
      route: '',
    });
  }

  next() {
    this.dialogRef.close({
      route: '',
    });
  }

  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 60 - 55;
    let textSec: any = '0';
    let statSec: number = 6;
    // const prefix = minute < 10 ? "0" : "";
    this.intervalTimer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 4;
      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;
      // this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      this.display = textSec;
      this.percentValue = this.display * (2 * 10);
      this.percentagevalue = (this.display * 100) / this.totalValue;
      if (seconds == 0) {
        this.TimeOutOrCancel(true)
      }
    }, 3000);
  }

  navigateToHome() {
    this.cancel();
    this.router.navigate(['/welcome']);
  }

  closeAndCancel() {
    this.cancel();
    this.navigateToHome();
  }

  closeAndCancelOne() {
    this.cancel();
  }

  TimeOutOrCancel(isTimer){
  this.cancel();
  clearInterval(this.intervalTimer);
  if(isTimer){
    this.navigateToHome();
  }
}

 continue(){
    this.TimeOutOrCancel(false)
  }
}

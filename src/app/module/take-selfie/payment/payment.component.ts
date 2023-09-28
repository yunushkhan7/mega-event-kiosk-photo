import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  selectedPhotos: any;
  popUpType: any;
  totalAmt: any;

  paymentMethod: boolean = true;
  constructor(
    private router: Router,
    private api: ApiService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.hide();

    // let totalValueAmt = localStorage.getItem('totalAmt');
    // this.totalAmt = (Number(totalValueAmt))
    // console.log("this.totalAmt", this.totalAmt)

    
    let digitalPrinted = false;
    let getData: any = localStorage.getItem('photoPrice');
    this.selectedPhotos = JSON.parse(getData);
    console.log(this.selectedPhotos);
    if (this.selectedPhotos[0].length > 1) {
      digitalPrinted = true;
    } else {
      digitalPrinted = false;
    }

    console.log("digitalPrinted", digitalPrinted);

    //   setTimeout(()=>{                           // <<<---using ()=> syntax
    //     this.showcountDown60();
    // }, 60000);
    let data = localStorage.getItem('digitalEmail');
    console.log(data);
    this.selectedPhotos[0][0].email = data;
    console.log(this.selectedPhotos[0][0]);

    // this.spinner.show();
    let totalValueAmt = localStorage.getItem('totalAmt');


    this.api.saleApi(totalValueAmt).subscribe((res: any) => {
      let salesResponse = res?.data;
      if (res?.message == 'Successfully Sale Method Called') {
        // localStorage.setItem('roundedTotalAmount',roundAmt.toString())
        if (res?.data?.status == 'Success') {
          let salesStatus = res?.data?.terminalStatusCode;
          let refData = res?.data?.data;
          let toJson = JSON.parse(refData);
          console.log('referenceNo', toJson);
          console.log('referenceNo', toJson?.data?.terminalId);

        //   const resData = {

        //     data: {
        //         status: "Success",
        //         terminalStatusCode: "00",
        //         terminalStatus: "Success",
        //         message: "Sale Success",
        //         data:{
        //           merchantAddress
        //           :
        //           "28 GENTING LANE #05-07 PLATINUM 28 S349585",
        //           merchantID
        //           :
        //           "888666999000001",
        //           merchantName
        //           :
        //           "MEGA ADV. DEMO UNIT",
        //           rspCode
        //           :
        //           "-1",
        //           rspText
        //           :
        //           "Timeout",
        //           status
        //           :
        //           "R",

        //           traceNo
        //           :
        //           "19203047",
        //         }


        //     }
        // }

        // salesStatus = resData?.data?.terminalStatusCode;


          console.log('referenceNo', toJson?.data?.traceNo);
          console.log('referenceNo', toJson?.data?.merchantAddress);
          localStorage.setItem('faliureMessage', res?.data?.terminalStatus);
          this.selectedPhotos[0][0].paymentStatus = res?.data?.terminalStatus;

          console.log('000');





          if(digitalPrinted == true){
            console.log('1111');

            this.selectedPhotos[0][1].paymentStatus =
                res?.data?.terminalStatus;
                console.log('1111');
          }

          if (salesStatus == '00') {
          //   var payDate = toJson?.data?.txnDate;
          // var payTym = toJson?.data?.txnTime;

          // eventDateTime
          // 2023-08-28T06:57:59.798
          // "txnDate\":\"20230816\",\"txnTime\":\"1813
          // console.log(payDate.split(""));
          // console.log(payTym.split(""));
          // var splitDates = payDate.split("");
          // var splitTym = payTym.split("");
          // var dateFormate = splitDates[0] + splitDates[1] + splitDates[2] + splitDates[3] + "-" + splitDates[4] + splitDates[5]+ "-" + splitDates[6] + splitDates[7] + "T" + splitTym[0] + splitTym[1] + ":" + splitTym[2] + splitTym[3] + ":00"
          // console.log(dateFormate)

            console.log('222');
            this.selectedPhotos[0][0].paymentReferenceNumber = toJson?.data?.traceNo;
            // this.selectedPhotos[0][0].eventDateTime = dateFormate;
            console.log('222');
            if (digitalPrinted == true) {

              this.selectedPhotos[0][1].paymentReferenceNumber =
              toJson?.data?.traceNo;
            // this.selectedPhotos[0][1].eventDateTime = dateFormate;


              console.log('333');

            }
          }



          // this.selectedPhotos[0].venueId =
          //   localStorage.getItem('venueId');
          // this.selectedPhotos[0].kioskUserId =
          //   localStorage.getItem('kisokId');

          console.log('final', this.selectedPhotos[0]);

          this.api.postPhotosData(this.selectedPhotos[0]).subscribe(
            (res: any) => {
              console.log(res);
              if (res.message == 'Successfully Save Photo Reports API Called') {
                if (res?.data?.message == 'Saved Successfully') {
                  if (salesStatus == '00') {
                    this.router.navigate(['/select-photo/paymentSuccess']);
                  } else {
                    this.router.navigate(['/select-photo/paymentFailed']);
                  }
                } else {
                  this.showserverErrorPopUp();
                }
              } else {
                this.showserverErrorPopUp();
              }
            },
            (err) => {
              this.showserverErrorPopUp();
            }
          );
        } else {
          this.showserverErrorPopUp();
        }
        // this.spinner.hide();
      } else {
        // this.spinner.hide();

        this.showserverErrorPopUp();
      }
    });
  }



  showserverErrorPopUp() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '900px',
      height: '1000px',
      data: {
        type: 'serverError',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  goToselectPhoto() {
    this.router.navigate(['/select-photo/select-photo']);
  }

  goToDashboard() {
    this.router.navigate(['/welcome']);
  }

  goToCompletePayment() {
    this.paymentMethod = false;
    setTimeout(() => {
      // <<<---using ()=> syntax
      this.router.navigate(['/select-photo/paymentSuccess']);
    }, 3000);
  }

  navigateTo() {
    this.router.navigate(['/welcome']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

import {NgxImageCompressService} from 'ngx-image-compress';
import { ApiService } from 'src/app/service/api.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-select-photo',
  templateUrl: './select-photo.component.html',
  styleUrls: ['./select-photo.component.css']
})
export class SelectPhotoComponent implements OnInit {
  selectPhoto:boolean = true;
  clickedPics:any=[]
  selected:any = [];
  showSelectedPics:any = [];
  filterData:any = [];
  photoPrice:any;
  digialPrice:any;
  showScan:any=-1;
  stringQrCode = '';
  src='';
  digitalCount:any= 0;
  photoCount:any= 0;
  totalAmt:any= 0;
  imgResultBeforeCompress;
  imgResultAfterCompress;
  imgResultAfter2;
  changeOrientation:any ="";

  constructor(
    public dialog: MatDialog,
    private router: Router,private dataService: DataService,private imageCompress: NgxImageCompressService, private api:ApiService,private spinner: NgxSpinnerService
  ){
    this.spinner.show();
    this.dataService.sendPicsSubject.subscribe((res: any) => {

        this.spinner.hide();

        this.clickedPics = res.data;

        this.clickedPics.forEach(element => {
          element.isSelected = false

        });


this.spinner.hide();







      // this.api.getAllPhotos().subscribe((res:any) => {
      //   console.log(res);
      // })
          },(err:any) => {
            this.spinner.hide();
          }
          );

  }

  ngOnInit() {
    let getData:any = localStorage.getItem("photoPrice");
    if(getData){
      this.showSelectedPics = JSON.parse(getData);
      console.log('first',this.showSelectedPics)
    }

    this.api.getPriceList().subscribe((res:any)=> {
      if(res?.message == "Successfully Price Settings API Called"){
        this.digialPrice = res?.data?.data[0]?.digitalcopyprice;
      this.photoPrice = res?.data?.data[0]?.photoprintprice;
      }else{
      this.showserverErrorPopUp()
      }
    },(err) => {
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

      }
    });
  }

  continueToConfirm(){

    this.selectPhoto = false;

    this.showSelectedPics = this.selected;
    this.showSelectedPics.forEach(element => {
      element.digitalSelected = false;
      element.photoSelected = false;
      // element.isSelected = false;

    });
    console.log(this.showSelectedPics)
  }

  goToselectPhoto(){
    this.showSelectedPics = [];
    this.selectPhoto = true;
  }

  goToDashboard(){
    this.router.navigate(['/welcome'])
  }

  navigateTo(){
    this.router.navigate(['/welcome'])
  }

  goToEmail(){
    console.log(this.showSelectedPics);
    let arr:any = []
    let digitalPhotos:any = [];
    let printedPhotos:any = [];

    var shouldGoTOEmailScreen =false;
    var printScreenIsDisplayed =false;

    this.showSelectedPics.forEach((ele,index) => {

      if(ele.digitalSelected){
        digitalPhotos.push({imageContent:ele?.imageContent,imageName:ele?.fileName});
        shouldGoTOEmailScreen = true;
        localStorage.setItem('showPrint','hide');

        // digitalPhotos.forEach(element => {
        //   imageContent :element

        // });
      }
      if(ele.photoSelected){
        printedPhotos.push(ele.imageContent+"/"+ ele.imageId);
        printScreenIsDisplayed = true;
        localStorage.setItem('showPrint','show');
      }




    });

    console.log(shouldGoTOEmailScreen);
    // let obj ={


    //     "digitalPhotos": [
    //       {
    //         "imageName": "string",
    //         "imageContent": "string"
    //       }
    //     ],
    //     "printedPhotos": [
    //       "string"
    //     ],
    //     "digitalCopyCount": 0,
    //     "printedCopyCount": 0,
    //     "totalCount": 0,



    //     "amount": 0,
    //     "rfId": 0,

    // }
    // let totalAmt:any = Math.round(((this.digitalCount*this.digialPrice) + (this.photoCount*this.photoPrice)));
    localStorage.setItem('totalAmt',this.totalAmt);
      let getVenuId:any = localStorage.getItem('venueId');
                let venueId:any = parseInt(getVenuId, 10);
      let getKioskId:any = localStorage.getItem('kisokId');

                let kioskUserId:any =parseInt(getKioskId, 10);
    let obj;
    if(!printScreenIsDisplayed){
     obj =  [{
      digitalPhotos: digitalPhotos,
      digitalCopyCount: this.digitalCount,
      email: "",
      venueId:  venueId,
      rfId: localStorage.getItem('rfId'),
    eventDateTime:new Date(),
    // amount:(this.digitalCount*this.digialPrice),

        paymentMode: "card",
        paymentStatus: "",
        kioskUserId: kioskUserId,
        action: "Digital",
        paymentReferenceNumber: ""
       }]
    } else if(!shouldGoTOEmailScreen){
      obj =  [{
        printedPhotos: printedPhotos,
        printedCopyCount: this.photoCount,
       email: "",
       venueId: venueId,
       rfId: localStorage.getItem('rfId'),
     eventDateTime:new Date(),
    //  amount:(this.photoCount*this.photoPrice),
         paymentMode: "card",
         paymentStatus: "",
         kioskUserId: kioskUserId,
         action: "Printed",
         paymentReferenceNumber: ""
        }]

     }
     else if(printScreenIsDisplayed && shouldGoTOEmailScreen){
      obj =   [{
        digitalPhotos: digitalPhotos,
        digitalCopyCount: this.digitalCount,
        email: "",
      venueId: venueId,
      rfId: localStorage.getItem('rfId'),
    eventDateTime:new Date(),
    // amount:(this.digitalCount*this.digialPrice),

    paymentMode: "card",
    paymentStatus: "",
    kioskUserId: kioskUserId,
    action: "Digital",
    paymentReferenceNumber: ""
    },
      {


        printedPhotos: printedPhotos,
        printedCopyCount: this.photoCount,
       email: "",
       venueId: venueId,
       rfId: localStorage.getItem('rfId'),
     eventDateTime:new Date(),
    //  amount:(this.photoCount*this.photoPrice),
     paymentMode: "card",
     paymentStatus: "",
     kioskUserId: kioskUserId,
     action: "Printed",
     paymentReferenceNumber: ""
      }]
     }
    // obj ={
    //   digitalPhotos: digitalPhotos,
    //   printedPhotos: printedPhotos,
    //   digitalCopyCount: this.digitalCount,
    //   printedCopyCount: this.photoCount,
    //   totalCount: this.digitalCount + this.photoCount,
    //   email: "",
    //   venueId: 0,
    // rfId: localStorage.getItem('rfId'),
    // eventDateTime:new Date(),
    // amount:totalAmt
    // }

    arr.push(obj);
    console.log(arr);


    localStorage.setItem("photoPrice",JSON.stringify(arr))
    this.spinner.show();

    this.api.checkLine().subscribe(
      (res: any) => {
        if (res?.message == 'Successfully CheckLine Method Called') {
          if (res?.data?.message == 'CheckLineStatus Successfull') {

            localStorage.removeItem("digitalEmail");
            if(shouldGoTOEmailScreen){
              this.router.navigate(['/select-photo/confirm-email']);
              }else{
              this.router.navigate(['/select-photo/payment']);
    

              }
          } else {
            this.spinner.hide();
            this.showserverErrorPopUp();
          }
        } else {
          this.spinner.hide();
          this.showserverErrorPopUp();
        }


      },
      (err) => {
        this.spinner.hide();

        this.showserverErrorPopUp();

      }
    );



  }





  shareBtn(data:any ,i:any){
    this.showScan = i;
    this.imageCompress.compressFile(data, 50, 50).then(
      result => {
        this.src = result;
        this.imgResultAfterCompress = result;
        console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        this.stringQrCode ='https://www.google.com/imgres?imgurl=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fearth-globe-d-illustration-atlantic-ocean-view-earth-globe-photorealistic-d-illustration-white-background-atlantic-ocean-view-169276454.jpg&imgrefurl=https%3A%2F%2Fwww.dreamstime.com%2Fillustration%2Fearth-globe.html&tbnid=yeIceuaPk5ChhM&vet=12ahUKEwio4q_Bgef8AhVUJbcAHdQ2DRQQMygCegUIARDMAQ..i&docid=fgWrfhFAe7a-jM&w=800&h=781&q=gloab&hl=en&ved=2ahUKEwio4q_Bgef8AhVUJbcAHdQ2DRQQMygCegUIARDMAQ'

      }
    );






  }







  addData(data){
    console.log(data);
    if(data.isSelected == true){
      data.isSelected = false;

    }else{
      data.isSelected = true;

    }
    this.selected = [];

    for(var i=0;i<=this.clickedPics?.length;i++){
      if(this.clickedPics[i].isSelected === true){
        this.selected.push(this.clickedPics[i])
      }
    }

  }




  landScape(i){
    this.changeOrientation = i;

  }

  addPhoto(data){

    if(data.photoSelected == true){
      data.photoSelected = false
    }
    else{
      data.photoSelected = true

    }


    this.calculate()

  }


  removeSelected(data){
    console.log(data)
    this.filterData = this.showSelectedPics
      if(data.isSelected == true){
        data.isSelected = false;

      }else{
        data.isSelected = true;

      }
      this.showSelectedPics = [];

      for(var i=0;i<=this.filterData?.length;i++){
        if(this.filterData[i].isSelected === true){
          this.showSelectedPics.push(this.filterData[i]);
      this.calculate();

        }
      }

    }



  addDigital(data){
    if(data.digitalSelected == true){
      data.digitalSelected = false
    }
    else{
      data.digitalSelected = true

    }


    this.calculate()
  }

  calculate(){
    console.log("calculate")

    this.digitalCount = 0;
    this.photoCount = 0;
        this.showSelectedPics.forEach(element => {
      if(element.digitalSelected == true){
        this.digitalCount++
      }
      if(element.photoSelected == true){
        this.photoCount++

      }





    });

    var num = (this.digitalCount*this.digialPrice) + (this.photoCount*this.photoPrice);
console.log("num",num);
var precise = num.toPrecision(5);
this.totalAmt= parseFloat(precise);
console.log("this.totalAmt",this.totalAmt);


  }


}

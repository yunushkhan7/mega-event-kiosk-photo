import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
@Component({
  selector: 'app-scan-wristband',
  templateUrl: './scan-wristband.component.html',
  styleUrls: ['./scan-wristband.component.css']
})
export class ScanWristbandComponent  implements OnInit  {
  @ViewChild("clickedAutoFocus") private _inputElement: ElementRef;


  scanWristband:boolean = true;
  scanText:string = '';

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router, private dataService:DataService, private api:ApiService,private spinner: NgxSpinnerService
  ){}

  ngOnInit() {
    this.spinner.hide();
  }

  navigateTo(){
    this.router.navigate(['/welcome'])
  }

  // successScreen(){
  //   this.router.navigate(['/select-photo'])

  // }

  goToDashboard(){
    this.router.navigate(['/welcome'])
  }

  fetchCode(){
    if(this.scanText.length > 4){
       this.api.getAllPhotos().subscribe((res:any) => {
        if(res?.status == "Success"){
          this.dataService.sendPics(res);
          this.router.navigateByUrl('/select-photo');
        }

      },(err:any) => {
        this.showserverErrorPopUp()
      })



    }
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

  getImgs(){
    console.log(this.scanText);
    if(this.scanText.length > 1){
    localStorage.setItem('rfId',this.scanText);
    this.spinner.show();
    this.api.getScanImages(this.scanText).subscribe((res:any) => {
      // if(res?.status == "Ok"){
      if(res?.data?.status == "Ok"){
          if(res?.data?.message == "No Images found"){
            this.showErrorMsg(res?.data?.message);

          }else{
            this.dataService.sendPics(res?.data);
        this.router.navigateByUrl('/select-photo');



        // this.router.navigate(['/select-photo/paymentFailed'])

          }
      }else{
        this.showErrorMsg(res?.data?.message);
        // this.toastr.error(res?.data?.message);
        // localStorage.removeItem('rfId');
      }
      this.scanText = "";
      this.spinner.hide();

    },
    (err) =>{
      this.spinner.hide();
      console.log(err);
      this.showErrorMsg(err?.error?.message);

      // this.toastr.error(err?.error?.message);
      this.scanText = "";
      // localStorage.removeItem('rfId');


    }
    )
  }


  }




  call(){
    console.log('clicked')
    this._inputElement.nativeElement.focus();

  }

  showErrorMsg(data:any) {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '80%',
      // height:'150px',
      panelClass: 'popupclass1',
      data: {
        type: 'showErrorMsg',
        data: data,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  @HostListener('keypress', ['$event'])
  onScan(event) {
    console.log(event.keyCode)
    if (event.keyCode == 13) {
      this.getImgs();
      }
    }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent  implements OnInit {
  keyboardInput;
  emailForm: any = new FormGroup({});
  isKeyBoardActive: any;
  selectedPhotos:any;


  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder, private api: ApiService,private router: Router,
  ) {
    this.emailForm = this.fb.group({
      searchTextCtrl: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]]
    });
  }

  get f() { return this.emailForm.controls; }

  ngOnInit(): void {
    document.getElementById('text')?.focus();
    let getData:any = localStorage.getItem("photoPrice");
    this.selectedPhotos = JSON.parse(getData)
    console.log(this.selectedPhotos);


  }


  isClassActive(event){
    this.isKeyBoardActive=event
  }

  getKeyDataInInputField(event) {
    console.log(event)
    this.keyBoardData(event.keyboardInput, event.fieldName)
  }

  keyBoardData(keyboardInput: any, fieldName) {
    console.log(fieldName)

    this.emailForm.patchValue({
      [fieldName]: keyboardInput
    });

  }




  submit(){
    console.log("clicked ")
    let data = this.emailForm.value;
    if(data){
    localStorage.setItem('digitalEmail', data.searchTextCtrl);
    this.router.navigate(['/select-photo/payment'])

    }
    // console.log(data.searchTextCtrl);
    // console.log(this.selectedPhotos[0]);
    // this.selectedPhotos[0].email=data.searchTextCtrl;
    // this.selectedPhotos[0].venueId= localStorage.getItem('venueId');
    // this.selectedPhotos[0].kioskUserId= localStorage.getItem('kisokId');

    // console.log("final", this.selectedPhotos[0])

    // this.api.postPhotosData(this.selectedPhotos[0]).subscribe((res:any) => {
    //   console.log(res);
    //   if(res.message == "Saved Successfully"){
    // this.router.navigate(['/select-photo/payment'])

    //   }
    // },(err) => {
    //   this.showserverErrorPopUp()
    // })
  }

  showserverErrorPopUp(){
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '900px',
      // height:'1000px',
      panelClass:'popupclass2',
      data: {
        type:'serverError'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){

      }
    });
  }

}

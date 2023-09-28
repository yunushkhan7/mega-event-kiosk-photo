import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/service/data.service';
// import { take } from 'rxjs/operators';
// import { CompressImageService } from 'src/app/service/compress-image.service';

import { WebcamImage } from "ngx-webcam";
// import * as uuid from "uuid";

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit {

  displayText:boolean = true;
  countdownDisplay:boolean = false;
  constructor(
    private router: Router,
    public translate: TranslateService,
    private dataService: DataService
  ){}

  ngOnInit() {
    
  }

  picArry:any=[]


  // latest snapshot
  public webcamImage: any;

  handleImage(webcamImage: WebcamImage) {

    this.webcamImage = webcamImage;
    // this.compressImage.compress(this.webcamImage)
    // .pipe(take(1))
    // .subscribe(compressedImage => {
    //   console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
    //   // now you can do upload the compressed image 
    // })
    this.picArry.push(webcamImage);
    console.log(this.picArry);
  }

 



 

  goTo(){
    // this.router.navigate(['/select-photo/select-photo']);
   
  }

  navigateTo(){
    this.router.navigate(['/welcome']) 
  }

  countDown(){
    this.counts++;
    this.displayCountdown = this.counts

    if(this.displayCountdown == 5){
        this.router.navigate(['/select-photo/select-photo']);
    }
  }

  counts=0;
  displayCountdown:any =1

  clickPhoto(){
    this.picArry =[]
    this.dataService.clickCamera("a");

    this.counts = 0;
    this.displayCountdown = 1;
    this.displayText = false;
    this.countdownDisplay = true


      var interval = setInterval(()=> { this.countDown()
    
        if(this.counts == 5){
              clearInterval(interval);
              return;
          }}, 1700);

          this.dataService.sendPics(this.picArry);
          
    
  }

}

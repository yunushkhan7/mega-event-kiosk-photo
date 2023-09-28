import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 API='https://aszhostserver.ddns.net/MegaEvent/api/'
  constructor(private http:HttpClient) { }

  getAllPhotos(){
    // scanNum:any,
    let data = '';
    return this.http.post(this.API+`v1/TestEmail/GetEventPics?rfId=2323`, data);
  }

  postPhotosData(data:any){

    // return this.http.post(`https://aszhostserver.ddns.net/MegaEvent/api/PhotoReports/SavePhotoReports`, data);
    return this.http.post(`https://localhost:3000/kiosk/SavePhotoReports`, data);
  }

  login(logs:any){
    const data ={
      userName: logs?.userName,
      password: logs?.password
    }
    return this.http.post(this.API+`PhotoKiosk/AuthenticateKiosk`, data);
  }

  authorisedToken(){
    return this.http.get(`https://localhost:3000/auth/token`);
  }

  checkLine(){
    return this.http.get(`https://localhost:3000/terminal/check-line`);
  }

  saleApi(amt:any){
    console.log("saleApi",amt);
  
    let totalAmt = (Number(amt)*100)
    console.log("this.totalAmt", totalAmt)

    let roundAmt;
    if((totalAmt ^ 0) !== totalAmt){
      roundAmt = Math.round(totalAmt)
    }else{
      roundAmt = totalAmt;
    }


    let data = {
      "amt": roundAmt
    }
    
    return this.http.post(`https://localhost:3000/terminal/sale`,data);
  }

  getPriceList(){
   let locationId = localStorage.getItem('venueId');

    // return this.http.get(`https://localhost:3000/kiosk/SettingsByLocationId?LocationId=${locationId}`);
    return this.http.get(`https://localhost:3000/kiosk/priceSettings`);

  }

  getScanImages(id:any){

    return this.http.get(`https://localhost:3000/kiosk/eventPics?QRCodeValue=${id}`);

  }

  getValidationforSchedule(encodedUrl){

    return this.http.get(`https://localhost:3000/kiosk/schedule?dailySchedule=${encodedUrl}` );
  }


}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  public clickCameraSubject = new BehaviorSubject(null);
  public sendPicsSubject = new BehaviorSubject(null);

  clickCamera(data: any) {
    this.clickCameraSubject.next(data);
  }

  sendPics(data: any) {
    this.sendPicsSubject.next(data);
  }


}

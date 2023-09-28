import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  show = 'popup1'

  constructor(
    private router: Router
  ){}

  ngOnInit() {

  }

  public onEvent(e: any): void {
    if(e?.data != ''){
      this.show = 'popup3'
    }else{
      this.show = 'popup2'
    }
    document.getElementById('stop')!.click();
  }

  public onError(e: any): void {
    if(e?.data != ''){
      this.show = 'popup2'
    }
  }

  navigateTo(){
    this.router.navigate(['/welcome'])
  }

  goBack(text: string){
    if(text == 'camera'){
      this.router.navigate(['/welcome'])
      document.getElementById('stop')!.click();
    }else{
      this.router.navigate(['/welcome'])
    }
  }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log, console.error);
  }

}

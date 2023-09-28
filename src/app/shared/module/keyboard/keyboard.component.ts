import { Component, OnInit, OnDestroy, HostListener, HostBinding, ElementRef, Output, EventEmitter } from '@angular/core';
// import * as KioskBoard from 'kioskboard';
import { Subscription } from 'rxjs';
import { KeyboardService } from 'src/app/service/keyboard.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent {

  @HostBinding('class.shown')
  private shown!: boolean;
  public inputType!: string;
  public istext=false;
  @Output() isClassActive=new EventEmitter()
  private keyboardSubscription!: Subscription;
  private keyboardSubscription2!: Subscription;
  private inputTypeSubscription!: Subscription;

  constructor(private el: ElementRef,  public keyboard: KeyboardService) {
  }

  ngOnInit() {
    this.keyboard.keyboardRequested2.subscribe(keyData => {
      this.shown = keyData.show;
      this.inputType=keyData.inputType
      console.log(this.inputType)
       this.isClassActive.emit(this.shown)
    });
  }



  ngOnDestroy() {
  // this.keyboardSubscription.unsubscribe();
  //  this.keyboardSubscription2.unsubscribe();
  // this.inputTypeSubscription.unsubscribe();
  }

  onShift() {
    this.keyboard.shift = !this.keyboard.shift;
  }

  onAlt() {
    this.keyboard.alt = !this.keyboard.alt;
  }

  onBackspace() {
    this.keyboard.fireBackspacePressed();
  }

  onClear() {
    this.keyboard.fireClear();
  }

  onEnter() {
    this.keyboard.fireEnterPressed();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('click', ['$event'])
  onMouseEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }


   hideKeyBoard() {
    this.keyboard.fireKeyboardRequested2({
      inputType:this.inputType,
      show:false
    });
   // this.subscribeToKeyboardEvents();
  }
}

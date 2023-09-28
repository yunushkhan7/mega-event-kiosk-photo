import {
  Directive,
  OnInit,
  ElementRef,
  Renderer2,
  HostListener,
  Inject,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter
} from "@angular/core";
// import { KeyboardService } from "./keyboard.service";
import { Subscription } from "rxjs";
import { DOCUMENT } from '@angular/common';
import { KeyboardService } from "src/app/service/keyboard.service";

@Directive({
  selector: "[kioskKeyBoardInput]"
})
export class OskInputDirective {

  private keySubscription!: Subscription;
  private backspaceSubscription!: Subscription;
  private clearSubscription!: Subscription;
  private enterSubscription!: Subscription;
  private measure!: HTMLElement;
  private type!: any ;
     @Output() sendKeyDataToInputField=new EventEmitter()
  constructor(private el: ElementRef, private keyboard: KeyboardService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {}


  ngOnInit() {
    // TODO I'm sure there's an "Angular way" of doing this
    let thisStyle = window.getComputedStyle(this.el.nativeElement);
    this.measure = document.createElement("span");
    this.measure.style.position = "absolute";
    this.measure.style.right = "100%";
    this.measure.style.font = thisStyle.font;
    document.body.appendChild(this.measure);
  }

   //@HostListener("focus")
    @HostListener('focus', ['$event'])
  private onFocus(event) {
    console.log(event)
    this.type=event.target.className
    let keyData={
      inputType:event.target.id,
      show:true
    }
    this.keyboard.fireKeyboardRequested2(keyData);
    this.subscribeToKeyboardEvents();
  }

  @HostListener("blur")
  private onBlur() {
    this.keyboard.fireKeyboardRequested2({
      inputType:this.type,
      show:false
    });
    this.unsubscribeFromKeyboardEvents();
  }

  private subscribeToKeyboardEvents() {
    this.keySubscription = this.keyboard.keyPressed.subscribe(key =>{
      this.onKey(key)
    }

    );
    this.backspaceSubscription = this.keyboard.backspacePressed.subscribe(_ =>
      this.onBackspace()
    );
    this.clearSubscription = this.keyboard.clear.subscribe(_ =>
      this.onClear()
    );
    this.enterSubscription = this.keyboard.enterPressed.subscribe(_ =>
      this.onEnter()
    );
  }

  private unsubscribeFromKeyboardEvents() {
    this.keySubscription.unsubscribe();
    this.backspaceSubscription.unsubscribe();
    this.clearSubscription.unsubscribe();
    this.enterSubscription.unsubscribe();
  }

  private onKey(key: any) {
    // TODO Refactor this into a single method with the code in onBackspace
    let element = this.el.nativeElement,
      start = element.selectionStart,
      end = element.selectionEnd;
     this.measure.textContent = element.value.substr(0, start) + key;

      element.value = element.value.substr(0, start) + key + element.value.substr(end);


    element.focus();
    if((key=='.com')||(key == '.COM')){
      element.selectionStart = element.selectionEnd = start + 4;
    }else{
      element.selectionStart = element.selectionEnd = start + 1;
    }
    // sendinding keyboard input value and field name (for raactive form controller) to the particular input element
    this.sendKeyDataToInputField.emit({
      fieldName:this.el.nativeElement.name,
      keyboardInput:this.el.nativeElement.value
     })
    this.updateScrollPosition();
  }

  private onBackspace() {
    let element = this.el.nativeElement,
      start = element.selectionStart,
      end = element.selectionEnd;
    if (start == 0) {
      return;
    }

    if (start == end) {
      start--;
    }

    this.measure.textContent = element.value.substr(0, start);
    element.value = element.value.substr(0, start) + element.value.substr(end);
    element.focus();
    element.selectionStart = element.selectionEnd = start;
     // sendinding keyboard input value and field name (for raactive form controller) to the particular input element
    this.sendKeyDataToInputField.emit({
      fieldName:this.el.nativeElement.name,
      keyboardInput:this.el.nativeElement.value
     })
    this.updateScrollPosition();
  }

  private onClear() {
    let element = this.el.nativeElement,
      start = element.selectionStart,
      end = element.selectionEnd;

    if (start == 0) {
      return;
    }

    if (start == end) {
      start--;
    }

    this.measure.textContent = "";
    element.value = "";
    element.focus();
    element.selectionStart = element.selectionEnd = start;
     // sendinding keyboard input value and field name (for raactive form controller) to the particular input element
    this.sendKeyDataToInputField.emit({
      fieldName:this.el.nativeElement.name,
      keyboardInput:this.el.nativeElement.value
     })
      this.updateScrollPosition();
  }

  private updateScrollPosition() {
    let element = this.el.nativeElement;
    element.scrollLeft = this.measure.offsetWidth - (element.clientWidth - 10);
  }

  private onEnter() {
    // TODO
     this.el.nativeElement.blur()
    this.keyboard.fireKeyboardRequested2({
      inputType:this.type,
      show:false
    });
    this.unsubscribeFromKeyboardEvents();
  }

  @HostListener('keypress', ['$event'])
  systemKeyEnter(event){
    if(event.keyCode==13){
      this.onEnter()
    }
  }
}

import { Directive, Input, HostBinding, HostListener, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { KeyboardService } from 'src/app/service/keyboard.service';


@Directive({
  selector: '[appKeyboardKey]'
})
export class KeyboardKeyDirective {

private _values: string[] = [];
  private isShifted: boolean = false;
  private isAlt: boolean = false;

  @Input('appKeyboardKey')
  values!: string;

  @HostBinding('innerText')
  currentValue!: string;

  constructor(private keyboard: KeyboardService) { }

  ngOnInit() {
    this._values = this.values.split(' ');
    this.currentValue = this._values[0];

    this.keyboard.shiftChanged.subscribe(shift => {
      this.isShifted = shift;
      this.updateCurrentValue();
    });
    this.keyboard.altChanged.subscribe(alt => {
      this.isAlt = alt;
      this.updateCurrentValue();
    });
  }

  ngOnDestroy() {
    // this.keyboard.shiftChanged.unsubscribe();
    // this.keyboard.altChanged.unsubscribe();
  }

  updateCurrentValue() {
    if (!this.isAlt) {
      if (!this.isShifted) {
        // this.currentValue = this._values[0];
        this.currentValue = this._values[0].toLowerCase();
      }
      else {
        this.currentValue = this._values[0].toUpperCase();
      }
    }
    else {
      if (!this.isShifted) {
        this.currentValue = this._values[1];
      }
      else {
        this.currentValue = this._values[2];
      }
    }
  }

  @HostListener('click')
  onClick() {
    this.keyboard.fireKeyPressed(this.currentValue);
  }
}

@Directive({
  selector: '[myAutofocus]'
})
export class MyAutofocusDirective implements AfterViewInit {
  constructor(private el: ElementRef)
  {
  }
  ngAfterViewInit()
  {
    this.el.nativeElement.focus();
  }
}

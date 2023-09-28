import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class KeyboardService {

  private _shift: boolean = false;

  private _alt: boolean = false;

  private _keyboardRequested: Subject<boolean>;
  private _keyboardRequested2: Subject<any>;
  private _getInputType: Subject<string>;
  private _shiftChanged: Subject<boolean>;
  private _altChanged: Subject<boolean>;
  private _keyPressed: Subject<any>;
  private _backspacePressed: Subject<void>;
  private _clear: Subject<void>;
  private _enterPressed: Subject<void>;

  constructor() {
    this._getInputType = new Subject<string>();
    this._keyboardRequested = new Subject<boolean>();
    this._keyboardRequested2 = new Subject<any>();
    this._shiftChanged = new Subject<boolean>();
    this._altChanged = new Subject<boolean>();
    this._keyPressed = new Subject<any>();
    this._backspacePressed = new Subject<void>();
    this._clear = new Subject<void>();
    this._enterPressed = new Subject<void>();
  }

  get shift(): boolean {
    return this._shift;
  }

  set shift(value: boolean) {
    this._shiftChanged.next((this._shift = value));
  }

  get alt(): boolean {
    return this._alt;
  }

  set alt(value: boolean) {
    this._altChanged.next((this._alt = value));
  }

  //2) show =true ->dispay keyboard  and show =false ->hide keyboard
  // requied for future use
  get keyboardRequested() {
    return this._keyboardRequested;
  }

  //  1)inputType='num' than numerical keyboard will display otherwise alphabatical keyboard will display
  //2)show =true ->dispay keyboard  and show =false ->hide keyboard
  get keyboardRequested2() {
    return this._keyboardRequested2;
  }
  get getInputType() {
    return this._getInputType;
  }

  get shiftChanged() {
    return this._shiftChanged;
  }

  get altChanged() {
    return this._altChanged;
  }

  get keyPressed() {
    return this._keyPressed;
  }

  get backspacePressed() {
    return this._backspacePressed;
  }

  get clear() {
    return this._clear;
  }
  get enterPressed() {
    return this._enterPressed;
  }

  fireKeyboardRequested(show: boolean) {
    this._keyboardRequested.next(show);
  }
  fireKeyboardRequested2(keyData) {
    this._keyboardRequested2.next(keyData);
  }

  inputType(type: string) {
    this._getInputType.next(type);
  }

  fireKeyPressed(key: string) {
    this._keyPressed.next(key);
  }

  fireBackspacePressed() {
    this._backspacePressed.next();
  }

  fireClear() {
    this._clear.next();
  }

  fireEnterPressed() {
    this._enterPressed.next();
  }
}

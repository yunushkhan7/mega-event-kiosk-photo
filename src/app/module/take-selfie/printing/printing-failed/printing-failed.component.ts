import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-printing-failed',
  templateUrl: './printing-failed.component.html',
  styleUrls: ['./printing-failed.component.css']
})
export class PrintingFailedComponent implements OnInit  {
  constructor(
    private router: Router
  ){}

  ngOnInit() {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.router.navigate(['/select-photo/printingSuccess'])
    }, 3000);
  }
  navigateTo(){
    // this.router.navigate(['/welcome'])
  }
}

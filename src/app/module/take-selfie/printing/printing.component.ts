import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.css']
})
export class PrintingComponent implements OnInit  {
  constructor(
    private router: Router
  ){}

  ngOnInit() {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.router.navigate(['/select-photo/printingFailed'])
    }, 3000);
  }

  navigateTo(){
    // this.router.navigate(['/welcome'])
  }
}

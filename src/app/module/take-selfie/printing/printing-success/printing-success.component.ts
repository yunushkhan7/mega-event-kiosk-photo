import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-printing-success',
  templateUrl: './printing-success.component.html',
  styleUrls: ['./printing-success.component.css']
})
export class PrintingSuccessComponent implements OnInit  {
  constructor(
    private router: Router
  ){}

  ngOnInit() {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.router.navigate(['/welcome'])
    }, 3000);
  }

  navigateTo(){
    // this.router.navigate(['/welcome'])
  }
}

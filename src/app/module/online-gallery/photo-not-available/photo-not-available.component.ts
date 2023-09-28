import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-not-available',
  templateUrl: './photo-not-available.component.html',
  styleUrls: ['./photo-not-available.component.css']
})
export class PhotoNotAvailableComponent  implements OnInit  {

  constructor(
    private router: Router
  ){}

  ngOnInit() {
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.router.navigate(['/gallery/show-photo-online'])
    }, 3000);
  }
}

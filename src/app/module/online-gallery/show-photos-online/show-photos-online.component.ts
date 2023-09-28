import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-photos-online',
  templateUrl: './show-photos-online.component.html',
  styleUrls: ['./show-photos-online.component.css']
})
export class ShowPhotosOnlineComponent implements OnInit {

  constructor(
    private router: Router
  ){}

  ngOnInit() {
    setTimeout(()=>{                           // <<<---using ()=> syntax
            this.router.navigate(['/gallery/view-image-online'])

    }, 3000);
  }
}

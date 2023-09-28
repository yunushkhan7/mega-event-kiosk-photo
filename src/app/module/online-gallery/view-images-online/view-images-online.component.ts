import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-images-online',
  templateUrl: './view-images-online.component.html',
  styleUrls: ['./view-images-online.component.css']
})
export class ViewImagesOnlineComponent implements OnInit {

  constructor(
    private router: Router
  ){}

  ngOnInit() {
    // setTimeout(()=>{                           // <<<---using ()=> syntax
    //   this.router.navigate(['/welcome'])
    // }, 3000);
  }
}

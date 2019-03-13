import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fottera',
  templateUrl: './fottera.component.html',
  styleUrls: ['./fottera.component.scss']
})
export class FotteraComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goto(ir){
    this.router.navigateByUrl('/'+ir);
  }

}

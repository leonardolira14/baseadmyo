import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router'

@Component({
  selector: 'app-chome',
  templateUrl: './chome.component.html',
  styleUrls: ['./chome.component.scss']
})
export class ChomeComponent implements OnInit {
  palabra = '';
  constructor(private route: Router) { }

  ngOnInit() {
  }
  buscar(){
    //console.log(this.palabra);
    this.route.navigateByUrl('/buscar/' + this.palabra );
  }
}

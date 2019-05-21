import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-searchb',
  templateUrl: './searchb.component.html',
  styleUrls: ['./searchb.component.scss']
})
export class SearchbComponent implements OnInit {

  palabra = '';
  constructor(private route: Router) { }

  ngOnInit() {
  }
  buscar() {
    this.route.navigateByUrl('/buscar/' + this.palabra );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  car:any[]=[];
  constructor(private router:Router) { }

  ngOnInit() {
  }
  addcart(precio:string){
  	
  	if(localStorage.card_admyo){
  		this.car= JSON.parse(localStorage.card_admyo);
  		this.car["productos"]=precio;
  	}else{
  	  this.car["productos"]=precio;
  	}
  	localStorage.setItem("card_admyo",JSON.stringify(this.car));
  	this.router.navigateByUrl('/preciosqval');
 
  }
}

import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
@Component({
  selector: 'app-preciosqval',
  templateUrl: './preciosqval.component.html',
  styleUrls: ['./preciosqval.component.scss']
})
export class PreciosqvalComponent implements OnInit {
car:any[]=[];
  constructor(private router:Router) { }

  ngOnInit() {
  }
  	addcart(precio:string){
		this.car= JSON.parse(localStorage.card_admyo);
		if(this.car["productosqval"]!=null){
			this.car["productosqval"]=precio;
		}else{
			this.car["productosqval"]=precio;	
		}	
	  	
	  	localStorage.setItem("card_admyo",JSON.stringify(this.car));
	  	this.router.navigateByUrl('/datosregistro');
	 
	}

}

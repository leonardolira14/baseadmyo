import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { GeneralService} from '../../services/general.service';


@Component({
	selector: 'app-menub',
	templateUrl: './menub.component.html',
	styleUrls: ['./menub.component.scss']
})
export class MenubComponent implements OnInit {
	sniper:boolean=false;
	token:string="";
	datosgen:any=[];
	numempresa:string="";
	datosusuarios:any=[];
	datosempresa:any=[];
	constructor(private route:Router,private cookieService:CookieService,private http:GeneralService) {
	if(this.cookieService.get('datosUsuario')){
  		this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios=this.datosgen["datosusuario"];
		this.datosempresa=this.datosgen["empresa"];
		this.token=this.datosgen["Token"];
		this.numempresa=this.datosgen["IDEmpresa"]
  	}
  	
  	
    }

	ngOnInit() {
	}
	cerrar(){
		this.sniper=true;
		this.cookieService.deleteAll();
		localStorage.clear();
		console.log(this.token,this.numempresa)
		this.http.cerrarsession(this.token,this.numempresa)
		.subscribe((data)=>{
			this.sniper=true;
			this.route.navigateByUrl('/');	
		})
		
	}
	goto(ir){
		
		this.route.navigateByUrl('/'+ir);
	}
}

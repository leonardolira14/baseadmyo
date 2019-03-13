import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { BuscarService } from '../../services/buscar.service';
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {
datosgen:any=[];
	datosempresa:any=[]
	token:string="";
	sniper:boolean=false;
	pageActual:number=1;
	datosusuarios:any=[];
	numempresa:boolean=false;
  constructor(private cookieService:CookieService,private route:Router,private parametros:ActivatedRoute,private http:BuscarService) { 
  	if(this.cookieService.get('datosUsuario')){
			this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
			this.datosusuarios=this.datosgen["datosusuario"];
			this.datosempresa=this.datosgen["empresa"];
			this.token=this.datosgen["Token"];
			this.numempresa=true;
		}
  }

  ngOnInit() {
  }

}

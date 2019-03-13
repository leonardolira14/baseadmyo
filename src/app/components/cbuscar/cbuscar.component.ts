import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { BuscarService } from '../../services/buscar.service';
@Component({
  selector: 'app-cbuscar',
  templateUrl: './cbuscar.component.html',
  styleUrls: ['./cbuscar.component.scss']
})
export class CbuscarComponent implements OnInit {
	perflbuscar:any=[];
	datosgen:any=[];
	datosempresa:any=[]
	token:string="";
	sniper:boolean=false;
	pageActual:number=1;
	datosusuarios:any=[];
  constructor(private route:Router,private parametros:ActivatedRoute,private http:BuscarService,private cookieService:CookieService) {
  	

  	if(this.cookieService.get('datosUsuario')){
  		this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios=this.datosgen["datosusuario"];
		this.datosempresa=this.datosgen["empresa"];
		this.token=this.datosgen["Token"];
  	}else{
  		this.datosempresa["IDEmpresa"]='0';
  		this.token='0';
  	}
  	this.parametros.params
  	.subscribe((params)=>{
  		if(params["any"]!==undefined){
  			this.buscar('',params["any"],'','','');
  			//this.buscar(params[0]["any"]);
  		}
  	})
   }

  ngOnInit() {
  	
  }
  buscar(palabra?,id?,filtros?,estado?,pais?){
  	
  	var datos={palabra,IDEmpresa:id,filtros,estado,pais,IDEmpresaEmisora:this.datosempresa["IDEmpresa"]}
  	this.http.nueva_busqueda(datos)
  	.subscribe((data)=>{
  		console.log(data);
  	})
  

  }
}

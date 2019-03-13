import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ImagenService } from '../../services/imagen.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
@Component({
  selector: 'app-cdetalleiamgen',
  templateUrl: './cdetalleiamgen.component.html',
  styleUrls: ['./cdetalleiamgen.component.scss']
})
export class CdetalleiamgenComponent implements OnInit {
	tipo_imagen:string="";
	fecha_imagen:string="";
	leyenda:string="EN LOS ULTIMOS 12 MESES";
	imagen:any=[];

	datosgen:any=[];
	datosusuarios:any=[];
	datosempresa:any=[];
	token:string="";
	sniper:boolean=false;
	tipo_contrario:string="";


	public barChartOptions: ChartOptions = {
	    responsive: true,
	    
	};
	public barChartLabels: string[] = [''];
 	public barChartType: ChartType = 'horizontalBar';
  	public barChartLegend = true;

  constructor(private http:ImagenService,private cookieService:CookieService,private route:Router,private parametros:ActivatedRoute) {
  	
  	this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
	this.datosusuarios=this.datosgen["datosusuario"];
	this.datosempresa=this.datosgen["empresa"];
	this.token=this.datosgen["Token"];
  	this.parametros.params
	  	.subscribe((params)=>{
	  		this.sniper=true;
	  		if(params["tipo"]!==undefined){
	  			this.tipo_imagen=params["tipo"];
	  		}
	  		if(params["fecha"]!==undefined){
	  			this.fecha_imagen=params["fecha"];
	  		}
	  		this.solicitar()
	  	})
   }

  ngOnInit() {
  }
  cambiar(y){
  	this.fecha_imagen=y;
  	this.solicitar();
  }
   solicitar(){
  	this.sniper=true;
  	if(this.tipo_imagen==="cliente"){
  		this.tipo_contrario="Proveedores";
  	}else{
  		this.tipo_contrario="Clientes";
  	}
  	this.fecha_imagen==="A"?this.leyenda="EN LOS úLTIMOS 12 MESES":this.leyenda="EN LOS ULTIMOS 30 Días"
  	
  	var datos={fecha:this.fecha_imagen,tipo:this.tipo_imagen,IDEmpresa:this.datosempresa["IDEmpresa"]};
  	this.http.detallesimagen(datos)
  	.subscribe((data)=>{
  		this.imagen=data["response"]["result"]["imagen"];
  		this.sniper=false;
  	})
  }

}

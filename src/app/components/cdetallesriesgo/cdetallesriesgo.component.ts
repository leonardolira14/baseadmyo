import { Component, OnInit } from '@angular/core';
import { RiesgoService } from '../../services/riesgo.service';
import { Router,ActivatedRoute} from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-cdetallesriesgo',
  templateUrl: './cdetallesriesgo.component.html',
  styleUrls: ['./cdetallesriesgo.component.scss']
})
export class CdetallesriesgoComponent implements OnInit {
	fecha_riesgo;
	tipo_persona;
	 detalle_riesgo:any=[];
	datosgen:any=[];
	datosusuarios:any=[];
	datosempresa:any=[];
	token:string="";
	sniper:boolean=false;
	leyenda:string="EN LOS ULTIMOS 12 MESES";
	 tipo;
	public barChartOptions: ChartOptions = {
	    responsive: true,
	     scales: {
	        xAxes: [{
	            ticks:{
	            	beginAtZero:true
	            },      
	            stacked: false,
	            gridLines: {
	                offsetGridLines: true
	            }
	        }],
	        yAxes: [{
	            ticks:{
	            	beginAtZero:true
	            },
	            stacked: false,
	            gridLines: {
	                offsetGridLines: false
	            }
	        }]
	    }
	    
	};
	public doughnutColors:any[] = [
	{ backgroundColor: ['#005792','#f53d3d'] },
	{ borderColor: ['#005792','#f53d3d'] }];
	public barChartLabels: string[] = [''];
 	public barChartType: ChartType = 'horizontalBar';
  	public barChartLegend = true;
  
  constructor(
  	private http:RiesgoService,
  	private parametros:ActivatedRoute,
  	private cookieService:CookieService
  	) { 
  	this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
	this.datosusuarios=this.datosgen["datosusuario"];
	this.datosempresa=this.datosgen["empresa"];
	this.token=this.datosgen["Token"];
  	this.parametros.params
  	.subscribe((params)=>{
  		if(params["tipo"]!==undefined){
	  		this.tipo_persona=params["tipo"];
	  	}
	  	if(params["fecha"]!==undefined){
	  		this.fecha_riesgo=params["fecha"];
	  	}
  	})
  }

  ngOnInit() {
  	this.sniper=true;
  	(this.tipo_persona==="cliente")?this.tipo='clientes':this.tipo="proveedores";
  	this.fecha_riesgo==="A"?this.leyenda="EN LOS úLTIMOS 12 MESES":this.leyenda="EN LOS ULTIMOS 30 Días"
  	var datos={fecha:this.fecha_riesgo,tipo:this.tipo_persona,IDEmpresa:this.datosempresa["IDEmpresa"]};
  	this.http.getdetalle(datos)
  	.subscribe(data=>{
  		this.detalle_riesgo=data["response"]["result"];
  		console.log(data);
  		this.sniper=false;
  	})
  }
  cambiar(fecha){
   	this.fecha_riesgo=fecha;
   	this.ngOnInit();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ImagenService } from '../../services/imagen.service';
@Component({
  selector: 'app-ccimagen',
  templateUrl: './ccimagen.component.html',
  styleUrls: ['./ccimagen.component.scss']
})
export class CcimagenComponent implements OnInit {
	public tipo_imagen:string="";
	public fecha_imagen:string="";
	public leyenda:string="EN LOS ULTIMOS 12 MESES";
	public imagen:any=[];
	

	datosgen:any=[];
	datosusuarios:any=[];
	datosempresa:any=[];
	token:string="";
	sniper:boolean=false;
	tipo_contrario:string="";

	public lineChartDataem:Array<any> = [
	    {data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	label: "Media de calificaciones"}
	    
	  ];
	  public lineChartLabelsem:Array<any> = [];
	  public lineChartDataec:Array<any> = [
	    {data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	label: "No de calificaciones"}
	    
	  ];
	  public lineChartLabelsec:Array<any> = [];



	  public lineChartOptions:any = {
	    responsive: true
	  };
	  public lineChartColors:Array<any> = [
	    { // grey
	      backgroundColor: 'rgba(255, 133, 27, 1)',
	      borderColor: 'rgba(255, 133, 27, 1)',
	      pointBackgroundColor: 'rgba(255, 133, 27, 1)',
	      pointBorderColor: '#fff',
	      pointHoverBackgroundColor: '#fff',
	      pointHoverBorderColor: 'rgba(255, 133, 27, 1)'
	    }
	  ];
	 
	  public lineChartLegend:boolean = true;
	  public lineChartType:string = 'line';



  constructor(private http:ImagenService,private cookieService:CookieService,private route:Router,private parametros:ActivatedRoute) 
  {
  		
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
  ir(){
  	this.route.navigateByUrl('/detalleimagen/'+this.tipo_imagen+"/"+this.fecha_imagen);
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
  	this.http.imagen(datos)
  	.subscribe((data)=>{
  		console.log(data)
  		this.imagen=data["response"]["result"]["imagen"];
  		this.lineChartDataem[0]["data"]=this.imagen["evolucionmedia"]["data"];
  		this.lineChartLabelsem=this.imagen["evolucionmedia"]["label"];

  		this.lineChartDataec[0]["data"]=this.imagen["serievolucion"]["data"];
  		this.lineChartLabelsec=this.imagen["serievolucion"]["label"];
  		this.sniper=false;
  	})
  }
}

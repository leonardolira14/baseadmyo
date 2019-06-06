import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RiesgoService } from '../../services/riesgo.service';
@Component({
  selector: 'app-criesgo',
  templateUrl: './criesgo.component.html',
  styleUrls: ['./criesgo.component.scss']
})
export class CriesgoComponent implements OnInit {
	tipo_imagen:string="";
	fecha_imagen:string="";
	leyenda:string="EN LOS ÚLTIMOS 12 MESES";
	riesgo:any=[];

	datosgen:any=[];
	datosusuarios:any=[];
	datosempresa:any=[];
	token:string="";
	sniper:boolean=false;
	tipo_contrario:string="";

	public pieChartLabels:string[] = ["Mejorados","Empeorados","Mantenidos"];
	public pieChartData:number[] = [];
	public pieChartType:string = 'pie';
	  public doughnutColors:any[] = [
	{ backgroundColor: ['rgba(0, 166, 90, 1)','rgba(245, 61, 61, 1)','rgba(255, 133, 27, 1)'] },
	{ borderColor: ['rgba(0, 166, 90, 1)','rgba(245, 61, 61, 1)','rgba(255, 133, 27, 1)'] }];




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
  public lineChartData:Array<any> = [
    {data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
label: "Número de Empresas"}
    
  ];
    public lineChartLabels:Array<any> = [];

  constructor(
    private http:RiesgoService,
    private cookieService:CookieService,
    private route:Router,
    private parametros:ActivatedRoute
    ) {
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
  cambiar(a){
  	this.fecha_imagen=a;
  	this.solicitar();
  }
  solicitar(){
  	this.sniper=true;
  	if(this.tipo_imagen==="cliente"){
  		this.tipo_contrario="clientes";
  	}else{
  		this.tipo_contrario="proveedores";
  	}
  	this.fecha_imagen==="A"?this.leyenda="EN LOS ÚLTIMOS 12 MESES":this.leyenda="EN LOS ÚLTIMOS 30 Días"
  	var datos={fecha:this.fecha_imagen,tipo:this.tipo_imagen,IDEmpresa:this.datosempresa["IDEmpresa"]};
  	this.http.getriesgo(datos)
  	.subscribe((data)=>{
  		this.sniper=false;
  		this.riesgo=data["response"]["result"];
  		this.lineChartData[0]["data"]=this.riesgo["evolucion"]["data"][0]["data"];
  		this.lineChartLabels=this.riesgo["evolucion"]["Labels"];
  		this.pieChartData=this.riesgo["seriecir"]["data"];
  		console.log(this.riesgo)
  	})
  	
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  detalle(){
    this.route.navigateByUrl("/detallesriesgo/"+this.tipo_imagen+"/"+this.fecha_imagen);
  }

}

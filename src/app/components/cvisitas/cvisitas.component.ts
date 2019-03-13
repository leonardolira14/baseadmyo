import { Component, OnInit } from '@angular/core';
import { VisitasService } from '../../services/visitas.service';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cvisitas',
  templateUrl: './cvisitas.component.html',
  styleUrls: ['./cvisitas.component.scss']
})
export class CvisitasComponent implements OnInit {
	fechasvisitas:string="Últimos 30 días";
	public pieChartLabels:string[] = ["Clientes","Proveedores","Anonimas","Otras"];
	public pieChartData:number[] = [];
	public pieChartType:string = 'pie';
  public doughnutColors:any[] = [
{ backgroundColor: ['rgba(255, 133, 27, 1)','rgba(0, 87, 146, 1)','rgba(0, 166, 90, 1)','rgba(245, 61, 61, 1)'] },
{ borderColor: ['rgba(255, 133, 27, 1)','rgba(0, 87, 146, 1)','rgba(0, 166, 90, 1)','rgba(245, 61, 61, 1)'] }];

  numerovisitas:string="0";
public lineChartData:Array<any> = [
    {data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
label: "Número de Visitas"}
    
  ];
  public lineChartLabels:Array<any> = [];
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

	datosgen:any=[];
	datosempresa:any=[];
  datosusuarios:any=[];
	token:string="";
	sniper:boolean=false;
	staticAlertClosed:boolean=false;
	successAlertClosed:boolean=false;
	alertterror:string="";
	alertsuccess:string="";
  clientes:any=[];
  proveedores:any=[];
  otros:any=[];
  serverruta:string=environment.urlserver
  constructor(public http:VisitasService,private cookieService:CookieService,private modalService: NgbModal,private route:Router) {
  	this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
  	this.datosusuarios=this.datosgen["datosusuario"];
  	this.datosempresa=this.datosgen["empresa"];
  	this.token=this.datosgen["Token"];
   }

  ngOnInit() {
    this.sniper=true;
  	var datos={IDEmpresa:this.datosempresa["IDEmpresa"],token:this.token,Anio:'M'}
  	this.http.getall(datos)
  	.subscribe((data)=>{
       console.log(data);
      this.sniper=false;
      if(data["response"]["code"]===0){
        this.pieChartData=data["response"]["result"]["series"]["data"];
        this.numerovisitas=data["response"]["result"]["Total"];
        this.lineChartLabels=data["response"]["result"]["evo"]["Labels"];
        this.lineChartData[0]["data"]=data["response"]["result"]["evo"]["data"][0]["data"];
        this.clientes=data["response"]["result"]["visitas"]["clientes"];
        this.proveedores=data["response"]["result"]["visitas"]["proveedores"];
        this.otros=data["response"]["result"]["visitas"]["Otros"];
      }else{

      }
  		
  	})
  }
  visitar(ir){
    this.route.navigateByUrl('/perfilbuscado/'+ir)
  }
  cambiomes(mes){
     this.sniper=true;
    var datos={IDEmpresa:this.datosempresa["IDEmpresa"],token:this.token,Anio:mes}
    this.http.getall(datos)
    .subscribe((data)=>{
      console.log(data);
      if(mes==="M"){
        this.fechasvisitas="Últimos 30 días";
      }else{
        this.fechasvisitas="Últimos 12 Meses";
      }
       this.sniper=false;
      if(data["response"]["code"]===0){
        this.pieChartData=data["response"]["result"]["series"]["data"];
        this.numerovisitas=data["response"]["result"]["Total"];
        this.lineChartLabels=data["response"]["result"]["evo"]["Labels"];
        this.lineChartData[0]["data"]=data["response"]["result"]["evo"]["data"][0]["data"];
        this.clientes=data["response"]["result"]["visitas"]["clientes"];
        this.proveedores=data["response"]["result"]["visitas"]["proveedores"];
        this.otros=data["response"]["result"]["visitas"]["Otros"];
      }else{

      }
      
    })
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}

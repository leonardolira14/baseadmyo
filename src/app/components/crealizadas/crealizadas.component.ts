import { Component, OnInit,ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons,NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../../services/general.service';
import { Router,ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crealizadas',
  templateUrl: './crealizadas.component.html',
  styleUrls: ['./crealizadas.component.scss']
})
export class CrealizadasComponent implements OnInit {
	model: any={};
	listaclie:any=[];
	calificaciones:any=[];
	detalless:any=[];

	datosgen:any=[];
	datosempresa:any=[];
	datosusuarios:any=[];
	token:string="";
	sniper:boolean=false;
	tipo:string='';
	serverruta:string=environment.urlserver;
	pageActual:number=1;
  constructor(private config: NgbPopoverConfig,private parametros:ActivatedRoute,private route:Router, private http:GeneralService,private cookieService:CookieService,private modalService: NgbModal) { 
  		this.config.triggers = 'hover';
  		this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios=this.datosgen["datosusuario"];
		this.datosempresa=this.datosgen["empresa"];
		this.token=this.datosgen["Token"];
		this.parametros.params
	  	.subscribe((params)=>{
	  		this.sniper=true;
	  		if(params["tipo"]!==undefined){
	  			this.tipo=params["tipo"];
	  		}
	  		this.getlista();
	  		
	  	})
  }

  ngOnInit() {
  }
  getlista(){
  	this.sniper=true;
    if(this.model["Ifechainicio"]){
     var  fecha=this.model["Ifechainicio"]["year"]+"-"+this.model["Ifechainicio"]["month"]+"-"+this.model["Ifechainicio"]["day"];
      this.model["Ifechainicio"]=fecha;
    }
    if(this.model["Ifechafin"]){
     var  fecha=this.model["Ifechafin"]["year"]+"-"+this.model["Ifechafin"]["month"]+"-"+this.model["Ifechafin"]["day"];
      this.model["Ifechafin"]=fecha;
    }
  	this.model["IDEmpresa"]=this.datosempresa["IDEmpresa"];
  	this.model["token"]=this.token;
  	this.model["tipo"]=this.tipo;
  	console.log(this.model);
  	this.http.getallrealizadas(this.model)
  	.subscribe((data)=>{
      this.model={};
  	this.sniper=false;
  		this.listaclie=data["response"]["result"]["lista"];
  		this.calificaciones=data["response"]["result"]["calificaciones"];
  		
  	})
  
  }




  resumengo(){
  	this.route.navigateByUrl('/resumen/'+this.tipo);
  }
  lista(){
  	this.route.navigateByUrl('/lista/'+this.tipo);
  }
  realizadas(){
  	this.route.navigateByUrl('/realizadas/'+this.tipo);
  }
  visitar(ir){
    this.route.navigateByUrl('/perfilbuscado/'+ir);  
  }
  openalert(alert){
		this.modalService.open(alert,{ariaLabelledBy: 'modal-basic-title'});
	}
closemodel(content){
		this.modalService.dismissAll(content);
}
  detalles(ir,alert){
  	this.sniper=true;
  	var datos={IDEmpresa:this.datosempresa["IDEmpresa"],token:this.token,IDValora:ir}
  	this.http.detallescalificacion(datos)
  	.subscribe((data)=>{
      console.log(data);
  		this.sniper=false;
  		this.detalless=data["response"]["result"]["lista"];
  		this.openalert(alert);
  		console.log(data)
  	})
    
  }
}

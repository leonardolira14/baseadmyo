import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AsociacionesService } from '../../services/asociaciones.service';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-casociaciones',
  templateUrl: './casociaciones.component.html',
  styleUrls: ['./casociaciones.component.scss']
})
export class CasociacionesComponent implements OnInit {
	asociaciones:any=[];
	modelcamara:any={};
	listasociaciones:any=[];

	palabra:string="";
	datosgen:any=[];
	datosempresa:any=[]
	token:string="";
	sniper:boolean=false;
	staticAlertClosed:boolean=false;
	successAlertClosed:boolean=false;
	alertterror:string="";
	alertsuccess:string="";
	pageActual:number=1;
	datosusuarios:any=[];
  constructor(private route:Router, private http:AsociacionesService,private cookieService:CookieService,private modalService: NgbModal) 
  {
  	this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
	this.datosusuarios=this.datosgen["datosusuario"];
	this.datosempresa=this.datosgen["empresa"];
	this.token=this.datosgen["Token"];
  }

  ngOnInit() {
  	this.sniper=true;
		var datos={IDEmpresa:this.datosempresa["IDEmpresa"],token:this.token};
		this.http.getall(datos)
		.subscribe((data)=>{
			this.sniper=false;
			if(data["response"]["code"]==0){
				this.asociaciones=data["response"]["result"];
				this.listasociaciones=this.asociaciones;
			}else{
				this.route.navigateByUrl('/');
			}
		})
  }
  openalert(alert){

		this.modalService.open(alert,{ariaLabelledBy: 'modal-basic-title'});
	}
	close(){
		this.staticAlertClosed=false;
		this.successAlertClosed=false;
	}
	closemodel(content){
		this.modelcamara={};
		this.modalService.dismissAll(content);
	}
	editar(id,alert){
		if(this.datosusuarios["Tipo_Usuario"]!=="Master"){
	  		this.staticAlertClosed=true;
	  		this.alertterror="No esta autorizado para realizar esta acción";
	  		setTimeout(()=>{
	  			this.staticAlertClosed=false;
	  		},3000)
	  		return false;
  		}
		this.asociaciones.forEach((data)=>{
			if(data.IDAsocia===id){
				this.modelcamara=data;
			}
		})
		this.openalert(alert)
	}
	deci(alert){
		if(this.datosusuarios["Tipo_Usuario"]!=="Master"){
	  		this.staticAlertClosed=true;
	  		this.alertterror="No esta autorizado para realizar esta acción";
	  		setTimeout(()=>{
	  			this.staticAlertClosed=false;
	  		},3000)
	  		return false;
  		}
  		this.sniper=true;
		if(this.modelcamara["IDAsocia"]){
			this.update(alert);
		}else{
			this.save(alert);
		}
	}
	busqueda(){
		if(this.palabra===""){
  			this.asociaciones=this.listasociaciones;
	  	}else{
	  		this.asociaciones=this.buscapalarabra();
	  	}
	}
	buscapalarabra(){
  	let usuario=this.asociaciones;
  		return usuario.filter(usuario=>usuario.Asociacion.toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));
  }
	delete(id){
		if(this.datosusuarios["Tipo_Usuario"]!=="Master"){
	  		this.staticAlertClosed=true;
	  		this.alertterror="No esta autorizado para realizar esta acción";
	  		setTimeout(()=>{
	  			this.staticAlertClosed=false;
	  		},3000)
	  		return false;
  		}
  		this.sniper=true;
		var datos={IDEmpresa:this.datosempresa["IDEmpresa"],token:this.token,IDAsocia:id};
		this.http.delete(datos)
		.subscribe((data)=>{
			this.sniper=false;
			if(data["response"]["code"]===0){
				this.asociaciones=data["response"]["result"];
				this.listasociaciones=this.asociaciones;
				this.closemodel(alert);
				this.successAlertClosed=true;
				this.alertsuccess="Datos Actualizados";
				setTimeout(()=>{
					this.successAlertClosed=false;
				},3000)
			}else{
				this.alertterror=data["response"]["result"];
				setTimeout(()=>{
					this.staticAlertClosed=false;
				},3000)
			}
		})
	}
	save(alert){
		this.modelcamara["IDEmpresa"]=this.datosempresa["IDEmpresa"];
		this.modelcamara["token"]=this.token;
		this.http.save(this.modelcamara)
		.subscribe((data)=>{
			this.sniper=false;
			if(data["response"]["code"]===0){
				
				this.asociaciones=data["response"]["result"];
				this.listasociaciones=this.asociaciones;
				this.closemodel(alert);
				this.successAlertClosed=true;
				this.alertsuccess="Datos Actualizados";
				setTimeout(()=>{
					this.successAlertClosed=false;
				},3000)
			}else{
				this.alertterror=data["response"]["result"];
				setTimeout(()=>{
					this.staticAlertClosed=false;
				},3000)
			}
		})
	}
	update(alert){
		this.modelcamara["IDEmpresa"]=this.datosempresa["IDEmpresa"];
		this.modelcamara["token"]=this.token;
		this.http.update(this.modelcamara)
		.subscribe((data)=>{
			this.sniper=false;
			if(data["response"]["code"]===0){
				
				this.asociaciones=data["response"]["result"];
				this.listasociaciones=this.asociaciones;
				this.closemodel(alert);
				this.successAlertClosed=true;
				this.alertsuccess="Datos Actualizados";
				setTimeout(()=>{
					this.successAlertClosed=false;
				},3000)
			}else{
				this.alertterror=data["response"]["result"];
				setTimeout(()=>{
					this.staticAlertClosed=false;
				},3000)
			}
		})
	}
}

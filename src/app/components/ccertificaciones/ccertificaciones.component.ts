import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CertificacionesService } from '../../services/certificaciones.service';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-ccertificaciones',
	templateUrl: './ccertificaciones.component.html',
	styleUrls: ['./ccertificaciones.component.scss']
})
export class CcertificacionesComponent implements OnInit {
	

	certificaciones:any=[];
	modelcertificacion:any={};
	listnormas:any=[];

	filemarcalogo:File=null;
	public imagePath;
	public message;
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
	serverruta:string=environment.urlserver
	constructor(private route:Router, private http:CertificacionesService,private cookieService:CookieService,private modalService: NgbModal) { 
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
				this.certificaciones=data["response"]["result"];
				this.listnormas=this.certificaciones;
			}else{
				this.route.navigateByUrl('/');
			}
		})
	}
	busqueda(){
		if(this.palabra===""){
  			this.certificaciones=this.listnormas;
	  	}else{
	  		this.certificaciones=this.buscapalarabra();
	  	}
	}
	buscapalarabra(){
  	let usuario=this.certificaciones;
  		return usuario.filter(usuario=>usuario.Norma.toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));
  }
	editar(id,alert){
		this.certificaciones.forEach((norma)=>{
			if(norma.IDNorma===id){
				this.modelcertificacion=norma;
				return false;
			}
		})
		this.openalert(alert);
	}
	openalert(alert){

		this.modalService.open(alert,{ariaLabelledBy: 'modal-basic-title'});
	}
	close(){
		this.staticAlertClosed=false;
		this.successAlertClosed=false;
	}
	closemodel(content){
		this.modelcertificacion={};
		this.modalService.dismissAll(content);
	}
	preview(files){
		if (files.length === 0){
			return false;
		}

		var mimeType = files[0].type;

		this.filemarcalogo=<File>files[0];
		this.modelcertificacion["Archivo"]=files[0].name;

	}
	delete(id,alert){
		if(this.datosusuarios["Tipo_Usuario"]!=="Master"){
	  		this.staticAlertClosed=true;
	  		this.alertterror="No esta autorizado para realizar esta acción";
	  		setTimeout(()=>{
	  			this.staticAlertClosed=false;
	  		},3000)
	  		return false;
  		}
  		this.sniper=true;
		var datos={IDEmpresa:this.datosempresa["IDEmpresa"],token:this.token,IDNorma:id};
		this.http.delete(datos)
		.subscribe((data)=>{
			this.sniper=false;
			if(data["response"]["code"]===0){
				this.certificaciones=data["response"]["result"];
				this.listnormas=this.certificaciones;
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
		if(this.modelcertificacion.IDNorma){
			this.update(alert);
		}else{
			this.save(alert);
		}
	}
	update(alert){
		var fecha="";
		if(this.modelcertificacion["Fecha"].day){
			fecha=this.modelcertificacion["Fecha"].day+"-"+this.modelcertificacion["Fecha"].month+"-"+this.modelcertificacion["Fecha"].year	
		}else{
			fecha=this.modelcertificacion["Fecha"];
		}
		var formdata=new FormData();
		formdata.append("IDNorma",this.modelcertificacion["IDNorma"]);
		formdata.append("Norma",this.modelcertificacion["Norma"]);
		formdata.append("Fecha",fecha);
		formdata.append("Calificacion",this.modelcertificacion["Calif"]);
		if(this.filemarcalogo){
			formdata.append("Archivo",this.filemarcalogo,this.filemarcalogo.name);	
		}else{
			formdata.append("Archivo",this.modelcertificacion["Archivo"]);	
		}
		
		formdata.append("token",this.token);
		formdata.append("IDEmpresa",this.datosempresa["IDEmpresa"]);
		this.http.update(formdata)
		.subscribe((data)=>{
			this.sniper=false;
			if(data["response"]["code"]===0){
				this.certificaciones=data["response"]["result"];
				this.listnormas=this.certificaciones;
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
		var fecha=this.modelcertificacion["Fecha"].day+"-"+this.modelcertificacion["Fecha"].month+"-"+this.modelcertificacion["Fecha"].year
		
		var formdata=new FormData();
		formdata.append("Norma",this.modelcertificacion["Norma"]);
		formdata.append("Fecha",fecha);
		formdata.append("Calificacion",this.modelcertificacion["Calif"]);
		if(this.filemarcalogo){
			formdata.append("Archivo",this.filemarcalogo,this.filemarcalogo.name);	
		}
		formdata.append("token",this.token);
		formdata.append("IDEmpresa",this.datosempresa["IDEmpresa"]);
		
		this.http.save(formdata)
		.subscribe((data)=>{
			this.sniper=false;
			if(data["response"]["code"]===0){
				
				this.certificaciones=data["response"]["result"];
				this.listnormas=this.certificaciones;
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


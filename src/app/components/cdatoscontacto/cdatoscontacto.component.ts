import { Component, OnInit } from '@angular/core';
import { GeneralService} from '../../services/general.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router'

@Component({
  selector: 'app-cdatoscontacto',
  templateUrl: './cdatoscontacto.component.html',
  styleUrls: ['./cdatoscontacto.component.scss']
})
export class CdatoscontactoComponent implements OnInit {
	sniper:boolean=false;
  datosgen:any[]=[];
  datosempresa:any[]=[];
  rutaserver:string="";
  token:string="";
  numempresa:string="";
  datoscontacto:any={};
  staticAlertClosed:boolean=false;
  successAlertClosed:boolean=false;
  alertterror:string="";
  alertsuccess:string="";
  estados:any[]=[];
  constructor(private modalService: NgbModal,private route:Router,private cookieService:CookieService,private http:GeneralService ) {
	  this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
	  this.numempresa=this.datosgen["datosusuario"]["IDEmpresa"];
	  this.datosempresa=this.datosgen["empresa"];
	  this.token=this.datosgen["Token"];
	  this.rutaserver=environment.urlserver;
	  this.datoscontacto.Sitio_Web=this.datosempresa["Sitio_Web"];
	  this.datoscontacto.Direc_Fiscal=this.datosempresa["Direc_Fiscal"];
	  this.datoscontacto.Colonia=this.datosempresa["Colonia"];
	  this.datoscontacto.Deleg_Mpo=this.datosempresa["Deleg_Mpo"];
	  this.datoscontacto.Estado=this.datosempresa["Estado"];
	  this.datoscontacto.Codigo_Postal=this.datosempresa["Codigo_Postal"];
	  this.datoscontacto.IDEmpresa=this.datosempresa["IDEmpresa"];
   }

  ngOnInit() {
    this.http.getestados()
    .subscribe((data)=>{
      this.estados=data["response"]["result"];
      console.log(data);
    })
  }
  enviarform(){
  	this.sniper=true;
  	this.http.updatecontacto(this.token,this.datoscontacto)
  	.subscribe((data)=>{
  		this.sniper=false;
  		if(data["response"]["code"]===0){
			this.datosgen["empresa"]=data["response"]["result"]["empresa"];
			this.cookieService.set('datosUsuario',JSON.stringify(this.datosgen));
			this.successAlertClosed=true;
			this.alertsuccess="Datos Actualizados"
  		}else{
  			this.alertterror=data["response"]["result"];
  			this.staticAlertClosed=true;
  		}
  		
  	},(error)=>console.log(error))
  }
	close(){
		this.staticAlertClosed=false;
		this.successAlertClosed=false;
	}
}

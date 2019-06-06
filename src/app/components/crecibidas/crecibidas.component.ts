import { Component, OnInit,ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons,NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../../services/general.service';
import { Router,ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-crecibidas',
  templateUrl: './crecibidas.component.html',
  styleUrls: ['./crecibidas.component.scss']
})
export class CrecibidasComponent implements OnInit {
  @ViewChild("alertpendiente") private  alertpendiente;
	public tipo_imagen:string="";
  pendiente_valora_id="";
  tipo_contrario="";
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
  motivo_pendiente="";
  constructor(
  	private config: NgbPopoverConfig,
    private parametros:ActivatedRoute,
    private route:Router, 
    private http:GeneralService,
    private cookieService:CookieService,
    private modalService: NgbModal
    ) { 
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
  	(this.tipo==="clientes")?this.tipo_imagen="cliente":this.tipo_imagen='proveedor';
    (this.tipo=="clientes")?this.tipo_contrario="Proveedores":this.tipo_contrario="Clientes";
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
  	this.http.getallrecibidas(this.model)
  	.subscribe((data)=>{
      this.model={};
  	this.sniper=false;
  		this.listaclie=data["response"]["result"]["lista"];
  		this.calificaciones=data["response"]["result"]["calificaciones"];
  		
  	})
  
  }




  goimagen(){
		this.route.navigateByUrl('/imagen/'+	this.tipo_imagen+"/A");
	}
	lista(){
  	this.route.navigateByUrl('/listan/'+this.tipo);
	}
	recibidas(){
  	this.route.navigateByUrl('/recibidas/'+this.tipo);
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
  select_status(status){
    if(status==="Pendiente"){
      return "Pendiente de Resolución";
    }else if(status==="PendienteA"){
       return "Pendiente de Anulación";
    }else{
      return "Activa";
    }

  }
  pendiente(idvalora){
    this.openalert(this.alertpendiente);
    this.pendiente_valora_id=idvalora;
    
  }
  solicitar(){
    if(this.motivo_pendiente===""){
     Swal('Error', 'Seleccione el motivo de la solicitud!', 'error');
    }else{
      const datos={valoracion:this.pendiente_valora_id,motivo:this.motivo_pendiente}
      this.http.pendiente_valoracion(datos)
      .subscribe(data=>{
        this.closemodel(this.alertpendiente);
        Swal('Exito', 'Solicitud enviada!', 'success');
        this.getlista();
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { GeneralService} from '../../services/general.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router'
@Component({
  selector: 'app-cdatostelefonos',
  templateUrl: './cdatostelefonos.component.html',
  styleUrls: ['./cdatostelefonos.component.scss']
})
export class CdatostelefonosComponent implements OnInit {
	  sniper:boolean=false;
	  datosgen:any[]=[];
	  datosempresa:any[]=[];
	  rutaserver:string="";
	  token:string="";
	  numempresa:string=""; 
	  listtelefonos:any[]=[];
	  modeltelefono:any={};
  constructor(private modalService: NgbModal,private route:Router,private cookieService:CookieService,private http:GeneralService) 
  {
  	  this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
	  this.numempresa=this.datosgen["datosusuario"]["IDEmpresa"];
	  this.datosempresa=this.datosgen["empresa"];
	  this.token=this.datosgen["Token"];
  }

  ngOnInit() {
	  this.http.gettels(this.token,this.numempresa)
	  .subscribe((data)=>{
	  	this.listtelefonos=data["response"]["result"]["telefonos"];
	  	console.log(this.listtelefonos)
	  })
  }
  openalert(alert){
    this.modalService.open(alert,{ariaLabelledBy: 'modal-basic-title'});
  }
  closemodel(content){
  	this.modeltelefono={};
    this.modalService.dismissAll(content);
  }
  delete(id){
  	this.sniper=true;
  	let datos={IDEmpresa:this.numempresa,IDTel:id};
  	this.http.deletetel(this.token,datos)
  	.subscribe((data)=>{
  			this.listtelefonos=data["response"]["result"]["telefonos"];
  			this.sniper=false;
  			this.closemodel("alerttelefonos");
  		})
  }
  obtdat(id,alert){
  	this.listtelefonos.forEach((tel)=>{
  		if(tel.IDTel===id){
  			this.modeltelefono=tel;
  			this.openalert(alert);
  		}
  	})
  }
  addtel(){
  	this.sniper=true;
  	if(this.modeltelefono.IDTel==null){
  		this.modeltelefono.IDEmpresa=this.numempresa;
  		this.http.addtel(this.token,this.modeltelefono)
  		.subscribe((data)=>{
  			this.listtelefonos=data["response"]["result"]["telefonos"];
  			this.sniper=false;
  			this.closemodel("alerttelefonos");
  		})
  	}else{
  		this.http.updatetel(this.token,this.modeltelefono)
  		.subscribe((data)=>{
  			this.listtelefonos=data["response"]["result"]["telefonos"];
  			this.sniper=false;
  			this.closemodel("alerttelefonos");
  		})
  	}
  }

}

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { FollowService } from '../../services/follow.service';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cfollow',
  templateUrl: './cfollow.component.html',
  styleUrls: ['./cfollow.component.scss'],
  providers: [NgbPopoverConfig]
})
export class CfollowComponent implements OnInit {
	follows:any=[];
	list:any=[];

	datosgen:any=[];
	datosempresa:any=[];
	datosusuarios:any=[];
		token:string="";
		sniper:boolean=false;
		staticAlertClosed:boolean=false;
		successAlertClosed:boolean=false;
		alertterror:string="";
		alertsuccess:string="";
		palabra:string="";
  constructor(private config: NgbPopoverConfig,public http:FollowService,private cookieService:CookieService,private modalService: NgbModal,private route:Router)
  {
  	 this.config.placement = 'right';
    this.config.triggers = 'hover';
  	this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
  	this.datosusuarios=this.datosgen["datosusuario"];
  	this.datosempresa=this.datosgen["empresa"];
  	this.token=this.datosgen["Token"];
  }

  ngOnInit() {
  	this.sniper=true;
  	var datos={IDEmpresa:this.datosempresa["IDEmpresa"],token:this.token}
  	this.http.getfollow(datos)
  	.subscribe((data)=>{
  		this.sniper=false;
  		if(data["response"]["code"]===0){
  			this.follows=data["response"]["result"];
  			this.list=this.follows
  		}
  		
  	})
  }
  olvidar(id){
  	this.sniper=true;
  	var datos={IDEmpresa:this.datosempresa["IDEmpresa"],token:this.token,IDFollow:id}
  	this.http.olvidar(datos)
  	.subscribe((data)=>{
  		this.sniper=false;
  		if(data["response"]["code"]===0){
  			this.follows=data["response"]["result"];
  			this.list=this.follows
  		}
  		
  	})
  }
  visitar(ir){
    this.route.navigateByUrl('/perfilbuscado/'+ir);  
  }
 busqueda(){
		if(this.palabra===""){
  			this.follows=this.list;
	  	}else{
	  		this.follows=this.buscapalarabra();
	  	}
	}
buscapalarabra(){
  	let usuario=this.follows;
  		return usuario.filter(usuario=>usuario.Razon_Social.toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));
  }

}

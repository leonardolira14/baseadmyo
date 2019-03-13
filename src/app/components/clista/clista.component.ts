import { Component, OnInit,ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal,NgbCalendar, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../../services/general.service';
import { Router,ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clista',
  templateUrl: './clista.component.html',
  styleUrls: ['./clista.component.scss']
})
export class ClistaComponent implements OnInit {
	listas:any=[];
   model:any={};

	datosgen:any=[];
	datosempresa:any=[];
	datosusuarios:any=[];
	token:string="";
	sniper:boolean=false;
	tipo:string='';
	serverruta:string=environment.urlserver;
	pageActual:number=1;
  constructor(private parametros:ActivatedRoute,private route:Router, private http:GeneralService,private cookieService:CookieService,private modalService: NgbModal) { 
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
  	var datos={IDEmpresa:this.datosempresa["IDEmpresa"],token:this.token,tipo:this.tipo}
  	this.http.getlista(datos)
  	.subscribe((data)=>{
  		this.sniper=false;
  		this.listas=data["response"]["result"];
  		console.log(data);
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
    this.route.navigateByUrl('/perfilbuscado/'+ir)
  }
  setmylogo(logo){
  	let styles = {
    'background-image': logo==''? "url('assets/img/foto-no-disponible.jpg')":"url('"+this.serverruta+"assets/img/logosEmpresas/"+logo+"')"};
  	return styles;
  }
  setmybanner(logo){
  	let styles = {
    'background-image': logo==''? "url('assets/img/funfacts-bg.jpg')":"url('"+this.serverruta+"assets/img/banners/"+logo+"')"};
  	return styles;
  }
}

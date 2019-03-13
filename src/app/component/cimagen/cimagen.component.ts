import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { GeneralService} from '../../services/general.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cimagen',
  templateUrl: './cimagen.component.html',
  styleUrls: ['./cimagen.component.scss']
})
export class CimagenComponent implements OnInit {
	nombre:string="";
	puesto:string="";
	razon_social:string="";
	nombre_comercial:string="";
	rfc:string="";
	datosgen:any=[];
	numempresa:string="";
	token:string="";
	notificaciones:any=[];
	follow:any=[];
	empresa:any=[];
	sniper:boolean=false;
	imagencliente:any=[];
	imagenproveedor:any=[];
	datosguradar:any={};
  rutaserver:string=environment.urlserver;
  constructor(private route:Router,private cookieService: CookieService,private http:GeneralService) {
  	this.datosgen=JSON.parse(this.cookieService.get('datosUsuario'));
  	this.nombre=this.datosgen["datosusuario"]["Nombre"]+" "+this.datosgen["datosusuario"]["Apellidos"];
  	this.puesto=this.datosgen["datosusuario"]["Puesto"];
  	this.numempresa=this.datosgen["datosusuario"]["IDEmpresa"];
  	this.token=this.datosgen["Token"];
  	

   }

  ngOnInit() {
  	this.sniper=true;  
  	this.http.getperfil(this.numempresa,this.token)
  	.subscribe((data)=>{
        this.sniper=false;
  		if(data["response"]["code"]===0){
        console.log(data);
  			this.datosgen["empresa"]=data["response"]["result"]["empresa"];
  			this.notificaciones=data["response"]["result"]["notificaciones"];
  			this.follow=data["response"]["result"]["follow"];
  			this.empresa=this.datosgen["empresa"];
  			this.cookieService.delete("datosUsuario");
  			this.cookieService.set('datosUsuario',JSON.stringify(this.datosgen));
  			this.imagencliente=data["response"]["result"]["imagencliente"];
  			this.imagenproveedor=data["response"]["result"]["imagenproveedor"];
  		}else{
  			 this.route.navigateByUrl('/');
  		}
  	
  	},(error)=>{
  		console.log(error);
  	})
  }
  goto(ir){
  	 this.route.navigateByUrl('/'+ir);
  }
seletcbanner(banner){
    let style={
      "background-size":"cover",
      "background-position":"center",
      "background-repeat":"no-repeat",
      "background-image":banner==''?"url('assets/img/funfacts-bg.jpg')":"url('"+this.rutaserver+"assets/img/banners/"+banner+"')",
    };
    return style;
  }
}

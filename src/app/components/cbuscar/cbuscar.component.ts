import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { BuscarService } from '../../services/buscar.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import  Swal from 'sweetalert2';
@Component({
  selector: 'app-cbuscar',
  templateUrl: './cbuscar.component.html',
  styleUrls: ['./cbuscar.component.scss']
})
export class CbuscarComponent implements OnInit {
	@ViewChild('invitacion') private invitacion;
	@ViewChild('cambiaplan') private cambiaplan;
	@ViewChild('succesSwal') private succesSwal: SwalComponent;
	perflbuscar: any = [];
	datosgen: any = [];
	datosempresa: any = [];
	palabra = '';
	token = '';
	sniper = true;
	datosusuarios: any = [];
	ubucaciones: any = [];
	resultados: any = [];
	porcalif = '';
	model : any = {};
	rutaserver = environment.urlserver;
	numresultados = 0;
	pageActual = 1;
	errortext = '';
  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NgbModal,private route: Router, private parametros: ActivatedRoute, private http: BuscarService, private cookieService: CookieService) {
		

  	if (this.cookieService.get('datosUsuario')) {
  		this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios = this.datosgen['datosusuario'];
		this.datosempresa = this.datosgen['empresa'];
		this.token = this.datosgen['Token'];
  	} else {
  		this.datosempresa['IDEmpresa'] = '0';
  		this.token = '0';
		}
		
  	this.parametros.params
  	.subscribe((params) => {
  		if (params['any'] !== undefined) {
			  this.buscar(params['any'], '' , '' , '', '');
			  this.palabra = params['any'];
  		}
  	});
   }

  ngOnInit() {

  }
  porcalifcar(inicio?, fin?) {
	this.model['calificacion'] = inicio + '-' + fin;
	this.buscar_filtro();
  }

  buscar_filtro() {
	this.sniper = true;
	this.model['Palabra'] = this.palabra;
	this.model['IDEmpresaEmisora'] = this.datosempresa['IDEmpresa'];
	this.http.nueva_busqueda(this.model)
	.subscribe((data) => {
		this.resultados = data['resultados'];
		this.ubucaciones =  data['estados'];
		this.numresultados = data['numeroresultados'];
	    this.sniper = false;
	});
  }
  buscar(Palabra?, id?, Orden? ,  Calificaciones?, Estado?) {
	this.sniper = true;
  	const datos = {Palabra, Orden, IDEmpresa: id, Calificaciones, Estado, IDEmpresaEmisora: this.datosempresa['IDEmpresa']};
  	this.http.nueva_busqueda(datos)
  	.subscribe((data) => {
		  this.sniper = true;
		  this.resultados = data['resultados'];
		  this.ubucaciones =  data['estados'];
		  this.numresultados = data['numeroresultados'];
		  this.sniper = false;
  	});


  }
  limpiarfiltro() {
		this.model = {};
		
	  this.buscar_filtro();
  }
  eligebanner(banner) {
	const style = {'background-image': banner !== '' ? 'url(' + this.rutaserver + 'assets/img/banners/' + banner + ')' : 'url(assets/img/funfacts-bg.jpg)' };
	return style;
}
  eligelogo(logo) {
	const style = {'background-image': logo !== '' ? 'url(' + this.rutaserver + 'assets/img/logosEmpresas/' + logo + ')' : 'url(assets/img/foto-no-disponible.jpg)'};
	return style;
	}
	
	openalert(alert) {
		this.modalService.open(alert,{ariaLabelledBy: 'modal-basic-title'});
	}
	
	closemodel(content) {
		this.modalService.dismissAll(content);
	}

  visitar(ir) {
		if (this.datosempresa['IDEmpresa'] === "0"){
			this.openalert(this.invitacion);
		}else{
			this.route.navigateByUrl('/perfilbuscado/' + ir);
		}
  }
  calificar(idempresa) {
		if (this.datosempresa['IDEmpresa'] === "0"){
			this.openalert(this.invitacion);
		}else{
			
		}
  }
  seguir(idempresa) {
		if (this.datosempresa['IDEmpresa'] === "0"){
			this.openalert(this.invitacion);
		}else{
			const  dato={IDEmpresa:this.datosempresa['IDEmpresa'],IDEmpresaB:idempresa};
			this.http.follow(dato)
			.subscribe((data)=>{
				console.log(data)
				 if(data['response']['code']==0){
					this.succesSwal.show();
				}else if(data['response']['code']==1){
					this.openalert(this.cambiaplan);
				}else{
					Swal("Error","No puede serguir a su misma empresa", 'warning');		
				
				}
				
			})
			
		}
	}
	registro(){
		this.route.navigateByUrl('/preciosadmyo');
	}
}

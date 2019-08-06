import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-cdatosusuario',
  templateUrl: './cdatosusuario.component.html',
  styleUrls: ['./cdatosusuario.component.scss']
})
export class CdatosusuarioComponent implements OnInit {
  datosusuarios: any = {};
  datosgen: any[] = [];
  datosclave: any = {};
  token= "";
  sniper= false;
  staticAlertClosed= false;
  successAlertClosed= false;
  alertterror= "";
  alertsuccess= "";

  constructor(private http: UsuariosService, private cookieService: CookieService, private modalService: NgbModal) {
  	this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
  	this.datosusuarios = this.datosgen['datosusuario'];
  	this.token = this.datosgen['Token'];
   }

  ngOnInit() {

  }
  enviarform() {
  	this.sniper = true;
  	this.http.update(this.token, this.datosusuarios)
  	.subscribe((data) => {
  		this.sniper = false;
  		if (data['response']['code'] === 0) {
  			this.alertsuccess ='Datos Actualizados';
  			this.successAlertClosed = true;
  			this.datosgen['datosusuario'] = this.datosusuarios;
        	this.cookieService.set('datosUsuario', JSON.stringify(this.datosgen));
  		} else {
  			this.alertterror = data['response']['result'];
  			this.staticAlertClosed = true;
  		}
  	});
  }
  saveclave() {
  	this.sniper = true;
  	this.datosclave.token = this.token;
  	this.datosclave.IDEmpresa = this.datosusuarios['IDEmpresa'];
  	this.datosclave.IDUsuario = this.datosusuarios['IDUsuario'];
  	console.log(this.datosclave);
  	this.http.updatecalve(this.datosclave)
  	.subscribe((data) => {
  		this.sniper = false;
  		if (data['response']['code'] === 0) {
  			this.alertsuccess ='Datos Actualizados, cierre sesión para actualizar.';
  			this.successAlertClosed = true;
  			setTimeout(() => {
				this.successAlertClosed = false;
				console;
  			}, 4000);
  			this.datosclave = {};
  		} else {

  			this.alertterror = data['response']['result'];
  			this.staticAlertClosed = true;
  			setTimeout(() => {
				this.staticAlertClosed = false;
  			}, 4000);
  		}
  	});
  }
  close() {
		this.staticAlertClosed = false;
		this.successAlertClosed = false;
	}

}

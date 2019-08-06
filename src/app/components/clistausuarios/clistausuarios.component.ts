import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../services/usuarios.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-clistausuarios',
  templateUrl: './clistausuarios.component.html',
  styleUrls: ['./clistausuarios.component.scss']
})
export class ClistausuariosComponent implements OnInit {

datosempresa = '';
datosusuarios: any[] = [];
datosgen: any[] = [];
token = '';
usuarios: any[] = [];
listusuario: any[] = [];
modelusuario: any = {};
sniper = false;
staticAlertClosed = false;
  successAlertClosed = false;
  alertterror = '';
  alertsuccess = '';
 pageActual = 1;
 palabra = '';
  constructor(private http: UsuariosService, private cookieService: CookieService, private modalService: NgbModal) {
  	this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
  	this.datosusuarios = this.datosgen['datosusuario'];
  	this.datosempresa = this.datosgen['empresa'];
  	this.token = this.datosgen['Token'];
   }

  ngOnInit() {
	this.sniper = true;
  	this.http.getalluser(this.token, this.datosempresa['IDEmpresa'])
  	.subscribe((data) => {
  		this.sniper = false;
  		if (data['response']['code'] === 0) {
  			this.usuarios = data['response']['result'];
  			this.listusuario = this.usuarios;
  		} else {
  			this.staticAlertClosed = false;
  			this.alertterror = data['response']['result'];
  		}
  	});
  }
  delete(usuario, status) {
	  	this.sniper = true;
	  	status === '1' ? status = 0 : status = 1;
	  	const datos = {IDEmpresa: this.datosgen['empresa']['IDEmpresa'], Status: status, IDUsuario: usuario};
	  	this.http.updatestatus(this.token, datos)
	  	.subscribe((data) => {
	  		this.sniper = false;
	  		if (data['response']['code'] === 0) {
	  			this.usuarios = data['response']['result'];
	  			this.successAlertClosed = true;
	  			this.alertsuccess = 'Datos Actualizados';
	  			setTimeout(() => {
	  					this.successAlertClosed = false;
	  			}, 3000);
	  		} else {
	  			this.staticAlertClosed = true;
	  			this.alertterror = data['response']['result'];
	  			setTimeout(() => {
	  					this.staticAlertClosed = false;
	  			}, 3000);
	  		}
	  	});
  }
  modif(idusuario, alert) {
  	if (this.datosusuarios['Tipo_Usuario'] !== 'Master') {
  		this.staticAlertClosed = true;
  		this.alertterror = 'No esta autorizado para realizar esta acción';
  		setTimeout(() => {
  			this.staticAlertClosed = false;
  		}, 3000);
  		return false;
  	}
	  	this.usuarios.forEach((usuario) => {
	  		if (usuario.IDUsuario === idusuario) {
	  			this.modelusuario = usuario;

	  		}
	  	});

		this.openalert(alert);
  }
  deci(alert) {
  	if (this.datosusuarios['Tipo_Usuario'] !== 'Master') {
  		this.staticAlertClosed = true;
  		this.alertterror = 'No esta autorizado para realizar esta acción';
  		setTimeout(() => {
  			this.staticAlertClosed = false;
  		}, 3000);
  		return false;
  	}
  	if (this.modelusuario['IDUsuario']) {
  		this.update(alert);
  	} else {
  		this.save(alert);

  	}
  }
  update(alert) {

  	this.sniper = true;
  	 this.http.update(this.token, this.modelusuario)
  	 .subscribe((data) => {
  	 	this.sniper = false;
  	 	if (data['response']['code'] === 0) {
  			this.usuarios = data['response']['result'];
  			this.listusuario = this.usuarios;
  			this.closemodel(alert);
  			this.successAlertClosed = true;
  			this.alertsuccess = 'Datos Actualizados';
  			setTimeout(() => {
  					this.successAlertClosed = false;
  			}, 3000);
  		} else {
  			this.staticAlertClosed = false;
  			this.alertterror = data['response']['result'];
  			setTimeout(() => {
  					this.staticAlertClosed = false;
  			}, 3000);
  		}
  	 });
  }
  master(usuario) {
  	if (this.datosusuarios['Tipo_Usuario'] !== 'Master') {
  		this.staticAlertClosed = true;
  		this.alertterror = 'No esta autorizado para realizar esta acción';
  		setTimeout(() => {
  			this.staticAlertClosed = false;
  		}, 3000);
  		return false;
  	}
  	this.sniper = true;
  	const datos = {token: this.token, IDEmpresa: this.datosempresa['IDEmpresa'], usuario};
  	this.http.master(datos)
  	.subscribe((data) => {
  		this.sniper = false;
  	 	if (data['response']['code'] === 0) {
  			this.usuarios = data['response']['result'];
  			this.listusuario = this.usuarios;
  			this.closemodel(alert);
  			this.successAlertClosed = true;
  			this.alertsuccess = 'Datos Actualizados';
  			setTimeout(() => {
  					this.successAlertClosed = false;
  			}, 3000);
  		} else {
  			this.staticAlertClosed = true;
  			this.alertterror = data['response']['result'];
  			setTimeout(() => {
  					this.staticAlertClosed = false;
  			}, 3000);
  		}
  	});
  	console.log(usuario);
  }
  openalert(alert) {
  		this.modalService.open(alert, {ariaLabelledBy: 'modal-basic-title'});
  }
  close() {
		this.staticAlertClosed = false;
		this.successAlertClosed = false;
	}
	closemodel(content) {
		this.modelusuario = {};
    this.modalService.dismissAll(content);
  }
  save(alert) {
  	this.sniper = false;
  	this.modelusuario['IDEmpresa'] = this.datosempresa['IDEmpresa'];
  	this.modelusuario['token'] = this.token;
  	this.http.save(this.modelusuario)
  	.subscribe((data) => {
  		this.sniper = false;
  	 	if (data['response']['code'] === 0) {
  			this.usuarios = data['response']['result'];
  			this.listusuario = this.usuarios;
  			this.closemodel(alert);
  			this.successAlertClosed = true;
  			this.alertsuccess = 'Datos Actualizados';
  			setTimeout(() => {
  					this.successAlertClosed = false;
  			}, 3000);
  		} else if (data['response']['code'] === 1991) {
			this.closemodel('alertmarcas');
			   swal('Error', 'Usted cuenta con un plan basico, para seguir registrando usuarios te recomendamos aumentar de plan.', 'info');
		  } else {
  			this.modelusuario['IDEmpresa'] = '';
  			this.staticAlertClosed = true;
  			this.alertterror = data['response']['result'];
  			setTimeout(() => {
  					this.staticAlertClosed = false;
  			}, 3000);
  		}
  	});
  }
  busqueda() {
  	if (this.palabra === '') {
  		this.usuarios = this.listusuario;
  	} else {
  		this.usuarios = this.buscapalarabra();
  	}

  }
  buscapalarabra() {
  	const usuario = this.usuarios;
  		return usuario.filter(usuario => usuario.Nombre.toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));
  }
}

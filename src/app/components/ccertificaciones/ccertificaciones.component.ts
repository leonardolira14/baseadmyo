import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CertificacionesService } from '../../services/certificaciones.service';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
	selector: 'app-ccertificaciones',
	templateUrl: './ccertificaciones.component.html',
	styleUrls: ['./ccertificaciones.component.scss']
})
export class CcertificacionesComponent implements OnInit {
	modal_open = false;
	certificaciones: any = [];
	modelcertificacion: any = {};
	listnormas: any = [];

	filemarcalogo: File = null;
	public imagePath;
	public message;
	palabra = '';
	datosgen: any = [];
	datosempresa: any = [];
	token = '';
	sniper = false;
	staticAlertClosed = false;
	successAlertClosed = false;
	alertterror = '';
	alertsuccess = '';
	pageActual = 1;
	datosusuarios: any = [];
	serverruta: string = environment.urlserver;
	constructor(private route: Router, private http: CertificacionesService, private cookieService: CookieService, private modalService: NgbModal) {
		this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios = this.datosgen['datosusuario'];
		this.datosempresa = this.datosgen['empresa'];
		this.token = this.datosgen['Token'];
	}

	ngOnInit() {
		this.sniper = true;
		const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token};
		this.http.getall(datos)
		.subscribe((data) => {
			this.sniper = false;
			console.log(data);
			if (data['response']['code'] == 0) {
				this.certificaciones = data['response']['result'];
				this.listnormas = this.certificaciones;
			} else {
				this.route.navigateByUrl('/');
			}
		});
	}
	busqueda() {
		if (this.palabra === '') {
  			this.certificaciones = this.listnormas;
	  	} else {
	  		this.certificaciones = this.buscapalarabra();
	  	}
	}
	buscapalarabra() {
  	const usuario = this.listnormas;
  		return usuario.filter(usuario => usuario.Norma.toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));
  }
	editar(id, ) {
		this.certificaciones.forEach((norma) => {
			if (norma.IDNorma === id) {
				this.modelcertificacion = norma;
				return false;
			}
		});
		this.modal_open = true;
	}
	openalert(alert) {

		this.modalService.open(alert, {ariaLabelledBy: 'modal-basic-title'});
	}
	close() {
		this.staticAlertClosed = false;
		this.successAlertClosed = false;
	}
	closemodel() {
		this.modelcertificacion = {};
		this.modal_open = false;
	}
	preview(files) {
		if (files.length === 0) {
			return false;
		}

		const mimeType = files[0].type;

		this.filemarcalogo = <File>files[0];
		this.modelcertificacion['Archivo'] = files[0].name;

	}
	delete(id, alert) {
		if (this.datosusuarios['Tipo_Usuario'] !== 'Master') {
	  		this.staticAlertClosed = true;
	  		this.alertterror = 'No esta autorizado para realizar esta acción';
	  		setTimeout(() => {
	  			this.staticAlertClosed = false;
	  		}, 3000);
	  		return false;
  		}
  		this.sniper = true;
		const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token, IDNorma: id};
		this.http.delete(datos)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] === 0) {
				this.certificaciones = data['response']['result'];
				this.listnormas = this.certificaciones;
				this.closemodel();
				this.successAlertClosed = true;
				this.alertsuccess = 'Datos Actualizados';
				setTimeout(() => {
					this.successAlertClosed = false;
				}, 3000);
			} else {
				this.alertterror = data['response']['result'];
				setTimeout(() => {
					this.staticAlertClosed = false;
				}, 3000);
			}
		});
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

		if (this.modelcertificacion.IDNorma) {
			this.update(alert);
		} else {
			this.save(alert);
		}
	}
	update(alert) {
		if (this.modelcertificacion.Norma === undefined || this.modelcertificacion.Norma === '') {
			swal('Error', 'El campo nombre de la certificación es necesario');
			return ;
		}
		if (this.modelcertificacion.Fecha === undefined || this.modelcertificacion.Fecha === '') {
			swal('Error', 'El campo Fecha de Certificación es necesario');
			return ;
		}

		this.sniper = true;
		const formdata = new FormData();
		formdata.append('IDNorma', this.modelcertificacion['IDNorma']);
		formdata.append('Norma', this.modelcertificacion['Norma']);
		formdata.append('FechaVencimiento', this.modelcertificacion['FechaVencimiento']);
		formdata.append('Fecha', this.modelcertificacion['Fecha']);
		formdata.append('Calificacion', this.modelcertificacion['Calif']);
		if (this.filemarcalogo) {
			formdata.append('Archivo', this.filemarcalogo, this.filemarcalogo.name);
		} else {
			formdata.append('Archivo', this.modelcertificacion['Archivo']);
		}

		formdata.append('token', this.token);
		formdata.append('IDEmpresa', this.datosempresa['IDEmpresa']);
		this.http.update(formdata)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] === 0) {
				this.certificaciones = data['response']['result'];
				this.listnormas = this.certificaciones;
				this.closemodel();
				swal('Exito', 'Datos Actualizados', 'success');

			} else {
				this.alertterror = data['response']['result'];
				setTimeout(() => {
					this.staticAlertClosed = false;
				}, 3000);
			}
		});
	}
	save(alert) {
		if (this.modelcertificacion.Norma === undefined || this.modelcertificacion.Norma === '') {
			swal('Error', 'El campo nombre de la certificación es necesario');
			return ;
		}
		if (this.modelcertificacion.Fecha === undefined || this.modelcertificacion.Fecha === '') {
			swal('Error', 'El campo Fecha de Certificación es necesario');
			return ;
		}
		if (this.filemarcalogo === undefined || this.filemarcalogo === null) {
			swal('Error', 'El campo archivo es necesario');
			return ;
		}
		this.sniper = true;
		const formdata = new FormData();
		formdata.append('Norma', this.modelcertificacion['Norma']);
		formdata.append('Fecha', this.modelcertificacion['Fecha']);
		formdata.append('FechaVencimiento', this.modelcertificacion['FechaVencimiento']);
		formdata.append('Calificacion', this.modelcertificacion['Calif']);
		if (this.filemarcalogo) {
			formdata.append('Archivo', this.filemarcalogo, this.filemarcalogo.name);
		}
		formdata.append('token', this.token);
		formdata.append('IDEmpresa', this.datosempresa['IDEmpresa']);

		this.http.save(formdata)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] === 0) {

				this.certificaciones = data['response']['result'];
				this.listnormas = this.certificaciones;
				this.closemodel();
				swal('Exito', 'Datos Actualizados', 'success');

			} else {
				this.alertterror = data['response']['result'];
				setTimeout(() => {
					this.staticAlertClosed = false;
				}, 3000);
			}
		});
	}
}


import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, NgbCalendar, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../../services/general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
@Component({
	selector: 'app-clista2',
	templateUrl: './clista2.component.html',
	styleUrls: ['./clista2.component.scss']
})
export class Clista2Component implements OnInit {
	public imagePath;
	file_avatar: File = null;
	logo_avatar: any = 'assets/img/avatar1.png';
	model_registro: any = {};
	modal_open = false;
	@ViewChild('invitacion') private invitacion;
	estados_lista = [];
	model_filter: any = {};
	public tipo_imagen = '';
	tipo = 'clientes';
	t_menu = 'a';
	listas: any = [];
	model: any = {};
	datosgen: any = [];
	datosempresa: any = [];
	datosusuarios: any = [];
	token = '';
	sniper = false;
	serverruta: string = environment.urlserver;
	pageActual = 1;
	constructor(
		private parametros: ActivatedRoute,
		private route: Router,
		private http: GeneralService,
		private cookieService: CookieService,
		private modalService: NgbModal
	) {
		this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios = this.datosgen['datosusuario'];
		this.datosempresa = this.datosgen['empresa'];
		this.token = this.datosgen['Token'];
		this.parametros.params
			.subscribe((params) => {
				this.sniper = true;
				if (params['tipo'] !== undefined) {
					this.tipo = params['tipo'];
					this.t_menu = params['menu'];
				}
				this.getlista();

			});
	}

	ngOnInit() {
		(this.tipo === 'clientes') ? this.tipo_imagen = 'cliente' : this.tipo_imagen = 'proveedor';
	}
	ir() {
		this.route.navigateByUrl('/detalleimagen/' + this.tipo_imagen + '/A');
	}

	getlista() {
		this.sniper = true;
		const datos = { IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token, tipo: this.tipo };
		this.http.getlista(datos)
			.subscribe((data) => {
				this.sniper = false;
				this.listas = data['response']['result'];
				this.estados_lista = data['response']['estados'];
				console.log(data);
			});
	}
	setmylogo(logo) {
		const styles = {
			'background-image': logo === '' ? 'url(\'assets/img/foto-no-disponible.jpg\')' : 'url(\'' + this.serverruta + 'assets/img/logosEmpresas/' + logo + '\')'
		};
		return styles;
	}
	setmybanner(logo) {
		const styles = {
			'background-image': logo === '' ? 'url(\'assets/img/bg_tercer.jpg\')' : 'url(\'' + this.serverruta + 'assets/img/banners/' + logo + '\')'
		};
		return styles;
	}
	goimagen() {
		this.route.navigateByUrl('/imagen/' + this.tipo_imagen + '/A');
	}
	lista() {
		this.route.navigateByUrl('/lista2/' + this.tipo);
	}
	recibidas() {
		this.route.navigateByUrl('/recibidas/' + this.tipo);
	}
	filterclientes() {
		this.sniper = true;
		const datos = { filtros: this.model_filter, IDEmpresa: this.datosempresa['IDEmpresa'], tipo: this.tipo };
		this.http.filterclientes(datos)
			.subscribe((data) => {
				this.sniper = false;
				this.listas = data['response']['result'];
				console.log(data);
			});
	}
	openalert(alert) {
		this.modalService.open(alert, { ariaLabelledBy: 'modal-basic-title' });
	}
	visitar(ir) {
		if (this.datosempresa['IDEmpresa'] === '0') {
			this.openalert(this.invitacion);
		} else {
			this.route.navigateByUrl('/perfilbuscado/' + ir);
		}
	}
	calificar(idempresa) {
		if (this.datosempresa['IDEmpresa'] === '0') {
			this.openalert(this.invitacion);
		} else {

		}
	}
	registro() {
		if (this.model_registro['razon'] === undefined || this.model_registro['razon'] === '') {
			swal('Error', 'El Campo Razón Social es nesario', 'error');
			return;
		}
		if (this.model_registro['rfc'] === undefined || this.model_registro['rfc'] === '') {
			swal('Error', 'El Campo RFC es nesario', 'error');
			return;
		}
		if (this.model_registro['tipopersona'] === undefined || this.model_registro['tipopersona'] === '') {
			swal('Error', 'El Campo Tipo Persona es nesario', 'error');
			return;
		}
		if (this.model_registro['nombre'] === undefined || this.model_registro['nombre'] === '') {
			swal('Error', 'El Campo Nombre en datos de contacto es nesario', 'error');
			return;
		}
		if (this.model_registro['correo'] === undefined || this.model_registro['correo'] === '') {
			swal('Error', 'El Campo correo electrónico es nesario', 'error');
			return;
		}
		const formData = new FormData;
		formData.append('datos', JSON.stringify(this.model_registro));
		formData.append('IDEmpresa', this.datosempresa['IDEmpresa']);
		formData.append('tiporegistro', this.tipo_imagen);
		if (this.file_avatar !== null) {
			formData.append('Imagen', this.file_avatar, this.file_avatar.name);
		}
		this.http.addclieprove(formData)
			.subscribe(data => {
				if (data['response']['code'] === 0) {
					this.cerrar_modal();
					this.ngOnInit();
				} else {
					swal('Error', data['response']['result'], 'error');
				}
			});
	}
	cerrar_modal() {
		this.modal_open = false;
		this.model_registro = {};
		this.logo_avatar = 'assets/img/avatar1.png';
	}
	change_img_avatar(files) {
		if (files.length === 0) {
			return;
		}

		const mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			swal('Error!', 'Archivo no soportado', 'error');
			return;
		}
		this.file_avatar = <File>files[0];
		this.model_registro['Imagen'] = this.file_avatar.name;
		const reader = new FileReader();
		this.imagePath = files;
		reader.readAsDataURL(files[0]);
		reader.onload = (_event) => {
			this.logo_avatar = reader.result;
		};
	}
	desactivar(relacion) {
		const datos = { relacion };
		this.http.bajarelacion(datos)
			.subscribe(data => {
				this.ngOnInit();
			})
	}
	resumengo() {
		this.route.navigateByUrl('/resumen/' + this.tipo);
	}
	realizadas() {
		this.route.navigateByUrl('/realizadas/' + this.tipo);
	}
}

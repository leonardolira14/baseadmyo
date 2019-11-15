import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../services/usuarios.service';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
@Component({
	selector: 'app-clistausuarios',
	templateUrl: './clistausuarios.component.html',
	styleUrls: ['./clistausuarios.component.scss']
})
export class ClistausuariosComponent implements OnInit {
	@ViewChild('logo') logo_file: ElementRef;
	alertusuarios = false;
	ruta_serve = environment.urlserver;
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
	filemarcalogo: File = null;
	public imagePath;
	imglogo: any = '/assets/img/avatar1.png';
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
		const datos = { IDEmpresa: this.datosgen['empresa']['IDEmpresa'], Status: status, IDUsuario: usuario };
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
				(usuario.Imagen === '' || usuario.Imagen === null) ? this.imglogo = '/assets/img/avatar1.png' : this.imglogo =  this.ruta_serve + '/assets/img/logosUsuarios/' + usuario.Imagen;
			}
		});

		this.openalert();
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
			this.save();

		}
	}
	update(alert) {

		// this.sniper = true;
		this.modelusuario['IDEmpresa'] = this.datosempresa['IDEmpresa'];
		this.modelusuario['token'] = this.token;
		const formulario = this.formdata();
		this.http.update(formulario)
			.subscribe((data) => {
				this.sniper = false;
				if (data['response']['code'] === 0) {
					this.usuarios = data['response']['result'];
					this.listusuario = this.usuarios;
					this.closemodel();
					swal('Exito', 'Datos Actualizados', 'success');
				} else {
					this.alertterror = data['response']['result'];
					swal('Error', this.alertterror, 'error');
				}
			});
	}
	master(usuario) {
		if (this.datosusuarios['Tipo_Usuario'] !== 'Master') {
			swal('Error', 'No esta autorizado para realizar esta acción', 'error');
			return false;
		}
		this.sniper = true;
		const datos = { token: this.token, IDEmpresa: this.datosempresa['IDEmpresa'], usuario };
		this.http.master(datos)
			.subscribe((data) => {
				this.sniper = false;
				if (data['response']['code'] === 0) {
					this.usuarios = data['response']['result'];
					this.listusuario = this.usuarios;
					this.closemodel();
					swal('Exito', 'Datos Actualizados', 'success');
				} else {
					this.staticAlertClosed = true;
					this.alertterror = data['response']['result'];
					swal('Error', this.alertterror, 'error');
				}
			});
	}
	openalert() {
		this.alertusuarios = true;
	}
	close() {
		this.staticAlertClosed = false;
		this.successAlertClosed = false;
	}
	closemodel() {
		this.logo_file.nativeElement.value = '';
		this.imglogo = '/assets/img/avatar1.png';
		this.modelusuario = {};
		this.alertusuarios = false;
	}
	save() {
		this.sniper = true;
		this.modelusuario['IDEmpresa'] = this.datosempresa['IDEmpresa'];
		this.modelusuario['token'] = this.token;
		const formulario = this.formdata();
		this.http.save(formulario)
			.subscribe((data) => {
				this.sniper = false;
				if (data['response']['code'] === 0) {
					this.usuarios = data['response']['result'];
					this.listusuario = this.usuarios;
					this.closemodel();
					swal('Exito', 'Datos Actualizados', 'success');
				} else if (data['response']['code'] === 1991) {
					this.closemodel();
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
	// funcion para formardata
	private formdata() {

		const formdata = new FormData();
		formdata.append('IDEmpresa', this.modelusuario['IDEmpresa']);
		formdata.append('token', this.modelusuario['token']);
		formdata.append('Nombre', this.modelusuario['Nombre']);
		formdata.append('Apellidos', this.modelusuario['Apellidos']);
		formdata.append('Correo', this.modelusuario['Correo']);
		formdata.append('Puesto', this.modelusuario['Puesto']);
		formdata.append('Visible', this.modelusuario['Visible']);
		if (this.modelusuario['IDUsuario']!==undefined) {
			formdata.append('IDUsuario', this.modelusuario['IDUsuario']);
		}
		if (this.filemarcalogo) {
			formdata.append('logo', this.filemarcalogo, this.filemarcalogo.name);
		} else if (this.modelusuario['Imagen'] !== '' || this.modelusuario['Imagen'] !== undefined) {
			formdata.append('logo', this.modelusuario['Imagen']);
		}
		return formdata;

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
		return usuario.filter(usuarioc => usuarioc.Nombre.toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));
	}
	preview(files) {
		if (files.length === 0) {
			return;
		}

		const mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			swal('Error', 'Tipo de archivo no sportado', 'warning');
			return;
		}
		this.filemarcalogo = <File>files[0];
		const reader = new FileReader();
		this.imagePath = files;
		reader.readAsDataURL(files[0]);
		reader.onload = (_event) => {
			this.imglogo = reader.result;
		};
	}
}

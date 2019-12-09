import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FollowService } from '../../services/follow.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
@Component({
	selector: 'app-cfollow',
	templateUrl: './cfollow.component.html',
	styleUrls: ['./cfollow.component.scss'],
	providers: [NgbPopoverConfig]
})
export class CfollowComponent implements OnInit {

	model: any = {};
	follows: any = [];
	list: any = [];
	serverruta = environment.urlserver;
	estados: any[] = [];
	datosgen: any = [];
	datosempresa: any = [];
	datosusuarios: any = [];
	token = '';
	sniper = false;
	staticAlertClosed = false;
	successAlertClosed = false;
	alertterror = '';
	alertsuccess = '';
	palabra = '';
	constructor(private config: NgbPopoverConfig, public http: FollowService, private cookieService: CookieService, private modalService: NgbModal, private route: Router) {
		this.config.placement = 'right';
		this.config.triggers = 'hover';
		this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios = this.datosgen['datosusuario'];
		this.datosempresa = this.datosgen['empresa'];
		this.token = this.datosgen['Token'];
	}

	ngOnInit() {
		this.sniper = true;
		const datos = { IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token };
		this.http.getfollow(datos)
			.subscribe((data) => {
				console.log(data);
				this.sniper = false;
				if (data['response']['code'] === 0) {
					this.estados = data['response']['estados']
					this.follows = data['response']['result'];
					this.list = this.follows;
				}

			});
	}
	olvidar(id) {
		this.sniper = true;
		const datos = { IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token, IDFollow: id };
		this.http.olvidar(datos)
			.subscribe((data) => {
				this.sniper = false;
				if (data['response']['code'] === 0) {
					this.follows = data['response']['result'];
					this.list = this.follows;
					swal('Exito', 'Datos Actualizados...', 'success');
				}


			});
	}
	visitar(ir) {
		this.route.navigateByUrl('/perfilbuscado/' + ir);
	}
	add() {
		this.route.navigateByUrl('/buscar/');
	}
	busqueda() {
		if (this.palabra === '') {
			this.follows = this.list;
		} else {
			this.follows = this.buscapalarabra();
		}
	}
	buscapalarabra() {
		const usuario = this.follows;
		return usuario.filter(usuario => usuario.Razon_Social.toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));
	}
	porcalifcar(inicio?, fin?) {
		this.model['calificacion'] = inicio + '-' + fin;
		this.buscar_filtro();

	}
	buscar_filtro() {
		//this.sniper = true;
		this.model['IDEmpresaEmisora'] = this.datosempresa['IDEmpresa'];
		this.http.filtro(this.model)
			.subscribe(data => {
				console.log(data);
				if (data['response']['code'] === 0) {
					this.follows = data['response']['result'];
					this.list = this.follows;
				}
			})
	}
	limpiarfiltro() {
		this.model = {};
		this.buscar_filtro();
	}

}

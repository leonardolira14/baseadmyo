import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService} from '../../services/general.service';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
	selector: 'app-menub',
	templateUrl: './menub.component.html',
	styleUrls: ['./menub.component.scss']
})
export class MenubComponent implements OnInit {
	sniper = false;
	token = '';
	datosgen: any = [];
	numempresa = '';
	datosusuarios: any = [];
	datosempresa: any = [];
	num_notificaciones = 0;
	constructor(
		private route: Router,
		private cookieService: CookieService,
		private http: GeneralService,
		private httpnotif: NotificacionesService,

		) {
	if (this.cookieService.get('datosUsuario')) {
  		this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios = this.datosgen['datosusuario'];
		this.datosempresa = this.datosgen['empresa'];
		this.token = this.datosgen['Token'];
		this.numempresa = this.datosgen['IDEmpresa'];
  	}


    }

	ngOnInit() {
		const datos = {empresa: this.datosempresa['IDEmpresa']};
		this.httpnotif.getnumnoficaciones(datos)
		.subscribe(respuesta => {
			this.num_notificaciones = respuesta['numnotificaciones'];
			console.log(respuesta);
		});
	}
	cerrar() {
		this.sniper = true;
		this.cookieService.deleteAll('datosUsuario');
		localStorage.clear();
		this.http.cerrarsession(this.token, this.numempresa)
		.subscribe((data) => {
			this.sniper = true;
			this.route.navigateByUrl('/');
		});

	}
	goto(ir) {

		this.route.navigateByUrl('/' + ir);
	}
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { BuscarService } from '../../services/buscar.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
@Component({
  selector: 'app-datosgen',
  templateUrl: './datosgen.component.html',
  styleUrls: ['./datosgen.component.scss']
})
export class DatosgenComponent implements OnInit {
	public barChartLabels: string[] = [''];
 	public barChartType: ChartType = 'horizontalBar';
	public barChartLegend = true;
	public barChartOptions: ChartOptions = {
	    responsive: true,

	};
	d_imagen_cliente = [];
 	datosperfilbuscado: any = [];
 	perflbuscar: any = [];
	datosgen: any = [];
	datosempresa: any = [];
	token = '';
	sniper = false;
	pageActual = 1;
	datosusuarios: any = [];
	numempresa = false;
	rutaserver: string;
	banner = 'url(\'assets/img/funfacts-bg.jpg\')';
	logo = 'url(\'assets/img/foto-no-disponible.jpg\')';
constructor(private cookieService: CookieService, private route: Router, private parametros: ActivatedRoute, private http: BuscarService) {
		this.rutaserver = environment.urlserver;
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
  			this.deci(params['any']);
  		}
  	});

}
  ngOnInit() {
  }
  deci(id) {
  	this.sniper = true;
  	if (localStorage.perfilbuscado) {
  		this.datosperfilbuscado = this.leer_perfil();
  		if (this.datosperfilbuscado['datosempresa']['Logo'] !== '') {
  			this.logo = 'url("' + this.rutaserver + 'assets/img/logosEmpresas/' + this.datosperfilbuscado['datosempresa']['Logo'] + '")';
  		}
  		if (this.datosperfilbuscado['datosempresa']['Banner'] !== '') {
  			this.banner = 'url("' + this.rutaserver + 'assets/img/banners/' + this.datosperfilbuscado['datosempresa']['Banner'] + '")';
  		}
  		this.sniper = false;
  		console.log(this.datosperfilbuscado);
  		if (this.datosperfilbuscado['datosempresa']['IDEmpresa'] !== id) {
  			this.buscar(id);
  		}
  	} else {
  		this.buscar(id);
  	}
  }
  buscar(id) {

  	this.sniper = true;
  	const datos = {IDEmpresa: id, IDEmpresaEmisora: this.datosempresa['IDEmpresa']};
  	this.http.perfil(datos)
  	.subscribe((data) => {
  		this.sniper = false;
  		console.log(data);
  		this.datosperfilbuscado = data['response']['result'];
  		if (this.datosperfilbuscado['datosempresa']['Logo'] !== '') {
  			this.logo = 'url("' + this.rutaserver + 'assets/img/logosEmpresas/' + this.datosperfilbuscado['datosempresa']['Logo'] + '")';
  		} else {

			this.logo = 'url(\'assets/img/foto-no-disponible.jpg\')';
  		}
  		if (this.datosperfilbuscado['datosempresa']['Banner'] !== '') {
  			this.banner = 'url("' + this.rutaserver + 'assets/img/banners/' + this.datosperfilbuscado['datosempresa']['Banner'] + '")';
  		} else {this.banner = 'url(\'assets/img/funfacts-bg.jpg\')'; }

  		this.guardar_perfil(this.datosperfilbuscado);


  	});


  }
  guardar_perfil(perfil) {
  	localStorage.setItem('perfilbuscado', JSON.stringify(perfil));
  }
  leer_perfil() {
  	return JSON.parse(localStorage.perfilbuscado);
  }

}

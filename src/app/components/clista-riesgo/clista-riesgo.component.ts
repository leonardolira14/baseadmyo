import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-clista-riesgo',
  templateUrl: './clista-riesgo.component.html',
  styleUrls: ['./clista-riesgo.component.scss']
})
export class ClistaRiesgoComponent implements OnInit {
  pageActual = 1;
  listas: any = [];
  sniper = false;
  tipo = '';
  tipo_s = '';
  forma = '';
  fecha = '';
  serverruta: string = environment.urlserver;
  datosgen: any = [];
  datosempresa: any = [];
  datosusuarios: any = [];
  token = '';

  constructor(
    private parametros: ActivatedRoute,
		private route: Router,
		private http: GeneralService,
		private cookieService: CookieService,
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
          this.forma = params['forma'];
          this.fecha = params['fecha'];
        }
        this.getlista();
	  	});
   }

  ngOnInit() {
  }
  getlista() {
    switch (this.tipo) {
      case 'cliente':
        this.tipo_s = 'clientes';
        break;
      case 'proveedor':
          this.tipo_s = 'proveedores';
          break;
    }
  	this.sniper = true;
  	const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token, tipo: this.tipo};
  	this.http.getlista(datos)
  	.subscribe((data) => {
  		this.sniper = false;
  		this.listas = data['response']['result'];
  		console.log(data);
  	});
  }
  setmylogo(logo) {
  	const styles = {
    'background-image': logo === '' ? 'url(\'assets/img/foto-no-disponible.jpg\')' : 'url(\'' + this.serverruta + 'assets/img/logosEmpresas/' + logo + '\')'};
  	return styles;
  }
  setmybanner(logo) {
  	const styles = {
    'background-image': logo === '' ? 'url(\'assets/img/bg_tercer.jpg\')' : 'url(\'' + this.serverruta + 'assets/img/banners/' + logo + '\')'};
  	return styles;
  }
  visitar(ir) {
    this.route.navigateByUrl('/perfilbuscado/' + ir);
  }

}

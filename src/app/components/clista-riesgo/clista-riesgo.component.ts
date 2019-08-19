import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RiesgoService } from '../../services/riesgo.service';
import { environment } from 'src/environments/environment';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-clista-riesgo',
  templateUrl: './clista-riesgo.component.html',
  styleUrls: ['./clista-riesgo.component.scss']
})
export class ClistaRiesgoComponent implements OnInit {
  selected = '';
  selectedd = '';
  palabra = '';
  giro = '';
  pageActual = 1;
  listas: any = [];
  listas_alterna: any = [];
  sniper = false;
  tipo = '';
  tipo_s = '';
  forma = '';
  fecha = '';
  persona = '';
  serverruta: string = environment.urlserver;
  datosgen: any = [];
  datosempresa: any = [];
  datosusuarios: any = [];
  token = '';

  constructor(
    private parametros: ActivatedRoute,
		private route: Router,
		private http: RiesgoService,
    private cookieService: CookieService,
    private orderPipe: OrderPipe
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
          this.persona = params['persona'];
          this.giro = params['rama'];
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
  	const datos = {giro: this.giro, IDEmpresa: this.datosempresa['IDEmpresa'], persona: this.persona , fecha: this.fecha, forma: this.forma, token: this.token, tipo: this.tipo};
  	this.http.getlist(datos)
  	.subscribe((data) => {
  		this.sniper = false;
      this.listas = data['response']['result']['Empresas'];
      this.listas_alterna = this.listas;
  		console.log(this.listas);
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
  busqueda() {
  	if (this.palabra === '') {
  		this.listas = this.listas_alterna;
  	} else {
  		this.listas = this.buscapalarabra();
  	}

  }
  buscapalarabra() {
  	const empresal = this.listas_alterna;
  		return empresal.filter(empresa => empresa.Razon_Social.toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));
  }
  orden(orden) {
    if (orden === 'az') {
      this.listas = this.orderPipe.transform( this.listas_alterna,'Razon_Social',false);
    } else {
      this.listas = this.orderPipe.transform( this.listas_alterna,'Razon_Social',true);
    }
  

  }
  orden_variacion(orden) {
    if (orden === 'az') {
      this.listas = this.orderPipe.transform( this.listas_alterna,['Incremento']['num'],false);
    } else {
      this.listas = this.orderPipe.transform( this.listas_alterna,['Incremento']['num'],true);
    }
  }

}

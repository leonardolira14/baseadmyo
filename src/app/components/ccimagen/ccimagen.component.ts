import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ImagenService } from '../../services/imagen.service';
@Component({
  selector: 'app-ccimagen',
  templateUrl: './ccimagen.component.html',
  styleUrls: ['./ccimagen.component.scss']
})
export class CcimagenComponent implements OnInit {
	public tipo_imagen = '';
	public fecha_imagen = '';
	public leyenda = 'EN LOS ÚLTIMOS 12 MESES';
	public imagen: any = [];
	tipo = 'clientes';

	datosgen: any = [];
	datosusuarios: any = [];
	datosempresa: any = [];
	token = '';
	sniper = false;
	tipo_contrario = '';

	public lineChartDataem: Array<any> = [
	    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	label: 'Media de calificaciones recibidas'}

	  ];
	  public lineChartDataemcalidad: Array<any> = [
	    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	label: 'Media de calificaciones recibidas en calidad'}

	  ];
	  public lineChartDataemcumplimiento: Array<any> = [
	    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	label: 'Media de calificaciones recibidas en cumplimiento'}

	  ];
	   public lineChartDataemoferta: Array<any> = [
	    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	label: 'Media de calificaciones recibidas en oferta'}

	  ];
	  public lineChartLabelsem: Array<any> = [];
	  public lineChartLabelsemcalidad: Array<any> = [];
	  public lineChartLabelsemcumplimiento: Array<any> = [];
	  public lineChartLabelsemoferta: Array<any> = [];
	  public lineChartDataec: Array<any> = [
	    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	label: 'No de calificaciones'}

	  ];
	  public lineChartLabelsec: Array<any> = [];



	  public lineChartOptions: any = {
	    responsive: true
	  };
	  public lineChartColors: Array<any> = [
	    { // grey
	      backgroundColor: 'rgba(255, 133, 27, 1)',
	      borderColor: 'rgba(255, 133, 27, 1)',
	      pointBackgroundColor: 'rgba(255, 133, 27, 1)',
	      pointBorderColor: '#fff',
	      pointHoverBackgroundColor: '#fff',
	      pointHoverBorderColor: 'rgba(255, 133, 27, 1)'
	    }
	  ];

	  public lineChartLegend = true;
	  public lineChartType = 'line';



  constructor(
	  private http: ImagenService,
	  private cookieService: CookieService,
	  private route: Router,
	  private parametros: ActivatedRoute
	  ) {

	  	this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
	  	this.datosusuarios = this.datosgen['datosusuario'];
	  	this.datosempresa = this.datosgen['empresa'];
	  	this.token = this.datosgen['Token'];
	  	this.parametros.params
	  	.subscribe((params) => {
	  		this.sniper = true;
	  		if (params['tipo'] !== undefined) {
	  			this.tipo_imagen = params['tipo'];
	  			(this.tipo_imagen === 'cliente') ? this.tipo = 'clientes' : this.tipo = 'proveedores';
	  		}
	  		if (params['fecha'] !== undefined) {
	  			this.fecha_imagen = params['fecha'];
	  		}
	  		this.solicitar();
	  	});
   }

  ngOnInit() {

	}
	goimagen() {
		this.route.navigateByUrl('/imagen/' + this.tipo_imagen + '/A');
	}
	lista() {
  	this.route.navigateByUrl('/listan/' + this.tipo);
	}
	recibidas() {
  	this.route.navigateByUrl('/recibidas/' + this.tipo);
  }
  ir() {
  	this.route.navigateByUrl('/detalleimagen/' + this.tipo_imagen + '/' + this.fecha_imagen);
  }
  cambiar(y) {
  	this.fecha_imagen = y;
  	this.solicitar();
  }
  solicitar() {
  	this.sniper = true;
  	if (this.tipo_imagen === 'cliente') {
  		this.tipo_contrario = 'Proveedores';
  	} else {
  		this.tipo_contrario = 'Clientes';
  	}
  	this.fecha_imagen === 'A' ? this.leyenda = 'EN LOS ÚLTIMOS 12 MESES' : this.leyenda = 'EN LOS ÚLTIMOS 30 Días';

  	const datos = {fecha: this.fecha_imagen, tipo: this.tipo_imagen, IDEmpresa: this.datosempresa['IDEmpresa']};
  	this.http.imagen(datos)
  	.subscribe((data) => {
  		console.log(data);
  		this.imagen = data['response']['result']['imagen'];
  		this.lineChartDataem[0]['data'] = this.imagen['evolucionmedia']['data']['data'];
  		this.lineChartLabelsem = this.imagen['evolucionmedia']['label'];

		  this.lineChartDataec[0]['data'] = this.imagen['serievolucion']['data']['data'];
  		this.lineChartLabelsec = this.imagen['serievolucion']['label'];
  		// para las grafias de calidad
  		this.lineChartDataemcalidad[0]['data'] = this.imagen['evolucion_calidad']['data']['data'];
  		this.lineChartLabelsemcalidad = this.imagen['evolucion_calidad']['label'];
  		// para las grafias de cumplimiento
  		this.lineChartDataemcumplimiento[0]['data'] = this.imagen['evolucion_cumplimiento']['data']['data'];
		  this.lineChartLabelsemcumplimiento = this.imagen['evolucion_cumplimiento']['label'];
		  // para las grafias de cumplimiento
		  if (this.tipo_imagen !== 'cliente') {  
		this.lineChartDataemoferta[0]['data'] = this.imagen['evolucion_oferta']['data']['data'];
		this.lineChartLabelsemoferta = this.imagen['evolucion_oferta']['label'];
		  }
		this.sniper = false;
  	});
  }
}

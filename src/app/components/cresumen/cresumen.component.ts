import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../../services/general.service';
import { Router, ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { ChartOptions, ChartType, ChartDataSets, Color } from 'chart.js';

@Component({
  selector: 'app-cresumen',
  templateUrl: './cresumen.component.html',
  styleUrls: ['./cresumen.component.scss']
})
export class CresumenComponent implements OnInit {
	@ViewChild( BaseChartDirective) panelA: BaseChartDirective;
	resumen: any = [];
	public tipo= "";
	public barChartOptions: ChartOptions = {
	    responsive: true,

	 };
	 public barChartLabels: Array<any> = ['', "", ""];
	 public barChartType: ChartType = 'bar';
	 public barChartLegend = true;
	 public barChartData: Array<any> = [{data: [0, 0, 0], label: "Mayores de 8"}, {data: [0, 0, 0], label:'Menores de 8'}, {data: [0, 0, 0], label:'No Calificados'}];
	 public coloursbar: Color[] = [
		{
	      backgroundColor: 'rgba(0, 87, 146, 1)',
	      borderColor: 'rgba(0, 87, 146, 1)',
	      hoverBackgroundColor: 'rgba(0, 87, 146, 1)',
	      hoverBorderColor: 'rgba(0, 87, 146, 1)'
	    },
	    {
	      backgroundColor: 'rgba(0, 166, 90, 1)',
	      borderColor: 'rgba(0, 166, 90, 1)',
	      hoverBackgroundColor: 'rgba(0, 166, 90, 1)',
	      hoverBorderColor: 'rgba(0, 166, 90, 1)'
	    },
	    {
	      backgroundColor: 'rgba(255, 133, 27, 1)',
	      borderColor: 'rgba(255, 133, 27, 1)',
	      hoverBackgroundColor: 'rgba(255, 133, 27, 1)',
	      hoverBorderColor: 'rgba(255, 133, 27, 1)'
	    }];

	public lineChartData: Array<any> = [{data: [0, 0, 0], label: 'Numero de Clientes'}];
	public lineChartLabels: Array<any> = [];

	public lineChartDatanum: Array<any> = [{data: [0, 0, 0], label: 'Numero de Calificaciones'}];
	public lineChartLabelsnum: Array<any> = ['g', 'd', 'g'];



	public lineChartDataprom: Array<any> = [{data: [0, 0, 0], label: 'Promedio de Calificaciones'}];
	public lineChartLabelsprom: Array<any> = ['g', 'd', 'g'];

	public lineChartOptions: any = {
	    responsive: true
	  };
	public lineChartColors: Array<any> = [
	    {
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




	datosgen: any = [];
	datosempresa: any = [];
	datosusuarios: any = [];
	token= "";
	sniper= false;

  constructor(private parametros: ActivatedRoute, private route: Router, private http: GeneralService, private cookieService: CookieService, private modalService: NgbModal) {
  		this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios = this.datosgen['datosusuario'];
		this.datosempresa = this.datosgen['empresa'];
		this.token = this.datosgen['Token'];
		this.parametros.params
	  	.subscribe((params) => {
	  		this.sniper = true;
	  		if (params['tipo'] !== undefined) {
	  			this.tipo = params['tipo'];
	  		}
	  		this.getaresumen();

	  	});
   }

  ngOnInit() {
  }
  getaresumen() {
  	this.sniper = true;
  	let datos = {IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token, tipo: this.tipo};
  	this.http.getaresumen(datos)
  	.subscribe((data) => {

  		this.resumen = data['response']['result'];
  		this.barChartLabels = this.resumen['seriecul']['labels'];
  		this.barChartData = this.resumen['seriecul']['serie'];

  		this.lineChartData[0]['data'] = this.resumen['serieclientes']['datos'][0]['data'];
       	this.lineChartLabels = this.resumen['serieclientes']['labels'];

  		this.lineChartLabelsnum = this.resumen['promediopormes']['labels'];
  		this.lineChartDatanum[0]['data'] = this.resumen['promediopormes']['datos'][0]['data'];

  		this.lineChartLabelsprom = this.resumen['serienumerodecalifmes']['labels'];
  		this.lineChartDataprom[0]['data'] = this.resumen['serienumerodecalifmes']['datos'][0]['data'];
		this.sniper = false;
  	});
  }
  resumengo() {
  	this.route.navigateByUrl('/resumen/' + this.tipo);
  }
  lista() {
  	this.route.navigateByUrl('/lista/' + this.tipo + '/a');
  }
  realizadas() {
  	this.route.navigateByUrl('/realizadas/' + this.tipo);
  }
}

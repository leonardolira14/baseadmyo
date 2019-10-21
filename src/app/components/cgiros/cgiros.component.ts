import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { CookieService } from 'ngx-cookie-service';
import { RegistroService } from 'src/app/services/registro.service';
@Component({
  selector: 'app-cgiros',
  templateUrl: './cgiros.component.html',
  styleUrls: ['./cgiros.component.scss']
})
export class CgirosComponent implements OnInit {
 datosgen: any;
 datosusuarios: any;
 datosempresa: any;
 token: any;
 listagiros: any;
 listagiros2: any;
 todos_losgiros: any;
 modal_open = false;
 sniper = false;
 allsubgiros: any = [];
  allramas: any = [];
  addgiro: any = {};
  palabra = '';
  constructor(
    private http: GeneralService ,
    private cookieService: CookieService,
    private https: RegistroService
    ) {
    this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios = this.datosgen['datosusuario'];
		this.datosempresa = this.datosgen['empresa'];
		this.token = this.datosgen['Token'];
   }

  ngOnInit() {

    this.http.getallgiros(this.datosempresa['IDEmpresa'], this.token)
    .subscribe(data => {
      this.listagiros = data['response']['giros'];
      this.listagiros2 = this.listagiros;
      this.todos_losgiros = data['response']['allgiros'];
      console.log(data);
    });
  }
  getsubsector() {
    this.sniper = true;
    console.log(this.addgiro);
  	this.https.getsubsector(this.addgiro.sector)
	.subscribe((data) => {
    console.log(data);
		this.allsubgiros = data['response']['result'];
		this.sniper = false;
	});
  }
  getrama() {
  	this.sniper = true;
  	this.https.getrama(this.addgiro.subgiro)
  	.subscribe((data) => {
		this.allramas = data['response']['result'];
		this.sniper = false;
	});
  }
  reggiro() {
  	this.sniper = true;
  	this.addgiro['IDEmpresa'] = this.datosempresa['IDEmpresa'];
  	this.http.registrogiro(this.token, this.addgiro)
  	.subscribe((data) => {
      this.listagiros = data['response']['result']['giros'];
      this.listagiros2 = this.listagiros;
      this.modal_open = false;
		this.sniper = false;
	});
  }
  deletegiro(giro) {
  	this.sniper = true;
  	const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], giro: giro};
  	this.http.deletegiro(this.token, datos)
  	.subscribe((data) => {
    this.listagiros = data['response']['result']['giros'];
    this.listagiros2 = this.listagiros;
		this.sniper = false;
	});
  }
  principal(giro) {
  	this.sniper = true;
  	const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], giro: giro};
  	this.http.principalgiro(this.token, datos)
  	.subscribe((data) => {
      this.listagiros  = data['response']['result']['giros'];
      this.listagiros2 = this.listagiros;
		this.sniper = false;
	});
  }
  buscar() {
    const giros = this.listagiros2;
     console.log(this.palabra,giros)
    if (this.palabra === '') {
      this.listagiros = this.listagiros2;
    } else {
      this.listagiros = giros.filter(cliente => cliente['giron1'].toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));

    }
  }
}

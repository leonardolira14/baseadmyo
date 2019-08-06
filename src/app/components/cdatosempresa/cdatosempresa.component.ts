import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { GeneralService} from '../../services/general.service';
import { RegistroService} from '../../services/registro.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
@Component({
  selector: 'app-cdatosempresa',
  templateUrl: './cdatosempresa.component.html',
  styleUrls: ['./cdatosempresa.component.scss']
})
export class CdatosempresaComponent implements OnInit {
	alertbol = false;
  alertclass = '';
  alerttitle = '';
	datosgen: any = [];
	numempresa = '';
	token = '';
	sniper = false;
	girost: any = [];
	marcas: any = [];
	rutaserver = '';
	datosempresa: any = [];
	noempleados: any = [];
	factanual: any = [];
	tipoempresas: any = [];
	logo = '';
	banner = '';
	size = 'cover';
	allgiros: any = [];
	addgiro: any = {};
	modelmarca: any = {};
	allsubgiros: any = [];
	allramas: any = [];
	logitomarca = '';
	public imagePath;
  	imgURL: any;
  	public message: string;
  	filemarcalogo: File = null;
  fileempresalogo: File = null;
  fileempresabanner: File = null;
  alerttext = '';
  constructor(private https: RegistroService , private modalService: NgbModal, private route: Router, private cookieService: CookieService, private http: GeneralService) {
	this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
  	this.numempresa = this.datosgen['datosusuario']['IDEmpresa'];
  	this.datosempresa = this.datosgen['empresa'];
  	this.token = this.datosgen['Token'];
  	this.rutaserver = environment.urlserver;
  	this.logitomarca = 'assets/img/foto-no-disponible.jpg';
   }

  ngOnInit() {
  	this.sniper = true;
  	this.http.getperfilempresa(this.numempresa, this.token)
  	.subscribe((data) => {
		  console.log(data);
  		if (data['response']['code'] === 0) {
    		this.girost = data['response']['result']['giros'];
  			this.marcas = data['response']['result']['marcas'];
  			this.noempleados = data['response']['result']['noempleados'];
			this.factanual = data['response']['result']['factanual'];
			this.tipoempresas = data['response']['result']['tipoempresas'];
			if (this.datosempresa['Logo'] === '') {
				this.logo = 'url(\'assets/img/foto-no-disponible.jpg\') ';
			} else {
				this.logo = 'url(\'' + this.rutaserver + '/assets/img/logosEmpresas/' + this.datosempresa['Logo'] + '\')';
			}
			if (this.datosempresa['Banner'] === '') {
				this.banner = 'url(\'assets/img/funfacts-bg.jpg\')';
			} else {
				this.banner = 'url(\'' + this.rutaserver + '/assets/img/banners/' + this.datosempresa['Banner'] + '\') ';
			}
			this.allgiros = data['response']['result']['allgiros'];

  		}

  		this.sniper = false;
  	}, (error) => {
  		this.sniper = false;
  	});
  }
  openalert(alert) {
  	this.modalService.open(alert, {ariaLabelledBy: 'modal-basic-title'});
  }
  getsubsector() {
  	this.sniper = true;
  	this.https.getsubsector(this.addgiro.sector)
	.subscribe((data) => {
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
  	this.addgiro['IDEmpresa'] = this.numempresa;
  	this.http.registrogiro(this.token, this.addgiro)
  	.subscribe((data) => {
		this.girost = data['response']['result']['giros'];
		this.sniper = false;
	});
  }
  deletegiro(giro) {
  	this.sniper = true;
  	const datos = {IDEmpresa: this.numempresa, giro: giro};
  	this.http.deletegiro(this.token, datos)
  	.subscribe((data) => {
		this.girost = data['response']['result']['giros'];
		this.sniper = false;
	});
  }
  principal(giro) {
  	this.sniper = true;
  	const datos = {IDEmpresa: this.numempresa, giro: giro};
  	this.http.principalgiro(this.token, datos)
  	.subscribe((data) => {
		this.girost = data['response']['result']['giros'];
		this.sniper = false;
	});
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
 	this.filemarcalogo = <File>files[0];
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logitomarca = reader.result;
    };
  }
  previewbanner(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
  this.fileempresabanner = <File>files[0];
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.banner = 'url(\'' + reader.result + '\')';
    };
  }
  previewlogo(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
  this.fileempresalogo = <File>files[0];
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logo = 'url(\'' + reader.result + '\')';

    };
  }
  addmarca() {
  	// this.sniper = true;
  	// this.sniper=true;
  	const formData = new FormData();

  	if (this.modelmarca.IDMarca) {
 		formData.append('empresa', this.numempresa);
 		formData.append('idmarca', this.modelmarca.IDMarca);
 		formData.append('marca', this.modelmarca.marca);
 		if (this.filemarcalogo !== null) {
 			formData.append('logo', this.filemarcalogo, this.filemarcalogo.name);
 		}
		 formData.append('token', this.token);
 		this.http.updatemarca(formData)
 		.subscribe((data) => {
	  	 	this.sniper = false;
	  	 	if (data['response']['code'] === 0) {
	  	 		this.marcas = data['response']['result']['Marcas'];
	  	 		this.modelmarca = {};
  				this.logitomarca = 'assets/img/foto-no-disponible.jpg';
	  	 		this.closemodel('alertmarcas');
	  	 	} else {
	  	 		console.log(data);
	  	 	}

	  	 }, (error) => swal('Error', JSON.stringify(error), 'info'));

  	} else {

	  	 formData.append('empresa', this.numempresa);
	  	 formData.append('marca', this.modelmarca.marca);
	  	 formData.append('logo', this.filemarcalogo, this.filemarcalogo.name);
	  	 formData.append('token', this.token);
	  	 this.http.addmarcas(formData)
	  	 .subscribe((data) => {
	  	 	this.sniper = false;
	  	 	if (data['response']['code'] === 0) {
	  	 		this.marcas = data['response']['result']['Marcas'];
	  	 		this.modelmarca = {};
  				this.logitomarca = 'assets/img/foto-no-disponible.jpg';
	  	 		this.closemodel('alertmarcas');
	  	 	} else if (data['response']['code'] === 1990) {
				this.closemodel('alertmarcas');
	  	 		swal('Error', 'Usted cuenta con un plan basico, para seguir registrando marcas te recomendamos aumentar de plan.', 'info');
	  	 	}

	  	 }, (error) => swal('Error', JSON.stringify(error), 'info'));
  	}
  }
  deletemarca(id) {
  	this.sniper = true;
  	const das = {empresa: this.numempresa, marca: id};
  	this.http.deletemarca(this.token, das)
  	.subscribe((data) => {
  	 	this.sniper = false;
  	 	if (data['response']['code'] === 0) {
  	 		this.marcas = data['response']['result']['Marcas'];
  	 	} else {
  	 		console.log(data);
  	 	}

  	 }, (error) => console.log(error));
  }
  editmarca(id, alert) {
  	this.marcas.forEach((marca) => {
  		if (marca.IDMarca === id) {
  			this.modelmarca.IDMarca = id;
  			this.modelmarca.marca = marca.Marca;
  			this.logitomarca = this.rutaserver + 'assets/img/logosmarcas/' + marca.logo;
  			this.openalert(alert);
  		}
  	});
  }
  closemodel(content) {
  	this.modelmarca = {};
  	this.logitomarca = 'assets/img/foto-no-disponible.jpg';
    this.modalService.dismissAll(content);
  }
  // funcion para modificar los datos de la empresa
  updateempresa() {
    this.sniper = true;
    const formData = new FormData();
    formData.append('IDEmpresa', this.numempresa);
    formData.append('razon_social', this.datosempresa['Razon_Social']);
    formData.append('nombre_comercial', this.datosempresa['Nombre_Comer']);
    formData.append('rfc', this.datosempresa['RFC']);
    formData.append('tempresa', this.datosempresa['TipoEmpresa']);
    formData.append('nempleados', this.datosempresa['NoEmpleados']);
    formData.append('facanual', this.datosempresa['FacAnual']);
    formData.append('perfil', this.datosempresa['Perfil']);
    formData.append('diaspagoempresa', this.datosempresa['DiasPagoEmpresa']);
     formData.append('token', this.token);
    if (this.fileempresabanner !== null) {
      formData.append('banner', this.fileempresabanner, this.fileempresabanner.name);
    }
    if (this.fileempresalogo !== null) {
      formData.append('logo', this.fileempresalogo, this.fileempresalogo.name);
    }
  	this.http.updateempresa(formData)
    .subscribe((data) => {
      this.sniper = false;
      if (data['response']['code'] === 0) {
        console.log(data);

        this.datosgen['empresa'] = data['response']['result']['empresa'];
        this.datosempresa = this.datosgen['empresa'];
        this.cookieService.set('datosUsuario', JSON.stringify(this.datosgen));
      } else {
        this.openmensaje('danger', data['response']['result'], 'Error');
      }
    }, (error) => console.log(error));
  }
  openmensaje(tipo, texto, titulo) {
    if (tipo === 'danger') {
      this.alertclass = 'alert-danger';
    } else {
      this.alertclass = 'alert-success';
    }
    this.alertclass = tipo;
    this.alerttext = texto;
    this.alerttitle = titulo;
    this.alertbol = true;
    setTimeout(function() {
        this.alertbol = false;
    }, 4000);
	}
	restante_dias(numero) {

	}
}

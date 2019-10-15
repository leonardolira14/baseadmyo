import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from '../../services/productos.service';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
@Component({
	selector: 'app-cproductos',
	templateUrl: './cproductos.component.html',
	styleUrls: ['./cproductos.component.scss']
})
export class CproductosComponent implements OnInit {
	palabra = '';
	modelproductos: any = {};
	productos: any = [];
	rutaserver = environment.urlserver;
	imglogo: any ;
	filemarcalogo: File = null;
	public imagePath;
	public message;
	pageActual = 1;
	datosgen: any = [];
	datosempresa: any = [];
	token = '';
	sniper = false;
	staticAlertClosed = false;
	successAlertClosed = false;
	alertterror = '';
	alertsuccess = '';
	datosusuarios: any = [];

	constructor(private route: Router, private http: ProductosService, private cookieService: CookieService, private modalService: NgbModal) {
		this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
		this.datosusuarios = this.datosgen['datosusuario'];
		this.datosempresa = this.datosgen['empresa'];
		this.token = this.datosgen['Token'];
		this.imglogo = 'assets/img/foto-no-disponible.jpg';
	}

	ngOnInit() {
		this.sniper = true;
		const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token};
		this.http.getall(datos)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] == 0) {
				this.productos = data['response']['result'];
			} else {
				this.route.navigateByUrl('/');
			}
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
      this.imglogo = reader.result;
    };
  }
	openalert(alert) {
		this.modalService.open(alert, {ariaLabelledBy: 'modal-basic-title'});
	}
	close() {
		this.staticAlertClosed = false;
		this.successAlertClosed = false;
	}
	closemodel(content) {
		this.modelproductos = {};
		this.modalService.dismissAll(content);
	}
	editar(id, alert) {
		if (this.datosusuarios['Tipo_Usuario'] !== 'Master') {
  		this.staticAlertClosed = true;
  		this.alertterror = 'No esta autorizado para realizar esta acción';
  		setTimeout(() => {
  			this.staticAlertClosed = false;
  		}, 3000);
  		return false;
  	}
		this.imglogo = 'assets/img/foto-no-disponible.jpg';
		this.productos.forEach((producto) => {
			if (producto.IDProducto === id) {
				this.modelproductos = producto;

				if (producto.Foto !== null) {
					this.imglogo = this.rutaserver + 'assets/img/logoprod/' + producto.Foto;
				}
				this.openalert(alert);
				return false ;
			}
		});

	}
	busqueda() {

	}
	eliminar(id) {
		if (this.datosusuarios['Tipo_Usuario'] !== 'Master') {
  		this.staticAlertClosed = true;
  		this.alertterror = 'No esta autorizado para realizar esta acción';
  		setTimeout(() => {
  			this.staticAlertClosed = false;
  		}, 3000);
  		return false;
  		}
  		this.sniper = true;
  		const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token, IDProducto: id};
  		this.http.delete(datos)
  		.subscribe((data) => {
  			this.sniper = false;
  			if (data['response']['code'] === 0) {
  				this.productos = data['response']['result'];
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
	deci(alert) {
		if (this.datosusuarios['Tipo_Usuario'] !== 'Master') {
  		this.staticAlertClosed = true;
  		this.alertterror = 'No esta autorizado para realizar esta acción';
  		setTimeout(() => {
  			this.staticAlertClosed = false;
  		}, 3000);
  		return false;
  	}
		this.sniper = true;
		if (this.modelproductos['IDProducto']) {
			this.update(alert);
		} else {
			this.save(alert);
		}
	}
	update(alert) {
		const formdata = new FormData();
		formdata.append('IDProducto', this.modelproductos['IDProducto']);
		formdata.append('Producto', this.modelproductos['Producto']);
		formdata.append('Promocion', this.modelproductos['Promocion']);
		formdata.append('Descripcion', this.modelproductos['Descripcion']);
		formdata.append('token', this.token);
		formdata.append('IDEmpresa', this.datosempresa['IDEmpresa']);
		formdata.append('Foto', this.modelproductos['Foto']);
		if (this.filemarcalogo) {
			formdata.append('logo', this.filemarcalogo, this.filemarcalogo.name);
		}
		this.http.update(formdata)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] === 0) {
				this.productos = data['response']['result'];
				this.closemodel(alert);
	  			this.successAlertClosed = true;
	  			this.alertsuccess = 'Datos Actualizados';
	  			this.modelproductos = {};
	  			this.imglogo = 'assets/img/foto-no-disponible.jpg';
	  			setTimeout(() => {
	  					this.successAlertClosed = false;
	  			}, 3000);
			} else {
				this.staticAlertClosed = false;
	  			this.alertterror = data['response']['result'];
	  			setTimeout(() => {
	  					this.staticAlertClosed = false;
	  			}, 3000);
			}
		});
	}
	save(alert) {
		const formdata = new FormData();
		formdata.append('Producto', this.modelproductos['Producto']);
		formdata.append('Promocion', this.modelproductos['Promocion']);
		formdata.append('Descripcion', this.modelproductos['Descripcion']);
		formdata.append('token', this.token);
		formdata.append('IDEmpresa', this.datosempresa['IDEmpresa']);
		if (this.filemarcalogo) {
			formdata.append('logo', this.filemarcalogo, this.filemarcalogo.name);
		}
		this.http.save(formdata)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] === 0) {
				this.productos = data['response']['result'];
				this.closemodel(alert);
	  			this.successAlertClosed = true;
	  			this.alertsuccess = 'Datos Actualizados';
	  			this.modelproductos = {};
	  			this.imglogo = 'assets/img/foto-no-disponible.jpg';
	  			setTimeout(() => {
	  					this.successAlertClosed = false;
	  			}, 3000);
			} else if (data['response']['code'] === 1990) {
				this.closemodel('alertmarcas');
	  	 		swal('Error', 'Usted cuenta con un plan basico, para seguir registrando marcas te recomendamos aumentar de plan.', 'info');
	  	 	} else			{
				this.staticAlertClosed = false;
	  			this.alertterror = data['response']['result'];
	  			setTimeout(() => {
	  					this.staticAlertClosed = false;
	  			}, 3000);
			}
		});

	}
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AsociacionesService } from '../../services/asociaciones.service';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-casociaciones',
  templateUrl: './casociaciones.component.html',
  styleUrls: ['./casociaciones.component.scss']
})
export class CasociacionesComponent implements OnInit {
	grupformgroup= new FormGroup({
		mycontrol: new FormControl(),
		mysiglas: new FormControl(),
	})
	myForm: FormGroup;
	filemarcalogo:File = null;
	imagePath:any;
	public urlserver = environment.urlserver;
	logo_avatar: any = '/assets/img/avatar1.png';
	
	filteredOptions: Observable<any[]>;
	filtrosiglas: Observable<any[]>;
	asociaciones: any = [];
	modelcamara: any = {};
	listasociaciones: any = [];
	palabra = '';
	datosgen: any = [];
	datosempresa: any = [];
	token = '';
	sniper = false;
	staticAlertClosed = false;
	successAlertClosed = false;
	alertterror = '';
	alertsuccess = '';
	pageActual = 1;
	datosusuarios: any = [];
	lista_asociaciones: any = [];
  constructor(private route: Router, private http: AsociacionesService, private cookieService: CookieService, private modalService: NgbModal)
  {
	
  	this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
	this.datosusuarios = this.datosgen['datosusuario'];
	this.datosempresa = this.datosgen['empresa'];
	this.token = this.datosgen['Token'];
  }

  ngOnInit() {
  	this.sniper = true;
		const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token};
		this.http.getall(datos)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] === 0) {
				this.asociaciones = data['response']['result'];
				this.listasociaciones = this.asociaciones;
				this.lista_asociaciones = data['response']['data'];
				this.filteredOptions = this.grupformgroup.get('mycontrol').valueChanges
				.pipe(
					startWith(''),
					map(value => typeof value === 'string' ? value : value['Nombre']),
					map(name => name ? this._filter(name) : this.lista_asociaciones.slice())
				);
				this.filtrosiglas = this.grupformgroup.get('mysiglas').valueChanges
				.pipe(
					startWith(''),
					map(value => typeof value === 'string' ? value : value['Siglas']),
					map(name => name ? this._filter_siglas(name) : this.lista_asociaciones.slice())
				);
			} else {
				this.route.navigateByUrl('/');
			}
		});
  }
displayFn(asociacion?: any): string | undefined {
	if(typeof(asociacion)==='string'){
		return asociacion;
	}else{
		return asociacion ? asociacion.Nombre : undefined;
	}
	
}
displaysiglas(asociacion?: any): string | undefined {
	if(typeof(asociacion)==='string'){
		return asociacion;
	}else{
		return asociacion ? asociacion.Siglas : undefined;
	}
	
	
}	
private _filter(nombre){
	const filterValue = nombre.toLowerCase();
	return this.lista_asociaciones.filter(asociacion => asociacion.Nombre.toLowerCase().includes(filterValue))
}
private _filter_siglas(nombre){
	const filterValue = nombre.toLowerCase();
	return this.lista_asociaciones.filter(asociacion => asociacion.Siglas.toLowerCase().includes(filterValue))
}


  openalert(alert) {

		this.modalService.open(alert, {ariaLabelledBy: 'modal-basic-title',size: 'lg'});
	}
	close() {
		this.staticAlertClosed = false;
		this.successAlertClosed = false;
	}
	closemodel(content) {
		this.modelcamara = {};
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
		this.asociaciones.forEach((data) => {
			if (data.IDAsocia === id) {
				this.modelcamara = data;
			}
		});
		this.openalert(alert);
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
  		// this.sniper = true;
		if (this.modelcamara['IDAsocia']) {
			this.update(alert);
		} else {
			this.save(alert);
		}
	}
	busqueda() {
		console.log(this.palabra)
		if (this.palabra === '') {
  			this.asociaciones = this.listasociaciones;
	  	} else {
	  		this.asociaciones = this.buscapalarabra();
	  	}
	}
	buscapalarabra() {
		console.log(this.palabra);
		  const asociaciones = this.asociaciones;
		  console.log(asociaciones);
  		return asociaciones.filter(usuario => usuario.Nombre.toLocaleLowerCase().includes(this.palabra.toLocaleLowerCase()));
  }
	delete(id) {
		if (this.datosusuarios['Tipo_Usuario'] !== 'Master') {
	  		this.staticAlertClosed = true;
	  		this.alertterror = 'No esta autorizado para realizar esta acción';
	  		setTimeout(() => {
	  			this.staticAlertClosed = false;
	  		}, 3000);
	  		return false;
  		}
  		this.sniper = true;
		let datos = {IDEmpresa: this.datosempresa['IDEmpresa'], token: this.token, IDAsocia: id};
		this.http.delete(datos)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] === 0) {
				this.asociaciones = data['response']['result'];
				this.listasociaciones = this.asociaciones;
				this.closemodel(alert);
				this.successAlertClosed = true;
				this.alertsuccess = 'Datos Actualizados';
				setTimeout(() => {
					this.successAlertClosed = false;
				}, 3000);
			} else {
				this.alertterror = data['response']['result'];
				setTimeout(() => {
					this.staticAlertClosed = false;
				}, 3000);
			}
		});
	}
	save(alert) {
		
		this.modelcamara['IDEmpresa'] = this.datosempresa['IDEmpresa'];
		this.modelcamara['token'] = this.token;
		if(this.modelcamara["IDAsociasiones"]===undefined){
			const formData = new FormData();
			this.modelcamara["Siglas"]=this.grupformgroup.get('mysiglas').value;
			this.modelcamara["Nombre"]=this.grupformgroup.get('mycontrol').value;
			formData.append('datosasociacion', JSON.stringify(this.modelcamara));
			console.log(this.filemarcalogo );
			if (this.filemarcalogo !== null) {
				formData.append('logo', this.filemarcalogo, this.filemarcalogo.name);
			}
			this.http.save(formData)
				.subscribe((data) => {
					this.sniper = false;
				if (data['response']['code'] === 0) {

					this.ngOnInit();
					this.closemodel(alert);
					this.successAlertClosed = true;
					this.alertsuccess = 'Datos Actualizados';
					setTimeout(() => {
						this.successAlertClosed = false;
						this.modelcamara = {};
					}, 3000);
				} else {
					this.alertterror = data['response']['result'];
					setTimeout(() => {
						this.staticAlertClosed = false;
					}, 3000);
				}
			});
		}else{
		
		this.http.save(this.modelcamara)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] === 0) {

				this.asociaciones = data['response']['result'];
				this.listasociaciones = this.asociaciones;
				this.closemodel(alert);
				this.successAlertClosed = true;
				this.alertsuccess = 'Datos Actualizados';
				setTimeout(() => {
					this.successAlertClosed = false;
				}, 3000);
			} else {
				this.alertterror = data['response']['result'];
				setTimeout(() => {
					this.staticAlertClosed = false;
				}, 3000);
			}
		});
	}
	}
	update(alert) {
		this.modelcamara['IDEmpresa'] = this.datosempresa['IDEmpresa'];
		this.modelcamara['token'] = this.token;
		this.http.update(this.modelcamara)
		.subscribe((data) => {
			this.sniper = false;
			if (data['response']['code'] === 0) {

				this.asociaciones = data['response']['result'];
				this.listasociaciones = this.asociaciones;
				this.closemodel(alert);
				this.successAlertClosed = true;
				this.alertsuccess = 'Datos Actualizados';
				setTimeout(() => {
					this.successAlertClosed = false;
				}, 3000);
			} else {
				this.alertterror = data['response']['result'];
				setTimeout(() => {
					this.staticAlertClosed = false;
				}, 3000);
			}
		});
	}
	getPosts(opcion){
		
		this.modelcamara = opcion;
		this.grupformgroup.controls['mysiglas'].setValue(opcion['Siglas']);
		
		
		if(this.modelcamara['Imagen'] === null) {
			this.logo_avatar = '/assets/img/avatar1.png';
		} else {
			this.logo_avatar = environment.urlserver + '/assets/img/asociaciones/' + this.modelcamara['Imagen'];
		}
	}
	getPosts2(opcion){
		console.log(opcion);
		this.modelcamara = opcion;
		this.grupformgroup.get('mycontrol').setValue(opcion['Nombre']);
		console.log();
		if(this.modelcamara['Imagen'] === null) {
			this.logo_avatar = '/assets/img/avatar1.png';
		} else {
			this.logo_avatar = environment.urlserver + '/assets/img/asociaciones/' + this.modelcamara['Imagen'];
		}
	}


	preview(files) {
		if (files.length === 0) {
		  return;
		}
	
		const mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
		  alert('Only images are supported.');
		  return;
		}
		 this.filemarcalogo = <File>files[0];
		const reader = new FileReader();
		this.imagePath = files;
		reader.readAsDataURL(files[0]);
		reader.onload = (_event) => {
			this.logo_avatar = reader.result;
		};
	  }
}

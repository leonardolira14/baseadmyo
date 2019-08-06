import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones.service';
import swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cnotificaciones',
  templateUrl: './cnotificaciones.component.html',
  styleUrls: ['./cnotificaciones.component.scss']
})
export class CnotificacionesComponent implements OnInit {
  public tipo_notificacion = [
    {Nombre: 'Calificaciones Recibidas', Value: 'crecibidas'},
    {Nombre: 'Calificación Realizada', Value: 'crealizadas'},
    {Nombre: 'Visita Recibida', Value: 'vista'},
    {Nombre: 'Riesgo de Cliente', Value: 'riesgoc'},
    {Nombre: 'Riesgo de Proveedor', Value: 'riesgop'},
    {Nombre: 'Seguimiento de empresas', Value: 'follow'},
  ];
  public fecha = '';
  public tipo = '';
  public model_notificaciones = false;
  public list_notificaciones: any[] = [];
  public listnotificaciones: any[] = [];
  public datos_generales_empresa: any[] = [];
  public model_calificar = false;
  public tipo_calificar = 'Cliente';
  public empresa_calificar = '';
  public config_notificaciones: any[] = [];
  public mode_notificaciones = {};
  public todas_notif = false;
  pageActual = 1;
  constructor(
    private http: NotificacionesService,
    private cookieService: CookieService,
    private route: Router
  ) {
    this.datos_generales_empresa = JSON.parse(this.cookieService.get('datosUsuario'));
    console.log( this.datos_generales_empresa);
    if (this.datos_generales_empresa['empresa']['Configaletas'] !== '') {
      this.mode_notificaciones = JSON.parse(this.datos_generales_empresa['empresa']['Configaletas']);
    }
   }

  ngOnInit() {
    const datos = {empresa: this.datos_generales_empresa['empresa']['IDEmpresa']};
    this.http.getnoficaciones(datos)
    .subscribe(respuesta => {
      this.list_notificaciones = respuesta['notificaciones'];
      this.listnotificaciones = this.list_notificaciones ;

    }, error => {
      // tslint:disable-next-line: quotemark
      swal("Error", JSON.stringify(error), 'error');
    });
  }
  dame_titulo(descript) {
   switch (descript) {
     case 'vista':
          return 'Visitas Recibidas';
     case 'calificacionrp':
        return 'Calificación Realizada a Proveedor';
     case 'calificacionrc':
          return 'Calificación Realizada a Cliente';
     case 'calificacionC':
          return 'Calificación Recibida de Cliente';
     case 'calificacionp':
          return 'Calificación Recibida de Proveedor';
     case 'riesgop':
          return 'Riesgo de Proveedor';
     case 'riesgoc':
          return 'Riesgo de Cliente';
     case 'riesgosc':
          return 'Riesgo Empresa Seguida Como Cliente';
     case 'riesgosp':
          return 'Riesgo Empresa Seguida Como Proveedor';
     case 'cpr':
          return 'Calificación Puesta en Resolución';
     case 'cpa':
          return 'Calificación Puesta en Anulación';
     case 'Follow':
          return 'Empresa te sigue';
   }
  }
  tiopoleyenda(tipo) {
    switch (tipo) {
      case 'calificacionC':
      case 'calificacionp':
      case 'calificacionrp':
      case 'calificacionrc':
        return  'Calificación';
      case 'riesgosp':
      case 'riesgosc':
      case 'riesgop':
      case 'riesgoc':
      case 'cpa':
      case 'cpr':
            return  'Cambio';
      case 'vista':
            return  'Visita';
      case 'Follow':
            return  'Activación';
    }
  }
  // funcion para los filtros
  filter() {
    let fecha = '';
    let tipo = '';
    if (this.fecha !== '') {
      if (Number(this.fecha['month']) < 10) {
        fecha = this.fecha['year'] + '-0' + this.fecha['month'] + '-' + this.fecha['day'];
      } else {
        fecha = this.fecha['year'] + '-' + this.fecha['month'] + '-' + this.fecha['day'];
      }
    }
    if (tipo !== undefined) {
      tipo = this.tipo;
    }
    if ( fecha === '' && tipo === '' ) {
        this.listnotificaciones = this.list_notificaciones;
    } else {
     let list_filtro: any[] = [];
     switch ( tipo ) {
        case '':
            list_filtro = this.list_notificaciones;
            break;
        case 'td':
          list_filtro = this.list_notificaciones;
          break;
        case 'crecibidas':
            list_filtro = this.list_notificaciones.filter(item => {
              if ( item.Descript === 'calificacionC' || item.Descript === 'calificacionp') {
              return item;
              }
            });
            break;
        case 'crealizadas':
            list_filtro = this.list_notificaciones.filter(item => {
              if ( item.Descript === 'calificacionrp' || item.Descript === 'calificacionrc') {
              return item;
              }
            });
            break;
        case 'riesgoc':
            list_filtro = this.list_notificaciones.filter(item => {
              return item.Descript.includes('riesgoc');
            });
            break;
        case 'riesgop':
            list_filtro = this.list_notificaciones.filter(item => {
              return item.Descript.includes('riesgop');
            });
            break;
        case 'vista':
            list_filtro = this.list_notificaciones.filter(item => {
              console.log(item.Descript);
              return item.Descript.includes('vista');
            });
            break;
        case 'follow':
            list_filtro = this.list_notificaciones.filter(item => {
              return item.Descript.includes('Follow');
            });
            break;
        case 'cpr':
            list_filtro = this.list_notificaciones.filter(item => {
              return item.Descript.includes('cpr');
            });
            break;
        case 'cpa':
            list_filtro = this.list_notificaciones.filter(item => {
              return item.Descript.includes('cpa');
            });
            break;
     }

     if (fecha === '') {
      this.listnotificaciones = list_filtro;
     } else {
      this.listnotificaciones = list_filtro.filter(item => {
        return item.Fecha.includes(fecha);
      });
     }
    }

  }
  limpiar_filtro() {
    this.listnotificaciones = this.list_notificaciones;
    this.fecha = '';
    this.tipo = '';
  }
  borrar(idnotificacion) {
    const datos = {idnotificacion: idnotificacion};
  this.http.delete(datos)
  .subscribe(resp => {
    this.ngOnInit();
    swal('Exito', 'Notificacion eliminada', 'success');
  }, error => {
    swal('Error', JSON.stringify(error), 'error');
  });
  }
  goto(ir) {
    console.log(ir);
  }
  gotoc() {
    this.route.navigateByUrl('calificar/' + this.tipo_calificar + '/' + this.empresa_calificar);
  }
  calificar(id) {
    this.empresa_calificar = id;
    this.model_calificar = true;
  }
  cambio_selec(persona) {
    this.tipo_calificar = persona;

  }
  guardar_config() {
    this.datos_generales_empresa['empresa']['Configaletas'] = JSON.stringify(this.mode_notificaciones);
    console.log(this.datos_generales_empresa['empresa']['Configaletas'], this.mode_notificaciones);
    const datos = {empresa: this.datos_generales_empresa['empresa']['IDEmpresa'], alertas: this.mode_notificaciones};
    this.http.updateconfig(datos)
    .subscribe(respuesta => {
      this.model_notificaciones = false;
      swal('Exito', 'Configuaración Actualizada', 'success');
      this.cookieService.set( 'datosUsuario', JSON.stringify(this.datos_generales_empresa));
    }, error => {
      swal('Error', JSON.stringify(error), 'error');
    });
  }
  siono(tipo, valor) {
    if (tipo ==='basic' && valor === 'follow') {
      return 'true';
    } else {
      return 'false';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones.service';
import swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-cnotificaciones',
  templateUrl: './cnotificaciones.component.html',
  styleUrls: ['./cnotificaciones.component.scss']
})
export class CnotificacionesComponent implements OnInit {
  public tipo_notificacion = [
    {Nombre: 'Todas', Value: 'td'},
    {Nombre: 'Calificaciones Recibidas', Value: 'crecibidas'},
    {Nombre: 'Calificación Realizada', Value: 'crealizadas'},
    {Nombre: 'Visita Recibida', Value: 'vista'},
    {Nombre: 'Riesgo de Cliente', Value: 'riesgoc'},
    {Nombre: 'Riesgo de Proveedor', Value: 'riesgop'},
    {Nombre: 'Seguimiento de empresas', Value: 'follow'},
    {Nombre: 'Calificaciónes en Resolución', Value: 'cpr'},
    {Nombre: 'Calificaciónes en Anulación', Value: 'cpa'},

  ];
  public fecha = '';
  public tipo = '';
  public model_notificaciones = false;
  public list_notificaciones: any[] = [];
  public listnotificaciones: any[] = [];
  public datos_generales_empresa: any[] = [];
  pageActual = 1;
  constructor(
    private http: NotificacionesService,
    private cookieService: CookieService
  ) {
    this.datos_generales_empresa = JSON.parse(this.cookieService.get('datosUsuario'));
   }

  ngOnInit() {
    const datos = {empresa: this.datos_generales_empresa['empresa']['IDEmpresa']};
    this.http.getnoficaciones(datos)
    .subscribe(respuesta => {
      this.list_notificaciones = respuesta['notificaciones'];
      this.listnotificaciones = this.list_notificaciones ;
      console.log(respuesta);
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

  //funcion para los filtros
  filter(){
    console.log(this.fecha,this.tipo)
  }
  borrar(idnotificacion) {
    console.log(idnotificacion);
  }
  goto(ir) {
    console.log(ir);
  }
  calificar(id) {
    console.log(id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) {
   }
   getestados() {
    return this.http.get(environment.urlserver + 'getestados')
    .pipe(map(data => data));
   }
   // funcion para activar una cuenta en admyo
   activate(datos) {
    return this.http.post(environment.urlserver + 'activar', datos);
   }
   // funcion para traer los datos del perfil
   getperfil(empresa, token) {
   	return this.http.post(environment.urlserver + 'getperfil', {empresa, token})
   	.pipe(map(data => data));
   }
   // funcion para obtener los datos de la empresa
   getperfilempresa(empresa, token) {
   	return this.http.post(environment.urlserver + 'getperfilempresa', {empresa, token})
   	.pipe(map(data => data));
   }
   // funcion para obtener los giros de una empresa
   getallgiros(datos,token){
    return this.http.post(environment.urlserver + 'getallgiro', {token, datos})
    .pipe(map(data => data));
   }
   // funcion para agregar un giro
   registrogiro(token, datos) {
    return this.http.post(environment.urlserver + 'reggiro', {token, datos})
    .pipe(map(data => data));
   }
   // eliminar un giro
   deletegiro(token, datos) {
    return this.http.post(environment.urlserver + 'deletegiro', {token, datos})
    .pipe(map(data => data));
   }
   // funcion para poner en principal un giro
   principalgiro(token, datos) {
    return this.http.post(environment.urlserver + 'principal', {token, datos})
    .pipe(map(data => data));
   }
   // funcion para poner en principal un giro
   updategiro(token, datos) {
    return this.http.post(environment.urlserver + 'updategiro', {token, datos})
    .pipe(map(data => data));
   }
   // funcion para agregar una nueva marca
   addmarcas(datos) {
     
    return this.http.post(environment.urlserver + 'addmarca', datos)
    .pipe(map(data => data));
   }
   // funcion para eliminar una marca
   deletemarca(token, datos) {
    return this.http.post(environment.urlserver + 'deletemarca', {token, datos})
    .pipe(map(data => data));
   }
   // funcion para update
   updatemarca(datos) {
    console.log(datos)
    return this.http.post(environment.urlserver + 'updatemarca', datos)
    .pipe(map(data => data));
   }
  updateempresa(datos) {
    return this.http.post(environment.urlserver + 'updateempresa', datos)
    .pipe(map(data => data));
  }
  // funcon para actulizar los datos de contacto de una empresa
  updatecontacto(token, datos) {
    return this.http.post(environment.urlserver + 'updatecontacto', {token, datos})
    .pipe(map(data => data));
  }
  // funciones para conseguir todos los telefonos de la empresa
  gettels(token, datos) {
     return this.http.post(environment.urlserver + 'gettels', {token, datos})
    .pipe(map(data => data));
  }
  // funcion para agregar un telefonos
  addtel(token, datos) {
     return this.http.post(environment.urlserver + 'addtel', {token, datos})
    .pipe(map(data => data));
  }
  // function para eliminar un telefonos
  deletetel(token, datos) {
    return this.http.post(environment.urlserver + 'deletetel', {token, datos})
    .pipe(map(data => data));
  }
  // funcion para actualizar un telefono
  updatetel(token, datos) {
     return this.http.post(environment.urlserver + 'updatetel', {token, datos})
    .pipe(map(data => data));
  }
  cerrarsession(token, empresa) {
     return this.http.post(environment.urlserver + 'cerrarsession', {token, IDEmpresa: empresa})
    .pipe(map(data => data));
  }

  // funcion para obtener el resumen de clientes o proveedores
  getaresumen(datos) {
    return this.http.post(environment.urlserver + 'getaresumen', datos)
    .pipe(map(data => data));
  }
  getlista(datos) {
    return this.http.post(environment.urlserver + 'getlista', datos)
    .pipe(map(data => data));
  }
  getallrealizadas(datos) {
    return this.http.post(environment.urlserver + 'getallrealizadas', datos)
    .pipe(map(data => data));
  }

  getallrecibidas(datos) {
    return this.http.post(environment.urlserver + 'getallrecibidas', datos)
    .pipe(map(data => data));
  }

  detallescalificacion(datos) {
    return this.http.post(environment.urlserver + 'detallescalificacion', datos)
    .pipe(map(data => data));
  }
  // funciones para calificar
  getempresas() {
    return this.http.get(environment.urlserver + 'getallempresas')
    .pipe(map(data => data));
  }
  // funcion para poner en resolucion una valoracion
  pendiente_valoracion(datos) {
    return this.http.post(environment.urlserver + 'pendientevaloracion', datos)
    .pipe(map(data => data));
  }
  // funcion para recuperar contraseña
  recuperarcontra(datos) {
    return this.http.post(environment.urlserver + 'recuperarpass', datos)
    .pipe(map(data => data));
  }
}

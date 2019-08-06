import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private http: HttpClient) { }

  getnumnoficaciones(datos) {
    return this.http.post(environment.urlserver + 'numregistros', datos);
  }
  getnoficaciones(datos) {
    return this.http.post(environment.urlserver + 'getallnotification', datos);
  }
  updateconfig(datos) {
    return this.http.post(environment.urlserver + 'updateconfignotification', datos);
  }
  delete(datos) {
    return this.http.post(environment.urlserver + 'deletegnotification', datos);
  }
  
}

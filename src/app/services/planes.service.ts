import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(
    private http: HttpClient
  ) { }

  // funcion para soluciatar los datos de un cliente en conekta
  solicita_data(datos){
    return this.http.post(environment.urlserver + 'dataclienteconecta', datos);
  }
  //funcion para cambiar de plan
  changeplan(datos){
    return this.http.post(environment.urlserver + 'updateplan', datos);
  }
}

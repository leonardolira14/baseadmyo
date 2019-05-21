import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CalifcarService {

  constructor(private http: HttpClient) { }
  
  getcuestionario(datos){
    return this.http.post(environment.urlserver + 'getcuestionario', datos);
  }
  enviar_calificacion(datos){
    return this.http.post(environment.urlserver + 'calificar', datos);
  }
}

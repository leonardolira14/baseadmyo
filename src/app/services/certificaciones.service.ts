import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CertificacionesService {

  constructor(private http: HttpClient) { }
  getall(datos){
  	return this.http.post(environment.urlserver+"getallnorma",datos)
  	.pipe(map(data=>data));
  }
  save(datos){
  	return this.http.post(environment.urlserver+"savenorma",datos)
  	.pipe(map(data=>data));
  }
  delete(datos){
  	return this.http.post(environment.urlserver+"deletenorma",datos)
  	.pipe(map(data=>data));
  }
  update(datos){
  	return this.http.post(environment.urlserver+"updatenorma",datos)
  	.pipe(map(data=>data));
  }
}

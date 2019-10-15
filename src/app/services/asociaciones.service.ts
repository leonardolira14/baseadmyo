import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AsociacionesService {

  constructor(private http: HttpClient) { }
  getall(datos){
  		return this.http.post(environment.urlserver+"getallcamara",datos)
  		.pipe(map(data=>data));
  }
  save(datos){
  	return this.http.post(environment.urlserver+"savecamara",datos)
  	.pipe(map(data=>data));
  }
  delete(datos){
  	return this.http.post(environment.urlserver+"deletecamara",datos)
  	.pipe(map(data=>data));
  }
  update(datos){
  	return this.http.post(environment.urlserver+"updatecamara",datos)
  	.pipe(map(data=>data));
  }
  // funcion para traer la lista de asociacioes
  getlist() {
    return this.http.get(environment.urlserver + 'getasociaciones');
  }
}

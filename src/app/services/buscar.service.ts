import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  constructor(private http: HttpClient) { }


  perfil(datos){
  	return this.http.post(environment.urlserver+"perfil",datos)
  	.pipe(map(data=>data));
  }
  nueva_busqueda(datos){
	return this.http.post(environment.urlserver+"busqueda",datos)
  	.pipe(map(data=>data));
  }
}

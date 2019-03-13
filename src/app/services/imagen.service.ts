import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http: HttpClient) { }

  imagen(datos){
  	return this.http.post(environment.urlserver+"getimagen",datos)
    .pipe(map(data=>data));
  }
  detallesimagen(datos){
  	return this.http.post(environment.urlserver+"detallesimagen",datos)
    .pipe(map(data=>data));
  }
}

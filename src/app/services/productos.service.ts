import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  //funcion para solicitar todos los productos
  getall(datos){
  	return this.http.post(environment.urlserver+"getallprducts",datos)
  	.pipe(map(data=>data));
  }
  save(form){
  	return this.http.post(environment.urlserver+"saveprducts",form)
  	.pipe(map(data=>data));
  }
   update(form){
  	return this.http.post(environment.urlserver+"updateprducts",form)
  	.pipe(map(data=>data));
  }
  delete(form){
  	return this.http.post(environment.urlserver+"deleteprducts",form)
  	.pipe(map(data=>data));
  }
}

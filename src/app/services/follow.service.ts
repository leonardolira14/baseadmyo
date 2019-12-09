import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient)
  {
  }
  //funcion para mostrasr las empresas que estan siguiendo
  getfollow(datos){
  	return this.http.post(environment.urlserver+"getallfollow",datos)
    .pipe(map(data=>data));
  }
  //funcion para olvidar una empresas
  olvidar(datos){
  	return this.http.post(environment.urlserver+"olvidarfollow",datos)
  	.pipe(map(data=>data));
  }
  filtro(datos){
  	return this.http.post(environment.urlserver+"filtrofollow",datos)
  	.pipe(map(data=>data));
  }
}

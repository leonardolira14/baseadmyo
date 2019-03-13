import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  //funcion para actualizar los datos de un Usuario
  update(token,datos){
  	return this.http.post(environment.urlserver+"usuarioupdate",{token,datos})
  	.pipe(map(data=>data));
  }
  updatecalve(datos){
  	return this.http.post(environment.urlserver+"updateclave",datos)
  	.pipe(map(data=>data));
  }
  getalluser(token,datos){
  	return this.http.post(environment.urlserver+"getalluser",{token,datos})
  	.pipe(map(data=>data));
  }
  updatestatus(token,datos){
  	return this.http.post(environment.urlserver+"updatestatususer",{token,datos})
  	.pipe(map(data=>data));
  }
  save(datos){
  	return this.http.post(environment.urlserver+"saveususer",datos)
  	.pipe(map(data=>data));
  }
  master(datos){
	return this.http.post(environment.urlserver+"master",datos)
  	.pipe(map(data=>data));
  }
}

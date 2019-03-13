import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  constructor(private http: HttpClient) { }
  getall(datos){
  		return this.http.post(environment.urlserver+"visitas",datos)
  		.pipe(map(data=>data));
  }
}

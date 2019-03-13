import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RiesgoService {

  constructor(private http: HttpClient) { }
  
  getriesgo(datos){
  	return this.http.post(environment.urlserver+"getriesgo",datos)
    .pipe(map(data=>data));
  }
}

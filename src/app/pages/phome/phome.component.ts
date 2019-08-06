import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-phome',
  templateUrl: './phome.component.html',
  styleUrls: ['./phome.component.scss']
})
export class PhomeComponent implements OnInit {
public token = '';
  constructor(
    private parametros: ActivatedRoute,
    private http: GeneralService
  ) { }

  ngOnInit() {
    this.parametros.params
    .subscribe((params) => {
      if (params['token'] !== undefined) {
        this.token = params['token'];
        const datos = {token: this.token};
        this.http.activate(datos)
        .subscribe(respuesta => {
          if (respuesta['ok'] === 'error') {
            swal('Error', respuesta['error'], 'error');
          } else {
            swal('Exito', respuesta['mensaje'], 'success');
          }
          console.log(respuesta);
        });
      }
    });
  }

}

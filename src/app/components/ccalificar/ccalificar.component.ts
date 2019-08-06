import { Component, OnInit, ViewChild  } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { GeneralService } from '../../services/general.service';
import { CalifcarService } from '../../services/califcar.service';
import {FormControl} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import swal from 'sweetalert2';
import * as $ from 'jquery';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-ccalificar',
  templateUrl: './ccalificar.component.html',
  styleUrls: ['./ccalificar.component.scss']
})
export class CcalificarComponent implements OnInit {
  @ViewChild('stepper') stepper;
  public sniper = false;
public tipo_califica = 'Cliente';
public giros: any[];
public subgiros: any[];
public ramas: any[];
public model_calificar: any = {};
public datosgen: any[] = [];
public datosusuarios: any[] = [];
public datosempresa: any[] = [];
public cuestionario_calidad: any[] = [];
public cuestionario_cumplimiento: any[] = [];
public cuestionario_oferta: any[] = [];
public cuestionario_recomendacion: any[] = [];
stateCtrl = new FormControl();
filteredStates: Observable<any[]>;
states: any[] = [];
public listas_dependencias: any[] = [];
public lista_respuestas: any[] = [];
  constructor(
    public http_registro: RegistroService,
    public http_general: GeneralService,
    private cookieService: CookieService,
    private http_calificar: CalifcarService,
    private route: Router,
    private params: ActivatedRoute
  ) {

    this.datosgen = JSON.parse(this.cookieService.get('datosUsuario'));
    this.datosusuarios = this.datosgen['datosusuario'];
    this.datosempresa = this.datosgen['empresa'];

  }
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();
   return  this.states.filter(state => state.Razon_Social.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnInit() {
    this.sniper = true;
    this.http_registro.getsector()
    .subscribe((data) => {
      this.giros = data['response']['result'];
    });
    this.http_general.getempresas()
    .subscribe((data) => {
      this.states = data['response']['result'];
      this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
      this.calificaexpress();
      this.sniper = false;
    });
  }
  calificaexpress() {
    this.params.params
    .subscribe((params) => {
    if (params['empresa'] !== undefined) {
        this.select_empresa(params['empresa']);
    }
    if (params['tipo'] !== undefined) {
      this.cambio_selec(params['tipo']);
    }
    });
  }
  select_subgiro() {
    this.sniper = true;
    const giro = this.model_calificar['Giro'];
    this.http_registro.getsubsector(giro)
    .subscribe((data) => {
      this.subgiros = data['response']['result'];
      this.sniper = false;
    });
  }
  select_rama() {
    this.sniper = true;
    const subgiro = this.model_calificar['Subgiro'];
    this.http_registro.getrama(subgiro)
    .subscribe((data) => {
      this.ramas = data['response']['result'];
      this.sniper = false;
    });
  }
  cambio_selec(persona) {
    this.tipo_califica = persona;

  }
  obtener_cuestionario() {
    if (this.model_calificar['Razon'] === undefined) {
      swal('Error!','Ingresa una Razon Social a calificar','error');

    } else if (this.model_calificar['rfc'] === undefined) {
      swal('Error!', "Ingresa un RFC a califcar",'error');
    } else if (this.model_calificar['email'] === undefined) {
      swal('Error!','Ingresa una direcciòn de correo electrònico a calificar','error');
    } else if (this.model_calificar['Giro'] === undefined) {
      swal('Error!', "Ingresa un Giro a calificar", "error");
    } else if (this.subgiros.length > 0 && this.model_calificar['Subgiro'] === undefined) {
      swal('Error!','Ingresa un SubGiro a calificar', "error");
    } else if (this.ramas.length > 0 && this.model_calificar['Rama'] === undefined) {
      swal('Error!', "Ingresa una Rama a calificar", "error");
    } else if (this.datosempresa['IDEmpresa'] === this.model_calificar['IDReceptor']) {
      swal('Error!','Usted no puede calificarse a si mismo','error');
    } else {
      this.model_calificar['TipoReceptor'] = this.tipo_califica;
      const datosEmisor = {
        Correo: this.datosusuarios['Correo'],
        IDUsuario: this.datosusuarios['IDUsuario'],
        IDEmpresa: this.datosempresa['IDEmpresa']
      };
      this.model_calificar['Emisor'] = datosEmisor;
      this.sniper = true;
      this.http_calificar.getcuestionario(this.model_calificar)
      .subscribe(data => {
        this.sniper = false;
        if (data['response']['code'] === 0) {
          this.cuestionario_calidad = data['response']['result']['Preguntas']['Calidad'];
          this.cuestionario_cumplimiento = data['response']['result']['Preguntas']['Cumplimiento'];
          this.cuestionario_oferta = data['response']['result']['Preguntas']['Oferta'];
          this.cuestionario_recomendacion = data['response']['result']['Preguntas']['Recomendacion'];
          this.listas_dependencias = data['response']['result']['listas_dependencias'];
          this.stepper.selectedIndex = 1;
        } else {
          swal('Error!', data['response']['mensaje'], "error");
        }

      });

    }

  }
  select_empresa(IDEmpresa) {
    this.states.forEach(element => {
      if (element.IDEmpresa === IDEmpresa) {
        this.model_calificar['Razon'] = element.Razon_Social;
        this.model_calificar['rfc'] = element.RFC;
        this.model_calificar['IDReceptor'] = IDEmpresa;
        return ;
      }
    });
  }
  enviar_cuestion() {
    this.sniper = true;
    this.model_calificar['cuestionarios'] = {
      calidad: this.cuestionario_calidad,
      cumplimiento: this.cuestionario_cumplimiento,
      oferta: this.cuestionario_oferta,
      recomendacion: this.cuestionario_recomendacion
    };
    this.http_calificar.enviar_calificacion(this.model_calificar)
    .subscribe((data) => {
      this.sniper = false;
      swal('Exito!','Gracias por su tiempo, la encuesta ha sido recibida', 'success');
      this.route.navigateByUrl('imagen/cliente/A');
    }, error => {
      this.sniper = false;
      swal('Error!', JSON.stringify(error), 'error');
    });
    console.log(this.model_calificar);
  }
  ver_dependencia(index, dedonde) {

    let lista = [];
    if (dedonde ==='calidad') {
      lista = this.cuestionario_calidad;
    }
    if (dedonde === "cumplimiento") {
      lista = this.cuestionario_cumplimiento;
    }
    if (dedonde ==='oferta') {
      lista = this.cuestionario_oferta;
    }
    if (dedonde === "recomendacion") {
      lista = this.cuestionario_oferta;
    }
    this.listas_dependencias.forEach(element => {
        lista.forEach(pag => {
            if (pag.Nump === element.ID_Pregunta) {
              if (pag.Respuesta_usuario === element.Respuesta) {
                $('#'+ element.S_ID_Pregunta).removeClass('d-none');
              } else {
                $('#'+ element.S_ID_Pregunta).addClass('d-none');
              }
            }
        });
    });
  }
}

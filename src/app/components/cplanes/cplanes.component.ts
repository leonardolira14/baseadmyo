import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PlanesService} from '../../services/planes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cplanes',
  templateUrl: './cplanes.component.html',
  styleUrls: ['./cplanes.component.scss']
})
export class CplanesComponent implements OnInit {
  @ViewChild('tb_precios')  tb_precios;
  public input_numlic = 10;
  public leyenda_qval = '';
  public gratis_admyo = true;
  public micro_admyo = false;
  public empresa_admyo = false;
  public micro_admyo_anual = false;
  public empresa_admyo_anual = false;
  public empresarial_qval = false;
  public empresarial_anual = false;
  public plan_selec = 'gratis';
  public leyenda_admyo = 'gratis';
  public car = [];
  public num_lic_qval = 0;
  public Coste_Final = 0;
  public coste_admyo = 0;
  public coste_qval = 0;
  public anual_qval = false;
  public anual_admyo = false;
  public mensual_qval = false;
  public mensual_admyo = false;
  public datos_generales_empresa: any[] = [];
  private tipo_plan = '';
  public datos_cargo: any = {};
  constructor(
    private route: Router,
    private cookieService: CookieService,
    private http: PlanesService
  ) {
    this.datos_generales_empresa = JSON.parse(this.cookieService.get('datosUsuario'));
    console.log(this.datos_generales_empresa['empresa']);
    if (this.datos_generales_empresa['empresa']['TipoCuenta'] === 'basic') {
      this.tipo_plan = 'gratis';
      this.datos_cargo['fecha_proximo_cargo'] = 'Sin Cargo';
    } else {
      this.tipo_plan = this.datos_generales_empresa['empresa']['TipoCuenta'];
      this.getdata();
    }
    this.cambio_micro(this.tipo_plan);
   }

  ngOnInit() {
  }
  cambio_micro(tipo) {
    this.leyenda_admyo = tipo;
    switch (tipo) {
      case 'gratis':
        this.micro_admyo = false;
        this.gratis_admyo = true;
        this.empresa_admyo = false;
        this.micro_admyo_anual = false;
        this.empresa_admyo_anual = false;
        this.plan_selec = 'Gratis';
        this.coste_admyo = 0.00;
        break;
      case 'micro':
        this.micro_admyo = true;
        this.gratis_admyo = false;
        this.empresa_admyo = false;
        this.micro_admyo_anual = false;
        this.empresa_admyo_anual = false;
        this.plan_selec = 'Micro Empresa';
        this.coste_admyo = 200;
        this.anual_admyo = false;
        this.mensual_admyo = true;
        break;
      case 'micro_anual':
        this.micro_admyo = false;
        this.gratis_admyo = false;
        this.empresa_admyo = false;
        this.micro_admyo_anual = true;
        this.empresa_admyo_anual = false;
        this.plan_selec = 'Micro Empresa Anual';
        this.coste_admyo = 2000;
        this.anual_admyo = true;
        this.mensual_admyo = false;
        break;
      case 'empresa':
        this.micro_admyo = false;
        this.gratis_admyo = false;
        this.empresa_admyo = true;
        this.micro_admyo_anual = false;
        this.empresa_admyo_anual = false;
        this.plan_selec = 'Empresarial';
        this.coste_admyo = 1000;
        this.anual_admyo = false;
        this.mensual_admyo = true;
        break;
      case 'empresa_anual':
        this.micro_admyo = false;
        this.gratis_admyo = false;
        this.empresa_admyo = false;
        this.micro_admyo_anual = false;
        this.empresa_admyo_anual = true;
        this.plan_selec = 'Empresarial Anual';
        this.coste_admyo = 10000;
        this.anual_admyo = true;
        this.mensual_admyo = false;
        break;
    }
    this.Coste_Final = this.coste_admyo + this.coste_qval;
  }
  // funcion para solicitar  los datos de un cliente
  getdata() {
    const datos = {empresa: this.datos_generales_empresa['empresa']['IDEmpresa']};
    this.http.solicita_data(datos)
    .subscribe(data => {
      this.datos_cargo = data['response'];
    });
  }
  proximo_paso() {
    const datos = [{IDEmpresa: this.datos_generales_empresa['empresa']['IDEmpresa']}];
    if (this.plan_selec === 'Gratis') {
      datos['coste_admyo'] = 0;
      datos['plan_selec'] = 'gratis';
      datos['datos_cargo'] = this.datos_cargo;
      this.http.changeplan(datos)
      .subscribe(data => {
        swal('Exito', 'Datos Actualizados', 'success');
        this.route.navigateByUrl('/perfil');
      });
    } else {
      datos[0]['total'] = this.coste_admyo;
      datos[0]['anual'] = this.anual_admyo;
      datos[0]['mensual'] = this.mensual_admyo;
      datos[0]['plan'] = this.plan_selec;
      datos[0]['datos_cargo'] = this.datos_cargo;
      datos[0]['leyenda'] = this.leyenda_admyo;
      
      localStorage.setItem('datoscard', JSON.stringify(datos));
      this.route.navigateByUrl('/datoscargo');
    }
    console.log(this.plan_selec);
  }
}

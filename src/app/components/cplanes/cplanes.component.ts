import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
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
  constructor(
    private route: Router
  ) { }

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
}

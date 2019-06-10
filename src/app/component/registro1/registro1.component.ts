import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro1',
  templateUrl: './registro1.component.html',
  styleUrls: ['./registro1.component.scss']
})
export class Registro1Component implements OnInit {
@ViewChild('tb_precios')  tb_precios;
  public input_numlic=10;
  public leyenda_qval='';
  public gratis_admyo:boolean=true;
  public micro_admyo:boolean=false;
  public empresa_admyo:boolean=false;
  public micro_admyo_anual:boolean=false;
  public empresa_admyo_anual:boolean=false;
  public empresarial_qval:boolean=false;
  public empresarial_anual:boolean=false;
  public plan_selec:string="gratis";
  public leyenda_admyo='gratis';
  public car=[];
  public num_lic_qval=0;
  public Coste_Final=0;
  public coste_admyo=0;
  public coste_qval=0;
  public anual_qval=false;
  public anual_admyo=false;
  public mensual_qval=false;
  public mensual_admyo=false;
  constructor(
    private route:Router
    
    ) {
      if(localStorage.card_admyo){
        this.car=JSON.parse(localStorage.card_admyo);
        this.cambio_micro(this.car[0].leyenda);
        this.cambio_qval(this.car[1].plan);
        this.input_numlic=this.car[1].NumLic;
        this.num_lic();
      }
     }

  ngOnInit() {
    
  }
  cambio_micro(tipo){
    this.leyenda_admyo=tipo;
    switch(tipo){
      case 'gratis':
        this.micro_admyo=false;
        this.gratis_admyo=true;
        this.empresa_admyo=false;
        this.micro_admyo_anual=false;
        this.empresa_admyo_anual=false;
        this.plan_selec="Gratis";
        this.coste_admyo=0.00;
        break;
      case 'micro':
        this.micro_admyo=true;
        this.gratis_admyo=false;
        this.empresa_admyo=false;
        this.micro_admyo_anual=false;
        this.empresa_admyo_anual=false;
        this.plan_selec="Micro Empresa";
        this.coste_admyo=200;
        this.anual_admyo=false;
        this.mensual_admyo=true;
        break;
      case 'micro_anual':
        this.micro_admyo=false;
        this.gratis_admyo=false;
        this.empresa_admyo=false;
        this.micro_admyo_anual=true;
        this.empresa_admyo_anual=false;
        this.plan_selec="Micro Empresa Anual";
        this.coste_admyo=2000;
        this.anual_admyo=true;
        this.mensual_admyo=false;
        break;
      case 'empresa':
        this.micro_admyo=false;
        this.gratis_admyo=false;
        this.empresa_admyo=true;
        this.micro_admyo_anual=false;
        this.empresa_admyo_anual=false;
        this.plan_selec="Empresarial";
        this.coste_admyo=1000;
        this.anual_admyo=false;
        this.mensual_admyo=true;
        break;
      case 'empresa_anual':
        this.micro_admyo=false;
        this.gratis_admyo=false;
        this.empresa_admyo=false;
        this.micro_admyo_anual=false;
        this.empresa_admyo_anual=true;
        this.plan_selec="Empresarial Anual";
        this.coste_admyo=10000;
        this.anual_admyo=true;
        this.mensual_admyo=false;
        break;
    }
    this.Coste_Final=this.coste_admyo+this.coste_qval;
  }
  nxt_precio(){
    this.tb_precios
  }
  cambio_qval(tipo){
    switch(tipo){
      case 'empresarial_qval':
        this.empresarial_qval=true;
        this.empresarial_anual=false;
        this.leyenda_qval='empresarial_qval';
        this.mensual_qval=true;
        this.anual_qval=false;
        this.num_lic();
        
        break;
      case 'empresarial_anual':
        this.empresarial_qval=false;
        this.empresarial_anual=true;
        this.leyenda_qval='empresarial_anual';
        this.mensual_qval=false;
        this.anual_qval=true;
        this.num_lic();
        break;
    }
  }
  num_lic(){
    if(this.input_numlic<10){
      Swal("Error","El número de licencias debe ser mayor a 10","error");
    }else{
      let adicional=0;
     switch(this.leyenda_qval){
       case 'empresarial_qval':
        adicional=this.input_numlic-10;
        this.coste_qval=3000+(adicional*100);
        break;
      case 'empresarial_anual':
        adicional=this.input_numlic-10;
        this.coste_qval=30000+((adicional*100)*12);
        break;
     }
     this.Coste_Final=this.coste_admyo+this.coste_qval;
    }
    
  }
  next_pass(){
    this.tb_precios.selectedIndex = 2;
  }
  add_plaqval(){
    this.num_lic();
    this.car=[{'anual':this.anual_admyo,'leyenda':this.leyenda_admyo,'plan':this.plan_selec,'total':this.coste_admyo},{'anual':this.anual_qval,'plan':this.leyenda_qval,'total':this.coste_qval,'NumLic':this.input_numlic}];

    console.log(this.car);
    localStorage.setItem("card_admyo",JSON.stringify(this.car));
    this.route.navigateByUrl('datosregistro');
  }
  por_momento(){
    this.input_numlic=10;
    this.empresarial_qval=false;
    this.empresarial_anual=false;
    this.coste_qval=0;
    this.mensual_qval=false;
    this.anual_qval=false;
    this.Coste_Final=this.coste_admyo+this.coste_qval;

    this.car=[{'leyenda':this.leyenda_admyo,'plan':this.plan_selec,'total':this.coste_admyo},{'plan':'','total':0,'NumLic':0}];
    

    localStorage.setItem("card_admyo",JSON.stringify(this.car));
    this.route.navigateByUrl('datosregistro');
    
  }
}

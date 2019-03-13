import { Component, OnInit } from '@angular/core';
import { PagoInterface } from '../../models/pago-interface';


@Component({
  selector: 'app-registro3',
  templateUrl: './registro3.component.html',
  styleUrls: ['./registro3.component.scss']
})
export class Registro3Component implements OnInit {
	metodopago:string;
	datosgenerales:string="";
	producto:string="";
	precioproducto:number;
	productoqval:string;
	precioproductoqval:number;
	total:number;
  licenciasqval:boolean=false;
	 public pago:PagoInterface={
		Metodo:"Oxxo",
		Nombre:"",
		Correo:"",
		Tarjeta:"",
		cvv:"",
		Token:"",
		Movil:"",
		Mes:"",
		Anio:"",
	 }
  constructor() {
  	  	if(localStorage.card_admyo){
  		this.datosgenerales=JSON.parse(localStorage.card_admyo);
  		this.pago.Nombre=this.datosgenerales["datoscliente"]["Nombre"]+" "+this.datosgenerales["datoscliente"]["Apellidos"];
		this.pago.Correo=this.datosgenerales["datoscliente"]["Correo1"];
		this.precioproductoqval=this.datosgenerales["datoscliente"]["PrecioQval"];
		this.precioproducto=this.datosgenerales["datoscliente"]["Precioadmyo"];
		this.selecttorproducto(this.datosgenerales["datoscliente"]["productos"]);
        this.seleccionarproductoqval(this.datosgenerales["productosqval"]);
        this.total=this.precioproducto+this.precioproductoqval;
        console.log(this.datosgenerales)
  	}
   }

  ngOnInit() {

  }
  selecttorproducto(producto){
  	if(producto===1){
  		this.precioproducto=0;
  		this.producto="Paquete Free";
  	}else if(producto===2){
  		this.precioproducto=200;
  		this.producto="Paquete PYMES";
  	}else{
  		this.precioproducto=1000;
  		this.producto="Paquete Empresarial";
  	}
  }
  seleccionarproductoqval(producto){
    if(producto===0){
      this.precioproductoqval=0;
      this.productoqval="Sin Licencias Qval";

    }else if(producto===1){
      this.precioproductoqval=100;
      this.productoqval="Paquete Estandar Qval";
      this.licenciasqval=true;
    }else if(producto===2){
      this.precioproductoqval=200;
      this.productoqval="Paquete Empresarial Qval";
      this.licenciasqval=true;
    }
  }
  pagar(){
  	this.datosgenerales["metdo_pay"]=this.pago;
  	localStorage.setItem("card_admyo",this.datosgenerales);
  	console.log(this.pago)
  }

}

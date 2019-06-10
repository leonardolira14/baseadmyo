import { Component, OnInit } from '@angular/core';
import { PagoInterface } from '../../models/pago-interface';
import { Router} from '@angular/router'
import swal from 'sweetalert2';
import { RegistroService } from '../../services/registro.service';
declare var Conekta: any;

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
	spinner=false;
	public datos_pago={};
	 public pago:PagoInterface={
		Metodo:"Tarjeta",
		Nombre:"",
		Correo:"",
		Tarjeta:"",
		cvv:"",
		Token:"",
		Movil:"",
		Mes:"",
		Anio:"",
	 }
  constructor(
		 private rote:Router,
		 private http:RegistroService
		 ) {
			Conekta.setPublicKey('key_EDxZCrdzJsGgsEaqzxutE8A');
      Conekta.setLanguage('es');
  	  if(localStorage.card_admyo){
  		this.datosgenerales=JSON.parse(localStorage.card_admyo);
  		this.pago.Nombre=this.datosgenerales[2]["Nombre"]+" "+this.datosgenerales[2]["Apellidos"];
			this.pago.Correo=this.datosgenerales[2]["Correo1"];
			this.producto=this.datosgenerales[0]["plan"] 
      this.precioproducto=this.datosgenerales[0]["total"];
      this.precioproductoqval=this.datosgenerales[1]["total"];
			this.check_planqval(this.datosgenerales[1]["plan"]);
        this.total=this.precioproducto+this.precioproductoqval;
        console.log(this.datosgenerales)
  	}
   }

  ngOnInit() {

	}
	check_planqval(plan){
    
    if(plan===''){
      this.productoqval='';
      this.licenciasqval=false;
    }else if(plan==='empresarial_qval'){
      this.productoqval='Plan Empresarial Qval';
      this.licenciasqval=true;
    }else{
      this.productoqval='Plan Empresarial Anual Qval';
      this.licenciasqval=true;
    }
	}
  pagar(){
  	/*this.datosgenerales["metdo_pay"]=this.pago;
  	localStorage.setItem("card_admyo",this.datosgenerales);
		console.log(this.pago)*/
		const tokenParams = {
			'card': {
				'number': this.pago.Tarjeta,
				'name': this.pago.Nombre ,
				'exp_year': this.pago.Anio,
				'exp_month': this.pago.Mes,
				'cvc': this.pago.cvv,
			}
		};
		
		Conekta.token.create(tokenParams, (data) => {
			let telefono = '0000000000';
			if ((this.pago.Movil === undefined) || (this.pago.Movil === '') ) {
				telefono = '0000000000';
			} else {
				telefono = this.pago.Movil;
			}
			this.datos_pago['datosempresa']=this.datosgenerales[3]['IDEmpresa'];
			this.datos_pago['pagoqval'] = {
				metodo: 'tarjeta',
				token: data.id,
				nombre: tokenParams.card.name,
				total: this.precioproductoqval,
				correo: this.pago.Correo,
				tel: telefono,
				descripcion: this.productoqval,
				tiempo:this.datosgenerales[1]['anual']
			};
			this.datos_pago['pagoadmyo'] = {

				metodo: 'tarjeta',
				token: data.id,
				nombre: tokenParams.card.name,
				total: this.precioproducto,
				correo: this.pago.Correo,
				tel: telefono,
				descripcion: this.producto,
				tiempo:this.datosgenerales[0]['anual']
			};
		 this.http.pago(this.datos_pago)
		 .subscribe( datas => {
			this.spinner = false;
		 if (datas['ok'] === 'succes') {
			// tslint:disable-next-line:max-line-length
			swal('Exito!', 'Gracias por su compra,se han enviado las instrucciones para la activaciòn de la cuenta al correo electrònico', 'success');
			localStorage.removeItem('datos_pago_qval');
			this.goto('');
		} else {
			swal('Error!', datas['error'], 'error');
		 }
		 });
		}, (error) => {
			this.spinner = false;
			swal('Error!', error.message_to_purchaser, 'error' );
		});
  }
	goto(ir){
		this.rote.navigateByUrl(ir)
	}

}

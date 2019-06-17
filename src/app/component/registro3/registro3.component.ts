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
	 public pago_qval:PagoInterface={
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

		this.pago_qval.Nombre=this.datosgenerales[2]["Nombre"]+" "+this.datosgenerales[2]["Apellidos"];
		this.pago_qval.Correo=this.datosgenerales[2]["Correo1"];

		this.producto=this.datosgenerales[0]["plan"] 
      this.precioproducto=this.datosgenerales[0]["total"];
      this.precioproductoqval=this.datosgenerales[1]["total"];
			this.check_planqval(this.datosgenerales[1]["plan"]);
        this.total=this.precioproducto+this.precioproductoqval;
        console.log(this.datosgenerales)
  	}
   }

  ngOnInit() {
		if(this.precioproducto>3000){
			this.pago.Metodo="Transferencia";
		}
		if(this.precioproductoqval>3000){
			this.pago_qval.Metodo="Transferencia";
		}
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

  pagar_admyo(){
	  this.datos_pago['datosempresa']=this.datosgenerales[3]['IDEmpresa'];
	let telefono = '0000000000';
	if ((this.pago.Movil === undefined) || (this.pago.Movil === '') ) {
		telefono = '0000000000';
	} else {
		telefono = this.pago.Movil;
	}
	if(this.pago.Metodo==='Transferencia'){
		this.datos_pago['pago'] = {
			para:'admyo',
			metodo: this.pago.Metodo,
			nombre:this.pago.Nombre,
			total: this.precioproducto,
			correo: this.pago.Correo,
			tel: telefono,
			descripcion: this.producto,
			tiempo:this.datosgenerales[1]['anual']
		};
		this.send_pago(this.datos_pago)
	}else{
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
			
			
			
			this.datos_pago['pago'] = {
				para:'admyo',
				metodo: this.pago.Metodo,
				token: data.id,
				nombre: tokenParams.card.name,
				total: this.precioproducto,
				correo: this.pago.Correo,
				tel: telefono,
				descripcion: this.producto,
				tiempo:this.datosgenerales[0]['anual']
			};
			this.send_pago(this.datos_pago)
			}, (error) => {
				this.spinner = false;
				swal('Error!', error.message_to_purchaser, 'error' );
			});
	}
  }
  pagar_qval(){
	this.datos_pago['datosempresa']=this.datosgenerales[3]['IDEmpresa'];
	let telefono = '0000000000';
	if ((this.pago.Movil === undefined) || (this.pago.Movil === '') ) {
		telefono = '0000000000';
	} else {
		telefono = this.pago.Movil;
	}
  	if(this.pago_qval.Metodo==='Transferencia'){
		this.datos_pago['pago'] = {
			para:'qval',
			metodo: this.pago_qval.Metodo,
			nombre:this.pago_qval.Nombre,
			total: this.precioproductoqval,
			correo: this.pago_qval.Correo,
			tel: telefono,
			descripcion: this.productoqval,
			tiempo:this.datosgenerales[1]['anual']
		};
		this.send_pago(this.datos_pago)
	  }else{

	  
	const tokenParams = {
		'card': {
			'number': this.pago_qval.Tarjeta,
			'name': this.pago_qval.Nombre ,
			'exp_year': this.pago_qval.Anio,
			'exp_month': this.pago_qval.Mes,
			'cvc': this.pago_qval.cvv,
		}
	};
	
	Conekta.token.create(tokenParams, (data) => {
		this.datos_pago['pago'] = {
			para:'qval',
			metodo: this.pago_qval.Metodo,
			token: data.id,
			nombre: tokenParams.card.name,
			total: this.precioproductoqval,
			correo: this.pago_qval.Correo,
			tel: telefono,
			descripcion: this.productoqval,
			tiempo:this.datosgenerales[1]['anual']
		};
		this.send_pago(this.datos_pago)
	}, (error) => {
		this.spinner = false;
		swal('Error!', error.message_to_purchaser, 'error' );
	});
	
  }
}
  send_pago(pago){
	this.http.pago(pago)
	 .subscribe( datas => {
		this.spinner = false;
	 	if (datas['ok'] === 'succes') {
		swal('Exito!', 'Gracias por su compra,se han enviado las instrucciones para la activaciòn de la cuenta al correo electrònico', 'success');
		if(datas['pago']==="Transferencia"){
			swal({
				title: '<strong>Datos de Pago</strong>',
				type: 'info',
				html:
				  'Banco: '+ datas['Bank']+'<p>'+'CLABE: '+datas['CLABE']+'<p> Cantidad: $ '+datas['Cantidad']
				  + "<p> ID Orden: "+datas['ID_orden']+"<p> <strong>Una ves realizada la transferencia favor de mandar el comprobante a infoadmyo@admyo.com, con asunto: 'pago admyo' seguido del ID orden.</strong>",
				showCloseButton: true,
				showCancelButton: false,
				focusConfirm: false,
				confirmButtonText:
				  'Aceptar',				
			  })
		}else{
			swal('Exito!', 'Gracias por su compra,se han enviado las instrucciones para la activaciòn de la cuenta al correo electrònico', 'success');	
		}
		localStorage.removeItem('datos_pago_qval');
		//this.goto('');
		} else {
			swal('Error!', datas['error'], 'error');
	 	}
	 });
		
  }
	goto(ir){
		this.rote.navigateByUrl(ir)
	}

}

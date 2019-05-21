import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { Router} from '@angular/router'
import { RegistroService } from '../../services/registro.service';
import { RegistroInterface } from '../../models/registro-interface';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-registro2',
  templateUrl: './registro2.component.html',
  styleUrls: ['./registro2.component.scss']
})
export class Registro2Component implements OnInit,OnDestroy {
   @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
    @ViewChild('siccesSwal') private siccesSwal: SwalComponent;
  public registroi:RegistroInterface={
    Razon_Social:"",
    Nombre_Comercial:"",
    RFC:"",
    Tipo_Persona:"",
    Sector:"",
    SubSector:"",
    Rama:"",
    Nombre:"",
    Apellidos:"",
    Correo1:"",
    Correo2:"",
    Clave1:"",
    Clave2:"",
    Productoadmyo:"",
    Precioadmyo:"",
    ProductoQval:"",
    PrecioQval:"",
    NlicenasQval:"",
  }
	datosgenerales:any[]=[];
	producto:string="";
	precioproducto:number=0;
  productoqval:string="";
  precioproductoqval:number=0;
  licenciasqval:boolean=false;
  numlicqval:number=1;
  total:number=0;
  sectores:any[]=[];
  subsectores:any[]=[];
  ramas:any[]=[];
  spinner:boolean=false;
  textalert:string="";
  alertmsj:boolean=false;
  constructor(private router:Router,private http:RegistroService) {
  	if(localStorage.card_admyo){
  		this.datosgenerales=JSON.parse(localStorage.card_admyo);
  		this.selecttorproducto(this.datosgenerales["productos"]);
      this.seleccionarproductoqval(this.datosgenerales["productosqval"]);
      if(this.datosgenerales["datoscliente"]!==undefined){
        this.registroi=this.datosgenerales["datoscliente"];
      }
      this.total=this.precioproducto+this.precioproductoqval;
  	}else{
  		this.router.navigateByUrl('/preciosadmyo');
  	}
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
  mult(num){
    let totalmult=this.precioproductoqval*num;
    this.numlicqval=num;
    this.total=totalmult+this.precioproducto;
  }
  ngOnDestroy(){
    this.datosgenerales["datoscliente"]=this.registroi;
    this.datosgenerales["TotalPago"]=this.total;
    localStorage.setItem("card_admyo",JSON.stringify(this.datosgenerales));
  }
  ngOnInit() {
    this.spinner=true;
    this.http.getsector()
    .subscribe((data)=>{
      this.spinner=false;
      if(data["response"]["code"]===0){
        this.sectores=data["response"]["result"];
      }
    },(error)=>{
      this.spinner=false;
      console.log(error);
    })
  }
  subsector(){
    this.spinner=true;
    this.http.getsubsector(this.registroi.Sector)
    .subscribe((data)=>{
      this.spinner=false;
     if(data["response"]["code"]===0){
        this.subsectores=data["response"]["result"];
      }
    },(error)=>{
      this.spinner=false;
      console.log(error);
    })

  }
  rama(){
    this.spinner=true;
    this.http.getrama(this.registroi.SubSector)
    .subscribe((data)=>{
      this.spinner=false;
     if(data["response"]["code"]===0){
        this.ramas=data["response"]["result"];
      }
    },(error)=>{
      this.spinner=false;
      console.log(error);
    })

  }
  validar_rfc(rfc, aceptarGenerico = true){
    const re       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    var   validado = rfc.match(re);

    if (!validado)  //Coincide con el formato general del regex?
        return false;
    //Separar el dígito verificador del resto del RFC
    const digitoVerificador = validado.pop(),
          rfcSinDigito      = validado.slice(1).join(''),
          len               = rfcSinDigito.length,

    //Obtener el digito esperado
          diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
          indice            = len + 1;
    var   suma,
          digitoEsperado;

    if (len == 12) suma = 0
    else suma = 481; //Ajuste para persona moral

    for(var i=0; i<len; i++)
        suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
    digitoEsperado = 11 - suma % 11;
    if (digitoEsperado == 11) digitoEsperado = 0;
    else if (digitoEsperado == 10) digitoEsperado = "A";

    //El dígito verificador coincide con el esperado?
    // o es un RFC Genérico (ventas a público general)?
    if ((digitoVerificador != digitoEsperado)
     && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
        return false;
    else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
        return false;
    return rfcSinDigito + digitoVerificador;
  }
  enviarform(){

   $(".alerterror").removeClass("show")
    if(this.validar_rfc(this.registroi.RFC)===false){
      this.errorrfcSwal.show()
      return false;
    }
    this.spinner=true;
    this.registroi.NlicenasQval=this.numlicqval;
    this.registroi.Precioadmyo=this.precioproducto;
    this.registroi.Productoadmyo=this.datosgenerales["productos"];
    this.registroi.ProductoQval=this.datosgenerales["productosqval"];
    this.registroi.PrecioQval=this.precioproductoqval
   this.http.saveregister(this.registroi)
   .subscribe((data)=>{
     this.spinner=false;
    if(data["response"]["code"]!==0){  

      this.closealert(data["response"]["result"]);
    }else{
      if(this.total===0){
         this.siccesSwal.show();
      }else{
        this.router.navigateByUrl('/confirmarcompra');
      }
     
    }
   },(error)=>{
     this.spinner=false;
     this.closealert(error);
   })
  }
  closealert(texterror){
   $(".alerterror").addClass("show").addClass("show").html("<strong>Error!</strong><ul>"+texterror+'</ul> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>')  
        setTimeout(()=>{
   $(".alerterror").removeClass("show");
    },4000)
  }
}

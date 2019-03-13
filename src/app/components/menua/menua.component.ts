import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RegistroService } from '../../services/registro.service';
import { CookieService } from 'ngx-cookie-service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-menua',
  templateUrl: './menua.component.html',
  styleUrls: ['./menua.component.scss']
})
export class MenuaComponent implements OnInit {
   model: any = {};
   alertmsj:boolean=false;
  errortext:string="";
  textbotton:string="Ingresar"
  constructor(private route:Router,private cookieService: CookieService,private modalService: NgbModal,private http:RegistroService) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  ngOnInit() {
    if(this.cookieService.check('credeciales')){
     this.model=JSON.parse(this.cookieService.get('credeciales'));
    }
    
  }
  onSubmit() {
    this.textbotton="Procesando Datos";
    if(this.model.recordar){
      this.cookieService.set('credeciales',JSON.stringify(this.model));
    }
    this.alertmsj=false;
    this.http.login(this.model)
    .subscribe((data)=>{
      if(data["response"]["code"]===1990){
        this.alertmsj=true;
        this.errortext=data["response"]["result"];
      }else{
        if(data["response"]["datosusuario"]["Status"]==="0"){
          this.alertmsj=true;
          this.errortext="Su cuenta no esta activada se envio un correo electrónico con las instrucciones para activarla";
        }else{
          this.closemodel("content");
          this.cookieService.set('datosUsuario',JSON.stringify(data["response"]));
          this.route.navigateByUrl('/perfil');
        }
      }
      this.textbotton="Ingresar";
    },(error)=>{
      console.log(error);
    })
  }
closemodel(content){
    this.modalService.dismissAll(content);
  }
}

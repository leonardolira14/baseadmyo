import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router'

@Component({
  selector: 'app-chome',
  templateUrl: './chome.component.html',
  styleUrls: ['./chome.component.scss']
})
export class ChomeComponent implements OnInit {
  palabra = '';
  public modal_imagen=false;
  public modal_busqueda=false;
  public modal_productos=false;
  public modal_notificaciones=false;
  public modal_certificados=false;
  constructor(private route: Router) { }

  ngOnInit() {
  }
  buscar(){
    //console.log(this.palabra);
    this.route.navigateByUrl('/buscar/' + this.palabra );
  }
  goto(ir){
    this.route.navigateByUrl('/'+ir);
  }
}

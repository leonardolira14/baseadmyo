import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhomeComponent } from './pages/phome/phome.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { SalaComponent } from './pages/sala/sala.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PuntosComponent } from './pages/puntos/puntos.component';
import { Reg1Component } from './pages/reg1/reg1.component';
import { PaqueteqvalComponent } from './pages/paqueteqval/paqueteqval.component';
import { Reg2Component } from './pages/reg2/reg2.component';
import { Reg3Component } from './pages/reg3/reg3.component';
import { ImagenComponent } from './pages/imagen/imagen.component';
import { DatosusuarioComponent } from './pages/datosusuario/datosusuario.component';
import { DatosempresaComponent } from './pages/datosempresa/datosempresa.component';
import { ListausuariosComponent } from './pages/listausuarios/listausuarios.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CertificacionesComponent } from './pages/certificaciones/certificaciones.component';
import { VisitasComponent } from './pages/visitas/visitas.component';
import { AsociacionesComponent } from './pages/asociaciones/asociaciones.component';
import { FollowComponent } from './pages/follow/follow.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PerfilbuscadoComponent } from './pages/perfilbuscado/perfilbuscado.component';
import { PimagenComponent } from './pages/pimagen/pimagen.component';
import { DetalleimagenComponent } from './pages/detalleimagen/detalleimagen.component';
import { RiesgoComponent } from './pages/riesgo/riesgo.component';
import { ResumenComponent } from './pages/resumen/resumen.component';
import { ListaComponent } from './pages/lista/lista.component';
import { Lista2Component } from './pages/lista2/lista2.component'
import { RealizadasComponent } from './pages/realizadas/realizadas.component';
import {  CalificarComponent  } from './pages/calificar/calificar.component'
import { RecibidasComponent } from './pages/recibidas/recibidas.component';
import { DetallesriesgoComponent } from './pages/detallesriesgo/detallesriesgo.component';
import { PnotificacionesComponent } from './pages/pnotificaciones/pnotificaciones.component'
const appRoutes: Routes = [
  {path: '', component: PhomeComponent},
  {path: 'terminosycondiciones', component: TerminosComponent},
  {path: 'saladeprensa', component: SalaComponent},
  {path: 'puntosydescuentos', component: PuntosComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'preciosadmyo', component: Reg1Component},
   {path: 'preciosqval', component: PaqueteqvalComponent},
  {path: 'datosregistro', component: Reg2Component},
  {path: 'confirmarcompra', component: Reg3Component},
  {path: 'perfil', component: ImagenComponent},
  {path: 'datosempresa', component: DatosempresaComponent},
  {path: 'datosusuario', component: DatosusuarioComponent},
  {path: 'listausuarios', component: ListausuariosComponent},
  {path: 'productosyservicios', component: ProductosComponent},
  {path: 'certificaciones', component: CertificacionesComponent},
  {path: 'visitas', component: VisitasComponent},
  {path: 'asociaciones', component: AsociacionesComponent},
  {path: 'follow', component: FollowComponent},
  {path: 'buscar/:any', component: BuscarComponent},
  {path: 'buscar', component: BuscarComponent},
  {path: 'perfilbuscado/:any', component: PerfilbuscadoComponent},
  {path: 'imagen/:tipo/:fecha', component: PimagenComponent},
  {path: 'detalleimagen/:tipo/:fecha', component: DetalleimagenComponent},
  {path: 'riesgo/:tipo/:fecha', component: RiesgoComponent},
  {path: 'resumen/:tipo', component: ResumenComponent},
  {path: 'lista/:tipo', component: ListaComponent},
  {path: 'realizadas/:tipo', component: RealizadasComponent},
  {path: 'recibidas/:tipo', component: RecibidasComponent},
  {path: 'calificar/:tipo/:empresa', component: CalificarComponent},
  {path: 'calificar', component: CalificarComponent},
  {path: 'listan/:tipo', component: Lista2Component},
  {path: 'detallesriesgo/:tipo/:fecha', component: DetallesriesgoComponent },
  {path: 'notificaciones', component: PnotificacionesComponent }
  ];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

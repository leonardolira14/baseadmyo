import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { ChartsModule } from 'ng2-charts';
//style
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import {MatAutocompleteModule,MatStepperModule,MatButtonModule,MatTooltipModule,MatRadioModule, MatInputModule, MatListModule, MatSelectModule, MatCheckboxModule,MatDialogModule,MatCardModule,MatToolbarModule,MatIconModule} from '@angular/material';
import { PhomeComponent } from './pages/phome/phome.component';
import { MenuaComponent } from './components/menua/menua.component';
import { ChomeComponent } from './components/chome/chome.component';
import { FotteraComponent } from './components/fottera/fottera.component';
import { AppRoutingModule } from './app-routing.module';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { PuntosComponent } from './pages/puntos/puntos.component';
import { SalaComponent } from './pages/sala/sala.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { SearchbComponent } from './component/searchb/searchb.component';
import { Reg1Component } from './pages/reg1/reg1.component';
import { Reg2Component } from './pages/reg2/reg2.component';
import { Reg3Component } from './pages/reg3/reg3.component';
import { Registro1Component } from './component/registro1/registro1.component';
import { Registro2Component } from './component/registro2/registro2.component';
import { Registro3Component } from './component/registro3/registro3.component';
import { PreciosComponent } from './component/precios/precios.component';
import { PreciosqvalComponent } from './components/preciosqval/preciosqval.component';
import { PaqueteqvalComponent } from './pages/paqueteqval/paqueteqval.component';
import { MenubComponent } from './components/menub/menub.component';
import { CimagenComponent } from './component/cimagen/cimagen.component';
import { ImagenComponent } from './pages/imagen/imagen.component';
import { DatosusuarioComponent } from './pages/datosusuario/datosusuario.component';
import { DatosempresaComponent } from './pages/datosempresa/datosempresa.component';
import { CdatosusuarioComponent } from './components/cdatosusuario/cdatosusuario.component';
import { CdatosempresaComponent } from './components/cdatosempresa/cdatosempresa.component';
import { CdatoscontactoComponent } from './components/cdatoscontacto/cdatoscontacto.component';
import { CdatostelefonosComponent } from './components/cdatostelefonos/cdatostelefonos.component';
import { ClistausuariosComponent } from './components/clistausuarios/clistausuarios.component';
import { ListausuariosComponent } from './pages/listausuarios/listausuarios.component';
import { CproductosComponent } from './components/cproductos/cproductos.component';
import { CcertificacionesComponent } from './components/ccertificaciones/ccertificaciones.component';
import { CasociacionesComponent } from './components/casociaciones/casociaciones.component';
import { CnotificacionesComponent } from './components/cnotificaciones/cnotificaciones.component';
import { CvisitasComponent } from './components/cvisitas/cvisitas.component';
import { CfollowComponent } from './components/cfollow/cfollow.component';
import { FollowComponent } from './pages/follow/follow.component';
import { AsociacionesComponent } from './pages/asociaciones/asociaciones.component';
import { VisitasComponent } from './pages/visitas/visitas.component';
import { CertificacionesComponent } from './pages/certificaciones/certificaciones.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CbuscarComponent } from './components/cbuscar/cbuscar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PerfilbuscadoComponent } from './pages/perfilbuscado/perfilbuscado.component';
import { DatosgenComponent } from './cperfil/datosgen/datosgen.component';
import { CcimagenComponent } from './components/ccimagen/ccimagen.component';
import { CriesgoComponent } from './components/criesgo/criesgo.component';
import { PimagenComponent } from './pages/pimagen/pimagen.component';
import { RiesgoComponent } from './pages/riesgo/riesgo.component';
import { DetalleimagenComponent } from './pages/detalleimagen/detalleimagen.component';
import { CdetalleiamgenComponent } from './components/cdetalleiamgen/cdetalleiamgen.component';
import { CresumenComponent } from './components/cresumen/cresumen.component';
import { ResumenComponent } from './pages/resumen/resumen.component';
import { ListaComponent } from './pages/lista/lista.component';
import { RealizadasComponent } from './pages/realizadas/realizadas.component';
import { ClistaComponent } from './components/clista/clista.component';
import { CrealizadasComponent } from './components/crealizadas/crealizadas.component';
import { CalificarComponent } from './pages/calificar/calificar.component';
import { CcalificarComponent } from './components/ccalificar/ccalificar.component';
import { Clista2Component } from './components/clista2/clista2.component';
import { Lista2Component } from './pages/lista2/lista2.component';


@NgModule({
  declarations: [
    AppComponent,
    PhomeComponent,
    MenuaComponent,
    ChomeComponent,
    FotteraComponent,
    TerminosComponent,
    PuntosComponent,
    SalaComponent,
    ContactoComponent,
    SearchbComponent,
    Reg1Component,
    Reg2Component,
    Reg3Component,
    Registro1Component,
    Registro2Component,
    Registro3Component,
    PreciosComponent,
    PreciosqvalComponent,
    PaqueteqvalComponent,
    MenubComponent,
    CimagenComponent,
    ImagenComponent,
    DatosusuarioComponent,
    DatosempresaComponent,
    CdatosusuarioComponent,
    CdatosempresaComponent,
    CdatoscontactoComponent,
    CdatostelefonosComponent,
    ClistausuariosComponent,
    ListausuariosComponent,
    CproductosComponent,
    CcertificacionesComponent,
    CasociacionesComponent,
    CnotificacionesComponent,
    CvisitasComponent,
    CfollowComponent,
    FollowComponent,
    AsociacionesComponent,
    VisitasComponent,
    CertificacionesComponent,
    ProductosComponent,
    CbuscarComponent,
    BuscarComponent,
    PerfilbuscadoComponent,
    DatosgenComponent,
    CcimagenComponent,
    CriesgoComponent,
    PimagenComponent,
    RiesgoComponent,
    DetalleimagenComponent,
    CdetalleiamgenComponent,
    CresumenComponent,
    ResumenComponent,
    ListaComponent,
    RealizadasComponent,
    ClistaComponent,
    CrealizadasComponent,
    CalificarComponent,
    CcalificarComponent,
    Clista2Component,
    Lista2Component

  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,MatStepperModule,MatAutocompleteModule, MatCheckboxModule, MatRadioModule, AppRoutingModule,MatDialogModule,MatSelectModule,MatListModule,MatInputModule,MatTooltipModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule, 
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    ChartsModule,
    SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn'
        })
  ],
  providers: [CookieService ],
  bootstrap: [AppComponent],
  exports: [MatButtonModule, MatCheckboxModule],
})
export class AppModule { }

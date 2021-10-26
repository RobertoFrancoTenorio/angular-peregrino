import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from './../environments/environment';

import { AuthService } from './service/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { PacientesComponent } from './views/pacientes/pacientes.component';
import { ErrorAuthComponent } from './views/error/error-auth/error-auth.component';
import { LogoutComponent } from './views/logout/logout.component';

import { AgGridModule } from 'ag-grid-angular';
import { AddUsuarioComponent } from './views/usuarios/add-usuario/add-usuario.component';
import { UsuarioService } from './service/usuario/usuario.service';
import { AccionesUsuariosComponent } from './views/usuarios/acciones-usuarios/acciones-usuarios.component';
import { AddPacienteComponent } from './views/pacientes/add-paciente/add-paciente.component';
import { AccionesPacienteComponent } from './views/pacientes/acciones-paciente/acciones-paciente.component';

import { DoctoresComponent } from './views/doctores/doctores.component';
import {DoctorService } from './service/doctor/doctor.service';
import { AddDoctorComponent } from './views/doctores/add-doctor/add-doctor.component';
import { AccionesDoctoresComponent } from './views/doctores/acciones-doctores/acciones-doctores.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarComponent } from './views/calendar/calendar.component';
import { ModalEditPacComponent } from './views/pacientes/modal-edit-pac/modal-edit-pac.component';

import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { HistoriaClinicaComponent } from './views/historia-clinica/historia-clinica.component';
import { HeredoFamiliaresComponent } from './views/historia-clinica/heredo-familiares/heredo-familiares.component';
import { MulticheckboxComponent } from './views/historia-clinica/multicheckbox/multicheckbox.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    AppAsideModule,
    HttpClientModule,
    AppBreadcrumbModule.forRoot(),
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    AppFooterModule,
    ModalModule.forRoot(),
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  //  FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    UsuariosComponent,
    PacientesComponent,
    ErrorAuthComponent,
    LogoutComponent,
    AddUsuarioComponent,
    AccionesUsuariosComponent,
    DoctoresComponent,
    AddDoctorComponent,
    AccionesDoctoresComponent,
    AddPacienteComponent,
    AccionesPacienteComponent,
    CalendarComponent,
    ModalEditPacComponent,
    HistoriaClinicaComponent,
    HeredoFamiliaresComponent,
    MulticheckboxComponent

  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    AuthService,
    UsuarioService,
    DoctorService,
    BsModalRef
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localEs, 'es')

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

import { MatStepperModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatChipsModule } from '@angular/material';
import { MatIconModule } from '@angular/material'
import {MatDatepickerModule} from '@angular/material/datepicker';

import { CollapseModule } from 'ngx-bootstrap/collapse';

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
import { CalendarioComponent } from './views/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridWeek from '@fullcalendar/timegrid';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ModalInfoPacComponent } from './views/pacientes/modal-info-pac/modal-info-pac.component'
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
  timeGridWeek
]);
import { AddCitaComponent } from './views/citas/add-cita/add-cita.component';
import { CitasComponent } from './views/citas/citas.component';
import { ModalConsultaComponent } from './views/citas/modal-consulta/modal-consulta.component';
import { ConsultaComponent } from './views/citas/consulta/consulta.component';
import { ConsultasComponent } from './views/citas/consultas/consultas.component';
import { AccionesConsultaComponent } from './views/citas/acciones-consulta/acciones-consulta.component';
import { ModalInfoConsultaComponent } from './views/citas/modal-info-consulta/modal-info-consulta.component';
import { AccionesCitaComponent } from './views/citas/acciones-cita/acciones-cita.component';
import { TablaPacientesComponent } from './views/pacientes/tabla-pacientes/tabla-pacientes.component';
import { HistoriaClinicaComponent } from './views/pacientes/historia-clinica/historia-clinica.component';

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
    NgSelectModule,
    AppBreadcrumbModule.forRoot(),
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    AppFooterModule,
    ModalModule.forRoot(),
    FullCalendarModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatChipsModule,
    CollapseModule,
    MatDatepickerModule
    //Stepper
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
    CalendarioComponent,
    ModalInfoPacComponent,
    AddCitaComponent,
    CitasComponent,
    ModalConsultaComponent,
    ConsultaComponent,
    ConsultasComponent,
    AccionesConsultaComponent,
    ModalInfoConsultaComponent,
    AccionesCitaComponent,
    TablaPacientesComponent,
    HistoriaClinicaComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: LOCALE_ID, useValue: 'es'
    },
    IconSetService,
    AuthService,
    UsuarioService,
    DoctorService,
    BsModalRef,
    DatePipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
declare let $: any;
import { AuthService } from '../../service/auth/auth.service'
import { CitaService } from '../../service/cita/cita.service'
import { UsuarioService } from '../../service/usuario/usuario.service'
import { BsModalRef } from 'ngx-bootstrap';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit {
  id: string

  length: number;
  asignadas: number;
  pendientes: number;
  totales: number;

  displayEvent: any;
  band = {};
  citasTotales = {};
  calendarOptions: CalendarOptions;

  constructor(private AuthService: AuthService,
              private CitaService: CitaService,
              private UsuarioService: UsuarioService,
              private BsModalRef: BsModalRef)
  {
  }


  async ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: esLocale,
      //editable: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
      },
      dateClick: this.handleDateClick.bind(this), // bind is important!
      selectable: true,
      eventClick: function(arg){
        this.displayEvent = {
          event: {
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
          },
        }
        console.log('Tipo de dato de arg', arg.event.start)
      }
    }
    this.DeterminaUsuario()
  }

  handleDateClick(arg) {
    console.log(arg)
  }

  eventClick(model: any){
    model = {
      event: {
        title: model.event.title,
        start: model.event.start,
        end: model.event.end,
      }
    }
    console.log(model)
  }

  DeterminaUsuario(){
  this.UsuarioService.determinaUsuario(this.AuthService.currentUserId).subscribe(user => {
      this.band = user;
      this.getConsultas(this.band[0].is_Doctor)
    });
  }

  getConsultas(respuesta: string){
    if(respuesta == 'Si'){
      this.consultasDoctor()
    }
    else{
      this.consultasOtros();
    }
  }

  consultasDoctor(){
    this.CitaService.getCitasDoctor(this.AuthService.currentUserId).subscribe(citas => {
      this.totales = citas.length;
      this.citasTotales = citas;
      this.calendarOptions.events = this.citasTotales
      this.calendarOptions.dateClick = this.eventClick
      console.log(this.citasTotales)
    })
    this.CitaService.getCitasAsignadasDoctor(this.AuthService.currentUserId).subscribe(citas =>{
      this.asignadas = citas.length
    })
    this.CitaService.getCitasPendientesDoctor(this.AuthService.currentUserId).subscribe(citas =>{
      this.pendientes = citas.length
    })
  }

  consultasOtros(){
    this.CitaService.getCitasTotales().subscribe(citas => {
      this.totales = citas.length;
      this.citasTotales = citas;
      this.calendarOptions.events = this.citasTotales

      console.log(this.citasTotales)
    })
    this.CitaService.getCitasAsignadas().subscribe(citas =>{
      this.asignadas = citas.length
    })
    this.CitaService.getCitasPendientes().subscribe(citas =>{
      this.pendientes = citas.length
    })
  }
}

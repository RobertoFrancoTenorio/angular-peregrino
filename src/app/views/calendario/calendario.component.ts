import { Component, OnInit, TemplateRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
declare let $: any;
import { AuthService } from '../../service/auth/auth.service'
import { CitaService } from '../../service/cita/cita.service'
import { UsuarioService } from '../../service/usuario/usuario.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit {
  id: string
  private modalRef?: BsModalRef;

  length: number;
  asignadas: number;
  pendientes: number;
  totales: number;
  rechazadas: number;
  finalizadas: number;

  displayEvent: any;
  band = {};
  citasTotales = {};
  calendarOptions: CalendarOptions;

  constructor(private AuthService: AuthService,
              private CitaService: CitaService,
              private UsuarioService: UsuarioService,
              private modalService: BsModalService)
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
      eventClick: this.eventClick.bind(this), // bind is important!
    }
    this.DeterminaUsuario()
  }

  handleDateClick(arg) {
    console.log(arg)
  }

  eventClick(model: any){
    this.displayEvent = model.event._def
    console.log(this.displayEvent.extendedProps.currentCita.estatus)
    if(this.displayEvent.extendedProps.currentCita.estatus == 'pendiente'){
      Swal.fire({
        title: '¿Desea aceptar la consulta?',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('La cita ha sido aceptada con éxito!', '', 'success')
          this.displayEvent.extendedProps.currentCita.estatus = 'asignada'
          console.log(this.displayEvent.extendedProps)
          console.log('Resultado', this.displayEvent.extendedProps.currentCita.estatus)
          this.CitaService.updateCita(this.displayEvent.extendedProps.currentCita)
          console.log('ResultadoActualizado', this.displayEvent.extendedProps.currentCita.estatus)

        } else if (result.isDenied) {
          Swal.fire('La cita ha sido rechazada', '', 'error')
          this.displayEvent.extendedProps.currentCita.estatus = 'rechazada'
          console.log(this.displayEvent.extendedProps)
          console.log('Resultado', this.displayEvent.extendedProps.currentCita.estatus)
          this.CitaService.updateCita(this.displayEvent.extendedProps.currentCita)
          console.log('ResultadoActualizado', this.displayEvent.extendedProps.currentCita.estatus)

        }
      })
    }
    if(this.displayEvent.extendedProps.currentCita.estatus == 'asignada'){
      Swal.fire({
        title: '¿Desea marcar como realizada la cosulta?',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('La cita ha concluido!', '', 'success')
          this.displayEvent.extendedProps.currentCita.estatus = 'terminada'
          console.log(this.displayEvent.extendedProps)
          console.log('Resultado', this.displayEvent.extendedProps.currentCita.estatus)
          this.CitaService.updateCita(this.displayEvent.extendedProps.currentCita)
        } else if (result.isDenied) {
          Swal.fire('La cita ha sido rechazada', '', 'error')
          this.displayEvent.extendedProps.currentCita.estatus = 'rechazada'
          console.log(this.displayEvent.extendedProps)
          console.log('Resultado', this.displayEvent.extendedProps.currentCita.estatus)
        }
      })
    }
    if(this.displayEvent.extendedProps.currentCita.estatus == 'rechazada'){
      Swal.fire({
        title: '¿Desea marcar como realizada la cosulta?',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Aquí va a abrir un modal')
        }
      })
    }
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
    this.CitaService.getCitasDoctor(this.AuthService.currentUserId).subscribe(citas => {;
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
    this.CitaService.getCitasRechazadas().subscribe(citas =>{
      this.rechazadas = citas.length
    })
    this.CitaService.getCitasFinalizadas().subscribe(citas =>{
      this.finalizadas = citas.length
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}

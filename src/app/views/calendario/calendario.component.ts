import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service'
import { CitaService } from '../../service/cita/cita.service'
import { UsuarioService } from '../../service/usuario/usuario.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalConsultaComponent } from '../citas/modal-consulta/modal-consulta.component'
import { PacienteService } from '../../service/paciente/paciente.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit {
  id: string
  modalRef: BsModalRef;

  aceptadas: number;
  asignadas: number;
  atendidas: number;
  totales: number;

  displayEvent: any;
  citasTotales = {};
  calendarOptions: CalendarOptions;

  constructor(private AuthService: AuthService,
              private CitaService: CitaService,
              private UsuarioService: UsuarioService,
              private modalService: BsModalService,
              private PacienteService: PacienteService,
              public DatePipe: DatePipe,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
      },
      dateClick: this.handleDateClick.bind(this), // bind is important!
      selectable: true,
      eventClick: this.eventClick.bind(this), // bind is important!
    }
    this.getConsultas();
  }

  handleDateClick(arg) {
    console.log(arg)
  }

  eventClick(model: any) {
    this.displayEvent = model.event._def
    /*console.log('Detalles cita', this.displayEvent.extendedProps.currentCita.estatus)
    console.log('Detalles paciente', this.displayEvent.extendedProps.currentCita.detPaciente)*/
    if (this.displayEvent.extendedProps.currentCita.estatus == 'asignada') {
      Swal.fire({
        title: '¿Qué desea realizar con esta consulta?',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aceptar Consulta',
        denyButtonText: 'Cancelar Consulta',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('La cita ha sido aceptada con éxito!', '', 'success')
          this.displayEvent.extendedProps.currentCita.estatus = 'aceptada'
          this.CitaService.updateCita(this.displayEvent.extendedProps.currentCita)

        } else if (result.isDenied) {
          Swal.fire({
            title: 'Ingrese el motivo por el cual se ha rechazado esta cita',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            input: "text",
            inputValidator: motivo => {
              // Si el valor es válido, debes regresar undefined. Si no, una cadena
              if (!motivo) {
                return "Por favor escribe el motivo del rechazo";
              } else {
                return undefined;
              }
            }
          }).then((result) => {
            if (result.isConfirmed) {
              if (result.value) {
                let motivo = result.value;
                console.log("Hola, " + motivo);
                this.UsuarioService.getUserData(this.AuthService.currentUserId).subscribe(user => {
                let data = { motivo: motivo, idUser: this.AuthService.currentUserId, usuario: user[0]['currentUser'], accion: 'Rechazo', f_rechazo: new Date()}
                this.displayEvent.extendedProps.currentCita.estatus = 'rechazada';
                this.displayEvent.extendedProps.currentCita.historial.push(data);
                this.CitaService.updateCita(this.displayEvent.extendedProps.currentCita)
                })
              }
              Swal.fire('Ok, esta cita ha sido cancelada!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Ok, esta cita no ha sido cancelada', '', 'info')
            }
          })
        }
      })
    }
    if (this.displayEvent.extendedProps.currentCita.estatus == 'aceptada') {
      Swal.fire({
        title: '¿Desea realizar la cosulta?',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.isConfirmed) {
          //Swal.fire('La cita ha concluido!', '', 'success')
          this.launchModal();
          this.pasaInfo();
          //this.displayEvent.extendedProps.currentCita.estatus = 'aceptada'
          //this.CitaService.updateCita(this.displayEvent.extendedProps.currentCita)
        }
      })
    }
  }
  pasaInfo() {

  }

  getConsultas() {
    this.consultasDoctor()
  }

  consultasDoctor() {
    this.CitaService.getCitasDoctor(this.AuthService.currentUserId).subscribe(citas => {
      this.totales = citas.length;
      this.citasTotales = citas;
      this.calendarOptions.events = this.citasTotales
      this.calendarOptions.dateClick = this.eventClick
    })
    this.CitaService.getCitasAsignadasDoctor(this.AuthService.currentUserId).subscribe(citas => {
      //console.log('Citas', citas);
      this.asignadas = citas.length
    })
    this.CitaService.getCitasAtendidas(this.AuthService.currentUserId).subscribe(citas => {
      this.atendidas = citas.length
    })
    this.CitaService.getAceptadas(this.AuthService.currentUserId).subscribe(citas => {
      this.aceptadas = citas.length
    })
  }

  launchModal(){
    const initialState = {
      currentCita: this.displayEvent.extendedProps,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-xl'
    };

    this.modalRef = this.modalService.show(ModalConsultaComponent, {
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-dialog-centered', initialState
    });
  }

}

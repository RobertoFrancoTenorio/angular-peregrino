import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../../service/doctor/doctor.service';
import moment from 'moment';
import { CitaService } from '../../../service/cita/cita.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../service/auth/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.component.html',
  styleUrls: ['./add-cita.component.scss']
})
export class AddCitaComponent implements OnInit {
  done: boolean = true;
  bandCita = false;
  fechaCita: any;
  basePath;
  citaForm: FormGroup;

  bsInlineValue = new Date();
  doctorList: any[] = [];

  minDate: Date;
  date_select: any;
  date_ini: any;
  date_fin: any;
  currentDoctor: any = null;
  drName: any = null;
  @Input() currentPaciente: any = null;
  @Input() currentCita: any = null;
  @Output() cerrarModal: EventEmitter<any> = new EventEmitter<any>();
  bandCalendar

  horarios = [
    {
      idHorario: '08010830',
      hora_inicio: "08:01",
      hora_fin: "08:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '08310900',
      hora_inicio: "08:31",
      hora_fin: "09:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    },
    {
      idHorario: '09010930',
      hora_inicio: "09:01",
      hora_fin: "09:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '09311000',
      hora_inicio: "09:31",
      hora_fin: "10:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '10011030',
      hora_inicio: "10:01",
      hora_fin: "10:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '10311100',
      hora_inicio: "10:31",
      hora_fin: "11:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '11011130',
      hora_inicio: "11:01",
      hora_fin: "11:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '11311200',
      hora_inicio: "11:31",
      hora_fin: "12:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '12011230',
      hora_inicio: "12:01",
      hora_fin: "12:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '12311300',
      hora_inicio: "12:31",
      hora_fin: "13:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '13011330',
      hora_inicio: "13:01",
      hora_fin: "13:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '13311400',
      hora_inicio: "13:31",
      hora_fin: "14:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '14011430',
      hora_inicio: "14:01",
      hora_fin: "14:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '14311500',
      hora_inicio: "14:31",
      hora_fin: "15:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '15011530',
      hora_inicio: "15:01",
      hora_fin: "15:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '15311600',
      hora_inicio: "15:31",
      hora_fin: "16:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '16011630',
      hora_inicio: "16:01",
      hora_fin: "16:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '16311700',
      hora_inicio: "16:31",
      hora_fin: "17:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '17011730',
      hora_inicio: "17:01",
      hora_fin: "17:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '17311800',
      hora_inicio: "17:31",
      hora_fin: "18:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '18011830',
      hora_inicio: "18:01",
      hora_fin: "18:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '18311900',
      hora_inicio: "18:31",
      hora_fin: "19:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '19011930',
      hora_inicio: "19:01",
      hora_fin: "19:30",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    }, {
      idHorario: '19312000',
      hora_inicio: "19:31",
      hora_fin: "20:00",
      visible: false,
      estatus: 'libre',
      paciente: 'Horario libre'
    },
  ]
  bandHorario: boolean = false;
  prueba: any;
  hIni: any;
  hFin: any
  @Output() citaSave: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private docService: DoctorService,
    private citaServ: CitaService,
    public datepipe: DatePipe,
    private auth: AuthService,
    public modalRef: BsModalRef,
  ) {
    this.citaForm = this.fb.group({
      idDoctor: [null, Validators.required],
      cita_fecha: [null, Validators.required],
    });
  }

  ngOnInit() {
    new Promise<void>((resolve) => {
      this.docService.getDoctorsListActive().subscribe(dataDocs => {
        this.doctorList = dataDocs;
        console.log(dataDocs);
        resolve();
      })
    })

    this.minDate = new Date();
    this.done = true;
    if(this.currentCita != null){
      console.log('Current Cita', this.currentCita.currentCita)
      this.fechaCita = this.datepipe.transform(this.currentCita.currentCita.f_cita.toDate(), 'yyyy-MM-dd');
      console.log('cita', this.fechaCita)
    }
    this.onChanges();
    console.log(this.currentDoctor)
  }

  onChanges(): void {
    this.citaForm.get('idDoctor').valueChanges.subscribe(val => {
      console.log('Val', val)
      if (val) {
        this.currentDoctor = this.doctorList.filter(d => d.id == val)[0];
        this.docService.getDoctorName(this.currentDoctor.id).subscribe(data => {
          this.drName = data[0]['doc_nombre_completo']
          console.log('Nombre', this.drName)
        })
      }
      else this.currentDoctor = null;
      this.printCalendar();
    });

    this.citaForm.get('cita_fecha').valueChanges.subscribe(val => {
      this.date_select = this.datepipe.transform(new Date(val), 'yyyy-MM-dd');
      this.date_ini = new Date(this.date_select + ' 00:30')
      this.date_fin = new Date(this.date_select + ' 23:30')
      console.log(this.date_ini)
      console.log(this.date_fin)
      this.printCalendar();
    });
  }

  async printCalendar() {
    this.bandHorario = false;
    if (this.citaForm.get('cita_fecha').value != null && this.citaForm.get('idDoctor').value != null) {
      var doc_hora_inicio = moment(this.currentDoctor.doc_horario_ini, 'hh:mm');
      var doc_hora_fin = moment(this.currentDoctor.doc_horario_fin, 'hh:mm');

      var idsHorarios = []
      await new Promise<void>((resolve) => {
        this.citaServ.getCitasDiaDoctor(this.currentDoctor.id, this.date_ini, this.date_fin).subscribe(dataCitas => {
          console.log(dataCitas)
          for (let c of dataCitas) {
            idsHorarios.push(c['idHorario'])
          }
          for (let h of this.horarios) {
            h.visible = false;
            var hora1 = moment(h.hora_inicio, 'hh:mm')
            var hora2 = moment(h.hora_fin, 'hh:mm')
            if (hora1.isBetween(doc_hora_inicio, doc_hora_fin) && hora2.isBetween(doc_hora_inicio, doc_hora_fin)) {
              h.visible = true;
              if (idsHorarios.includes(h.idHorario)) {
                h.estatus = "Horario ocupado"
                h.paciente = dataCitas.filter(c => c['idHorario'] == h.idHorario)[0]['detPaciente']['nombre']
              }
            } else h.visible = false;
          }
          resolve();
        })
      })
      this.bandHorario = true;
    } else {
      this.bandHorario = false;
    }
  }

  async crearCita(horario) {
    Swal.fire({
      title: 'Ingresar el método de comunicarse con el paciente',
      text: 'Puede ser teléfono de casa, celular, whatsapp, etc...',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      input: "text",
      inputValidator: comentario => {
        if (!comentario) {
          return "Por favor escribe los comentarios generales de la cita.";
        } else {
          return undefined;
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (result.value) {
          let comentario = result.value;
          Swal.fire({
            title: 'Registrando cita',
            text: 'Los datos de la cita estan ciendo almacenados',
            icon: 'info',
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
          let citaData = {
            idDoctor: this.currentDoctor.id,
            idPaciente: this.currentPaciente.id,
            detDoctor: {
              id: this.currentDoctor.id,
              nombre: this.currentDoctor.doc_nombre_completo
            },
            detPaciente: {
              id: this.currentPaciente.id,
              nombre: this.currentPaciente.pac_nombre_completo,
              celular: this.currentPaciente.pac_celular,
              email:this.currentPaciente.pac_email,
              telefono:this.currentPaciente.pac_telefono
            },
            f_cita: new Date(this.date_select + ' ' + horario.hora_inicio),
            idHorario: horario.idHorario,
            cita_hora_ini: horario.hora_inicio,
            cita_hora_fin: horario.hora_fin,
            estatus: 'asignada',
            comentarios: comentario,
            historial: [
              {
                idUser: this.auth.currentUserId,
                motivo: 'Creacion de cita',
                accion: 'Crear',
                f_accion: new Date(),
                userName: this.auth.userData.userName
              }
            ]
          }
          console.log(citaData);
          await this.citaServ.crearCita(citaData);
          Swal.close();
          Swal.fire({
            title: 'Cita registrada',
            text: 'La cita ha sido registrada correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          .then(() => {
            this.citaForm.reset();
            this.citaSave.emit({ citaSave: true })
            return false;
          })
        }
      }
    });
  }

  actualizarCita(horario){
    console.log('actualiza cita metodo')
    Swal.fire(
      'Registro completo',
      'La cita ha sido reagendada correctamente',
      'success'
    );
    this.currentCita.currentCita.idDoctor = this.currentDoctor.id;
    this.currentCita.currentCita.idPaciente = this.currentCita.currentCita.detPaciente.id;
    this.currentCita.currentCita.detDoctor.id = this.currentDoctor.id;
    this.currentCita.currentCita.detDoctor.nombre = this.drName;
    let detPaciente = {
      id: this.currentCita.currentCita.detPaciente.id,
      nombre: this.currentCita.currentCita.detPaciente.nombre,
      celular: this.currentCita.currentCita.detPaciente.celular,
      email:this.currentCita.currentCita.detPaciente.email,
      telefono:this.currentCita.currentCita.detPaciente.telefono
    }
    this.currentCita.currentCita.detPaciente = detPaciente;
    this.currentCita.currentCita.f_cita = new Date(this.date_select + ' ' + horario.hora_inicio);
    this.currentCita.currentCita.idHorario = horario.idHorario

    const historial =
    {
      idUser: this.auth.currentUserId,
      motivo: 'cita reagendaa',
      accion: 'asignar nueva cita',
      f_accion: new Date(),
      userName: this.auth.userData.userName,
      DetalleCita: {
        CitaAnterior: {
          cita_hora_ini: this.currentCita.currentCita.cita_hora_ini,
          cita_hora_fin: this.currentCita.currentCita.cita_hora_fin,
          idHorario: this.currentCita.currentCita.idHorario,
          f_cita: this.currentCita.currentCita.f_cita
        },
        CitaActual: {
          idHorario: horario.idHorario,
          cita_hora_ini: horario.hora_inicio,
          cita_hora_fin: horario.hora_fin,
          f_cita: new Date(this.date_select + ' ' + horario.hora_inicio),
        }
      }
    }
    this.currentCita.currentCita.cita_hora_ini = horario.hora_inicio
    this.currentCita.currentCita.cita_hora_fin = horario.hora_fin
    this.currentCita.currentCita.estatus = 'asignada'
    this.currentCita.currentCita.historial.push(historial);
    this.citaServ.updateCita(this.currentCita.currentCita);
    this.modalRef.hide();
  }

  loadInfo(){
  }

  close(){
    this.cerrarModal.emit({ cerrar: true })
  }
}

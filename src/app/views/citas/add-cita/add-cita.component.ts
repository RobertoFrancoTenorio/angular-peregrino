import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../../service/doctor/doctor.service';
import moment from 'moment';
import { CitaService } from '../../../service/cita/cita.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
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

  currentDoctor: any = null;
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
    private router: Router,
    private modalService: BsModalService
  ) {
    this.citaForm = this.fb.group({
      idDoctor: [null, Validators.required],
      cita_fecha: [null, Validators.required],
    });
  }

  async ngOnInit() {
    await new Promise<void>((resolve) => {
      this.docService.getDoctorsListActive().subscribe(dataDocs => {
        this.doctorList = dataDocs;
        console.log(dataDocs);
        resolve();
      })
    })

    this.minDate = new Date();
    this.done = true;

    this.onChanges();
  }

  onChanges(): void {
    this.citaForm.get('idDoctor').valueChanges.subscribe(val => {
      console.log(val)
      if (val) {
        this.currentDoctor = this.doctorList.filter(d => d.id == val)[0];
      }
      else this.currentDoctor = null;

      this.printCalendar();
    });

    this.citaForm.get('cita_fecha').valueChanges.subscribe(val => {
      this.date_select=this.datepipe.transform(new Date(val), 'yyyy-MM-dd')
      this.printCalendar();
    });

  }

  printCalendar() {
    this.bandHorario = false;
    if (this.citaForm.get('cita_fecha').value != null && this.citaForm.get('idDoctor').value != null) {
      var doc_hora_inicio = moment(this.currentDoctor.doc_horario_ini, 'hh:mm')
      var doc_hora_fin = moment(this.currentDoctor.doc_horario_fin, 'hh:mm')
      for (let h of this.horarios) {
        h.visible = false;
        var hora1 = moment(h.hora_inicio, 'hh:mm')
        var hora2 = moment(h.hora_fin, 'hh:mm')
        console.log(h.hora_inicio)
        console.log(hora1.isBetween(doc_hora_inicio, doc_hora_fin) + ' --- ' + hora2.isBetween(doc_hora_inicio, doc_hora_fin));
        if (hora1.isBetween(doc_hora_inicio, doc_hora_fin) && hora2.isBetween(doc_hora_inicio, doc_hora_fin)) {
          console.log('visible')
          h.visible = true;
        } else h.visible = false;
      }
      console.log(this.horarios);
      this.bandHorario = true;
    } else {
      this.bandHorario = false;
    }
  }

  async crearCita(horario) {
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

    console.log(String(this.citaForm.value['cita_fecha']).substring(0,10)+' '+horario.hora_inicio);
    let citaData = {
      idDoctor: this.currentDoctor.id,
      idPaciente: this.currentPaciente.id,
      detDoctor: {
        id: this.currentDoctor.id,
        nombre: this.currentDoctor.doc_nombre_completo
      },
      detPaciente: {
        id: this.currentPaciente.id,
        nombre: this.currentPaciente.pac_nombre_completo
      },
      f_cita: new Date(this.date_select+' '+horario.hora_inicio),
      idHorario: horario.idHorario,
      cita_hora_ini: horario.hora_inicio,
      cita_hora_fin: horario.hora_fin,
      estatus: 'asignada',
    }

    console.log(citaData);
    /*
    ↓↓↓Esta parte recibe el formulario y lo pasa como parametro
    al servicio en su metodo crearDoctor↓↓↓*/
    await this.citaServ.crearCita(citaData);
    /*Ejecución de Sweet Alert con los parametros necesarios*/

    Swal.close();

    Swal.fire({
      title: 'Cita registrada',
      text: 'La cita ha sido registrada correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    })
      /*Una vez ejecutado el Sweet alert limpia el formulario
      y redirige al componente de doctores*/
      .then(() => {
        this.citaForm.reset();
        //this.router.navigate(['doctores']);
        this.citaSave.emit({ citaSave: true })
        return false;
      })
  }

  loadInfo(){
    this.citaForm.patchValue({
    })
  }

  close(){
    this.cerrarModal.emit({ cerrar: true })
  }

}

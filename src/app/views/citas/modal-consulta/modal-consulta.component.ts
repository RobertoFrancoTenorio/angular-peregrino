import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { CitaService } from '../../../service/cita/cita.service'
import { UsuarioService } from '../../../service/usuario/usuario.service'
import { AuthService } from '../../../service/auth/auth.service'
import { PacienteService } from '../../../service/paciente/paciente.service';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-consulta',
  templateUrl: './modal-consulta.component.html',
  styleUrls: ['./modal-consulta.component.scss']
})
export class ModalConsultaComponent implements OnInit {
  @Input() currentCita: any = null;
  fechaConsulta : any;
  currentPaciente: any

  constructor(
    public modalRef: BsModalRef,
    public DatePipe: DatePipe,
    private AuthService: AuthService,
    private UsuarioService: UsuarioService,
    private CitaService: CitaService,
    private router: Router,
    private PacienteService: PacienteService,
  ) {

  }

  ngOnInit(): void {
    console.log(this.currentCita.currentCita)
    this.fechaConsulta = this.DatePipe.transform(this.currentCita.currentCita.f_cita.toDate(), 'yyyy-MM-dd');
    console.log(this.fechaConsulta)
    this.PacienteService.getPacienteInfo(this.currentCita.currentCita.detPaciente.id).subscribe(data =>{
      this.currentPaciente = data;
    })
  }

  cerrarModal() {
    this.modalRef.hide();
  }

  sinRespuesta(){
    console.log('Activado')
    /*this.UsuarioService.getUserData(this.AuthService.currentUserId).subscribe(user => {
      let data =
      { motivo: 'No hubo respuesta', idUser: this.AuthService.currentUserId,
        usuario: user[0]['currentUser'], accion: 'reagendada', f_rechazo: new Date()
      }
      this.currentCita.currentCita.historial.push(data)
      this.CitaService.updateCita(this.currentCita.currentCita)
    })*/

    Swal.fire({
      title: 'Reagendar cita',
      text: "Ingrese el motivo por el cual se debe reagendar la cita (el paciente no contesta, no obtuvo respuesta, etc...)",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      input: "text",
      inputValidator: motivo => {
        // Si el valor es válido, debes regresar undefined. Si no, una cadena
        if (!motivo) {
          return "Motivo para reagendar la consulta";
        } else {
          return undefined;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          let motivo = result.value;
          let data = { motivo: motivo, idUser: this.AuthService.currentUserId, usuario: this.AuthService.userData.userName, accion: 'Reagendar', f_accion: new Date()}
          this.currentCita.currentCita.estatus = 'reagendar';
          this.currentCita.currentCita.historial.push(data)
          console.log('Cita que se va a enviar', this.currentCita.currentCita)
          this.CitaService.updateCita(this.currentCita.currentCita)
        }
        Swal.fire('Ok, esta cita ha sido cancelada!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Ok, esta cita no ha sido cancelada', '', 'info')
      }
    })
    this.modalRef.hide();
  }

  realizarConsulta(){
    const navigationExtras: NavigationExtras = {
      state: {
        citaData: this.currentCita.currentCita,
        pacienteData: this.currentPaciente,
        currentCita: this.currentCita.currentCita,
      }
    };
    this.modalRef.hide();
    this.router.navigate(['consulta'], navigationExtras);
  }

}

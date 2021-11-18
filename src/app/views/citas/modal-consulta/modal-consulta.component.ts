import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { CitaService } from '../../../service/cita/cita.service'
import { UsuarioService } from '../../../service/usuario/usuario.service'
import { AuthService } from '../../../service/auth/auth.service'


import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-consulta',
  templateUrl: './modal-consulta.component.html',
  styleUrls: ['./modal-consulta.component.scss']
})
export class ModalConsultaComponent implements OnInit {
  @Input() currentCita: any = null;
  fechaConsulta : any;

  constructor(
    public modalRef: BsModalRef,
    public DatePipe: DatePipe,
    private AuthService: AuthService,
    private UsuarioService: UsuarioService,
    private CitaService: CitaService,

  ) {

  }

  ngOnInit(): void {
    console.log(this.currentCita.currentCita)
    this.fechaConsulta = this.DatePipe.transform(this.currentCita.currentCita.f_cita.toDate(), 'yyyy-MM-dd');
    console.log(this.fechaConsulta)
  }

  cerrarModal() {
    this.modalRef.hide();
  }

  sinRespuesta(){
    console.log('Activado')
    this.currentCita.currentCita.estatus = 'reagendada';
    this.UsuarioService.getUserData(this.AuthService.currentUserId).subscribe(user => {
      let data =
      { motivo: 'No hubo respuesta', idUser: this.AuthService.currentUserId,
        usuario: user[0]['currentUser'], accion: 'reagendada', f_rechazo: new Date()
      }
      this.currentCita.currentCita.historial.push(data)
      this.CitaService.updateCita(this.currentCita.currentCita)
    })

    Swal.fire({
      title: 'Cita reagendada',
      text: "Esta cita será reagendada por una asistente!",
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    })
    this.modalRef.hide();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../../../service/consulta/consulta.service';
import { CitaService } from '../../../service/cita/cita.service'
import { AuthService } from '../../../service/auth/auth.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  currentConsulta;
  currentPaciente = null;
  currentUsuario;
  edad;
  currentFecha = new Date();
  fechaHoy;

  consultaForm : FormGroup
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    public DatePipe: DatePipe,
    private fb: FormBuilder,
    private ConsultaService: ConsultaService,
    private CitaService: CitaService,
  ) {
    this.fechaHoy = this.DatePipe.transform(this.currentFecha.toDateString(), 'yyyy-MM-dd' );
    if(this.router.getCurrentNavigation() != null){
      this.route.queryParams.subscribe(async params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.currentConsulta = this.router.getCurrentNavigation().extras.state.citaData;
          this.currentPaciente = this.router.getCurrentNavigation().extras.state.pacienteData;
          console.log(this.currentPaciente)
        }
        else{
          this.currentConsulta = null;
          console.log('Nada')
        }
      });
    }
    else{
      this.currentConsulta = null;
      console.log('getcurrentnavigator vacio');
    }
  }

  ngOnInit(): void {
    this.consultaForm = this.fb.group({
      consulta_pac_nombre: this.currentPaciente.nombres,
      consulta_paciente_primer_apellido: this.currentPaciente.primerApellido,
      consulta_paciente_segundo_apellido: this.currentPaciente.segundoApellido,
      consulta_pac_f_nacimiento: this.DatePipe.transform(this.currentPaciente.f_nac, 'yyyy-MM-dd' ),
      consulta_pac_email: this.currentConsulta.detPaciente.email,
      consulta_pac_telefono: this.currentConsulta.detPaciente.telefono,
      consulta_pac_celular: this.currentConsulta.detPaciente.celular,
      consulta_presion_arterial: [''],
      consulta_frec_cardiaca: [''],
      consulta_frec_respiratoria: [''],
      consulta_temp: [''],
      consulta_nota_medica: ['', Validators.required],
      consulta_diagnostico: ['', Validators.required],
      consulta_tratamiento: ['', Validators.required],
      consulta_doc: this.auth.userData.userName,
    })
  }

  calcularEdad(fecha: string) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }

  enviarConsulta(){
    let post = this.consultaForm.value;
    console.log('Valor post', post)
    this.currentConsulta.estatus = 'terminada';
    let data = { motivo: 'Cita finalizada', idUser: this.auth.currentUserId, usuario: this.auth.userData.userName, accion: 'Terminada', f_termino: new Date()}
    post['id_Doctor'] = this.auth.currentUserId;
    this.currentConsulta.historial.push(data)
    console.log('Consulta', this.currentConsulta)
    Swal.fire({
      title: 'Consulta terminada',
      text: "La consulta ha sido guardad",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Continuar'
    }).then(() => {
      this.ConsultaService.crearCita(post);
      this.CitaService.updateCita(this.currentConsulta);
      this.router.navigate(['calendario']);
    })
  }

}

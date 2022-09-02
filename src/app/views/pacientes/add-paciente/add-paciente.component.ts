import { PacienteAPIService } from './../../../service/APIServices/PacienteAPI/paciente-api.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../service/paciente/paciente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalEditPacComponent } from '../modal-edit-pac/modal-edit-pac.component';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../../../service/auth/auth.service';
import moment from 'moment';
//import { municipios } from './../../../service/estadosymunicipios.json'
@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.component.html',
  styleUrls: ['./add-paciente.component.scss']
})
export class AddPacienteComponent implements OnInit {

  pacienteForm: FormGroup;

  valueNombre: string = '^([A-ZÀ-ÿ]{2,20})*( [A-ZÀ-ÿ]{2,20}){0,3}$';
  // tslint:disable-next-line: max-line-length
  valueCURP: string = '[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}';

  estadosymunicipios: any;
  municipios: any;
  currentPaciente: any = null
  varActivo: boolean = true;

  bandAddTitular: boolean = false;
  bandEditTitular: boolean = false;
  bandAddAdicional: boolean = false;
  bandEditAdicional: boolean = false;

  currentTitular: any = null;

  parentesco = "";
  nombreTitular: any;
  telefonoTitular: any;
  prueba: any;

  modalRef: BsModalRef;

  @Input() idAdicional: string = null;
  @Output() cerrarModal: EventEmitter<any> = new EventEmitter<any>();
  obs;
  paciente: Object;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private httpClient: HttpClient,
    private modalService: BsModalService,
    private PacienteService: PacienteService,
    private PacienteAPIService: PacienteAPIService
  ) {
    this.pacienteForm = this.createFormPaciente();

    if (this.router.getCurrentNavigation() != null) {
      this.route.queryParams.subscribe(async params => {
        if (this.router.getCurrentNavigation().extras.state) {
          if (this.router.getCurrentNavigation().extras.state.caso) {
            switch (this.router.getCurrentNavigation().extras.state.caso) {
              case 'editar titular':
                this.currentPaciente = this.router.getCurrentNavigation().extras.state.userData;
                this.bandEditTitular = true;
                await this.loadMunicipios();
                this.loadTitularData();
                break;

              case 'editar adicional':
                this.currentPaciente = this.router.getCurrentNavigation().extras.state.userData;
                this.bandEditAdicional = true;
                this.parentesco = this.currentPaciente.pac_parentesco;
                await this.loadMunicipios();
                this.loadUserData();
                break;

              case 'agregar adicional':
                this.currentTitular = this.router.getCurrentNavigation().extras.state.userTitularData;
                console.log('Titular', this.currentTitular)
                await this.loadMunicipios();
                this.bandAddAdicional = true;
                break;

              default:
                //agregar titular
                this.bandAddTitular = true;
                this.currentPaciente = null;
                break;
            }

          } else {
            this.bandAddTitular = true;
            this.currentPaciente = null;
            await this.loadMunicipios();
          }

          await this.loadMunicipios();
        } else {
          this.bandAddTitular = true;
          this.currentPaciente = null;
          await this.loadMunicipios();
          this.currentPaciente = null;
        }
      });
    }
    else {
      this.bandAddTitular = true;
      this.currentPaciente = null;
    }
    console.log(this.currentPaciente);
  }

  createFormPaciente(){
    return new FormGroup({
      pac_Nombres: new FormControl('', [Validators.required, /*Validators.pattern(this.valueNombre)*/]),
      pac_Primer_Apellido: new FormControl('', [Validators.required, /*Validators.pattern(this.valueNombre)*/]),
      pac_Segundo_Apellido: new FormControl('', [Validators.required, /*Validators.pattern(this.valueNombre)*/]),
      pac_CURP: new FormControl('', [Validators.pattern(this.valueCURP)]),
      pac_f_nacimiento: new FormControl('', /*[Validators.required]*/),

      pac_Email: new FormControl('', /*[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]*/),
      pac_Telefono: new FormControl('', /*[Validators.required, Validators.pattern('[0-9]{10}')]*/),
      pac_Celular: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      pac_Estado_Civil: new FormControl('', /*[Validators.required]*/),
      pac_Escolaridad: new FormControl('', /*[Validators.required]*/),
      pac_Sexo: new FormControl('', /*[Validators.required]*/),

      pac_Pais: new FormControl('México', /*[Validators.required]*/),
      pac_Estado: new FormControl('', /*[Validators.required]*/),
      pac_Municipio: new FormControl('', /*[Validators.required]*/),

      pac_Localidad: new FormControl('', /*[Validators.required]*/),
      pac_dir_CP: new FormControl('', /*[Validators.required, Validators.pattern('[0-9]{5}'), Validators.minLength(5)]*/),
      pac_dir_colonia: new FormControl('', /*[Validators.required]*/),
      pac_dir_calle: new FormControl('', /*[Validators.required]*/),
      pac_dir_comentarios: new FormControl('', /*[Validators.required]*/),
    })
  }

  ngOnInit(){
    console.log(this.idAdicional, 'adicionalId')
    if (this.idAdicional) {
      this.PacienteAPIService.getPacienteData(this.idAdicional).subscribe(async data => {
        this.currentPaciente = data[0]
        console.log('data', this.currentPaciente);
        this.parentesco = this.currentPaciente.Parentezco;
        await this.loadMunicipios();
        this.loadUserData();
      })
      this.bandAddTitular = false;
      this.bandEditTitular = false;
      this.bandAddAdicional = false;
      this.bandEditAdicional = true;
    }
  }

  async loadMunicipios() {
    return await new Promise((resolve) => {
      this.httpClient.get<any>("assets/docs/estadosymunicipios.json").subscribe((data) => {
        this.estadosymunicipios = data;
        resolve('success');
      })
    })
  }

  getMunicipios(value: any) {
    console.log('Estados', value)
    this.municipios = [];
    this.municipios = this.estadosymunicipios[value]
  }

  get refresh$(){
    return this.refresh$;
  }

  goToPacientes() {
    this.router.navigate(['pacientes']);
  }

  closeModal(){
    this.cerrarModal.emit({ cerrar: true })
  }

  async addPacTitular() {
    let post = this.pacienteForm.value;
    post['pac_Nombres'] = post['pac_Nombres'].toUpperCase();
    post['pac_Primer_Apellido'] = post['pac_Primer_Apellido'].toUpperCase();
    post['pac_Segundo_Apellido'] = post['pac_Segundo_Apellido'].toUpperCase();
    post['pac_Nombre_Completo'] = post['pac_Nombres'].toUpperCase() + ' ' + post['pac_Primer_Apellido'].toUpperCase() + ' ' + post['pac_Segundo_Apellido'].toUpperCase();
    post['pac_tipo'] = 'titular';
    post['pac_cant_adicionales'] = 0;
    post['f_registro'] = new Date();
    post['user_reg'] = this.authService.currentUserId;
    post['activo']=true;
    post['empresa'] = 'troquelados';
    post['id_titular'] = '';
    post['Parentezco'] = '';
    post['created_at'] = new Date();
    Swal.fire({
      title: 'Registrando Paciente',
      text: 'Los datos de el paciente estan siendo almacenados',
      icon: 'info',
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    this.PacienteAPIService.postPaciente(post).subscribe(data => {
      console.log(data)
    })
    Swal.close();
    Swal.fire({
      title: 'Paciente Registrado',
      text: 'El paciente ha sido registrado correctamente',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      this.pacienteForm.reset()
      this.router.navigate(['pacientes']);
      return false
    })
  }

  async addPacAdicional() {
    let post = this.pacienteForm.value;
    post['pac_Nombres'] = post['pac_Nombres'].toUpperCase();
    post['pac_Primer_Apellido'] = post['pac_Primer_Apellido'].toUpperCase();
    post['pac_Segundo_Apellido'] = post['pac_Segundo_Apellido'].toUpperCase();
    post['pac_Nombre_Completo'] = post['pac_Nombres'].toUpperCase() + ' ' + post['pac_Primer_Apellido'].toUpperCase() + ' ' + post['pac_Segundo_Apellido'].toUpperCase();
    post['pac_tipo'] = 'adicional';
    post['pac_cant_adicionales'] = 0;
    post['f_registro'] = new Date();
    post['user_reg'] = this.authService.currentUserId;
    post['activo']=true;
    post['empresa'] = 'troquelados';
    post['id_titular'] = '';
    post['Parentezco'] = this.parentesco;
    post['created_at'] = new Date();
    post['id_titular'] = this.currentTitular.idPaciente;

    this.PacienteAPIService.postPaciente(post).subscribe();
    Swal.fire({
      title: 'Paciente Registrado',
      text: 'El paciente ha sido registrado correctamente',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      this.pacienteForm.reset()
      if (this.idAdicional) this.modalRef.hide();
      else this.router.navigate(['pacientes']);
      return false
    })
  }

  async loadUserData() {
    await this.getMunicipios(this.currentPaciente.pac_Estado);
    this.pacienteForm.patchValue({
      pac_Nombres: this.currentPaciente.pac_Nombres,
      pac_Primer_Apellido: this.currentPaciente.pac_Primer_Apellido,
      pac_Segundo_Apellido: this.currentPaciente.pac_Segundo_Apellido,
      pac_CURP: this.currentPaciente.pac_CURP,
      pac_f_nacimiento: this.currentPaciente.pac_f_nacimiento,

      pac_Email: this.currentPaciente.pac_Email,
      pac_Telefono: this.currentPaciente.pac_Telefono,
      pac_Celular: this.currentPaciente.pac_Celular,
      pac_Estado_civil: this.currentPaciente.pac_Estado_civil,
      pac_Escolaridad: this.currentPaciente.pac_Escolaridad,
      pac_Sexo: this.currentPaciente.pac_Sexo,

      pac_Pais: this.currentPaciente.pac_Pais,
      pac_Estado: this.currentPaciente.pac_Estado,
      pac_Municipio: this.currentPaciente.pac_Municipio,

      pac_Localidad: this.currentPaciente.pac_Localidad,
      pac_dir_CP: this.currentPaciente.pac_dir_CP,
      pac_dir_colonia: this.currentPaciente.pac_dir_colonia,
      pac_dir_calle: this.currentPaciente.pac_dir_calle,
      pac_dir_comentarios: this.currentPaciente.pac_dir_comentarios,
      pac_parentesco: this.currentPaciente.Parentezco,
    })
    this.parentesco = this.currentPaciente.Parentezco;
  }

  loadTitularData() {
    this.getMunicipios(this.currentPaciente.pac_Estado);
    this.pacienteForm.patchValue({
      pac_Nombres: this.currentPaciente.pac_Nombres,
      pac_Primer_Apellido: this.currentPaciente.pac_Primer_Apellido,
      pac_Segundo_Apellido: this.currentPaciente.pac_Segundo_Apellido,
      pac_CURP: this.currentPaciente.pac_CURP,
      pac_f_nacimiento: this.currentPaciente.pac_f_nacimiento,

      pac_Email: this.currentPaciente.pac_Email,
      pac_Telefono: this.currentPaciente.pac_Telefono,
      pac_Celular: this.currentPaciente.pac_Celular,
      pac_Estado_civil: this.currentPaciente.pac_Estado_civil,
      pac_Escolaridad: this.currentPaciente.pac_Escolaridad,
      pac_Sexo: this.currentPaciente.pac_Sexo,

      pac_Pais: this.currentPaciente.pac_Pais,
      pac_Estado: this.currentPaciente.pac_Estado,
      pac_Municipio: this.currentPaciente.pac_Municipio,

      pac_Localidad: this.currentPaciente.pac_Localidad,
      pac_dir_CP: this.currentPaciente.pac_dir_CP,
      pac_dir_colonia: this.currentPaciente.pac_dir_colonia,
      pac_dir_calle: this.currentPaciente.pac_dir_calle,
      pac_dir_comentarios: this.currentPaciente.pac_dir_comentarios,
    })
    this.PacienteAPIService.getAdicionalesList(this.currentPaciente.idPaciente).subscribe(adicionalesList => {
      this.prueba = adicionalesList;
      console.log(this.prueba);
    })
  }

  async updatePaciente() {
    let post = this.pacienteForm.value;
    post['pac_Nombre_Completo'] = post['pac_Nombres'] + ' ' + post['pac_Primer_Apellido'] + ' ' + post['pac_Segundo_Apellido'];
    post['idPaciente'] = this.currentPaciente.idPaciente;
    post['pac_tipo'] = this.currentPaciente.pac_tipo;
    post['user_reg'] = this.currentPaciente.user_reg;
    post['updated_at'] = this.currentPaciente.updated_at;
    post['activo'] = this.currentPaciente.activo;
    post['empresa'] = 'troquelados';
    this.PacienteAPIService.updatePaciente(post, this.currentPaciente.idPaciente).subscribe(data =>{
      this.paciente = data;
      console.log('Paciente editado', this.paciente)
    })
    Swal.fire({
      title: 'Paciente Editado',
      text: 'El paciente ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      if (this.currentPaciente.pac_tipo == 'adicional') {
        console.log(this.currentPaciente)
      }

      this.pacienteForm.reset();
      if (this.idAdicional) {
        this.cerrarModal.emit({ cerrar: true });
      }
      else this.router.navigate(['pacientes']);
      return false;
    })
    this.pacienteForm.reset()
    this.router.navigate(['pacientes'])
  }

  updatePacienteAdicional(){
    let post = this.pacienteForm.value;
    post['pac_Nombre_Completo'] = post['pac_Nombres'] + ' ' + post['pac_Primer_Apellido'] + ' ' + post['pac_Segundo_Apellido'];
    post['idPaciente'] = this.currentPaciente.idPaciente;
    post['pac_tipo'] = this.currentPaciente.pac_tipo;
    post['user_reg'] = this.currentPaciente.user_reg;
    post['updated_at'] = this.currentPaciente.updated_at;
    post['activo'] = this.currentPaciente.activo;
    post['empresa'] = 'troquelados';
    post['id_titular'] = this.currentPaciente.id_titular;
    post['Parentezco'] = this.currentPaciente.Parentezco;
    console.log('post', post)
    this.PacienteAPIService.updatePaciente(post, this.currentPaciente.idPaciente).subscribe(data =>{
      this.paciente = data;
      console.log('Paciente editado', this.paciente)
    })
    Swal.fire({
      title: 'Paciente Editado',
      text: 'El paciente ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      if (this.currentPaciente.pac_tipo == 'adicional') {
        console.log(this.currentPaciente)
      }
      this.pacienteForm.reset();
      if (this.idAdicional) {
        this.cerrarModal.emit({ cerrar: true });
      }
      else this.router.navigate(['pacientes']);
      return false;
    })
    this.pacienteForm.reset()
    this.router.navigate(['pacientes'])
  }

  get f() {
    return this.pacienteForm.controls;
  }

  editModalShow(id: string) {
    console.log(id);

    const initialState = {
      idAdicional: id,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-lg'
    };

    this.modalRef = this.modalService.show(ModalEditPacComponent, {
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-lg', initialState
    });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PacienteService } from '../../../service/paciente/paciente.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalEditPacComponent } from '../modal-edit-pac/modal-edit-pac.component';
import { take } from 'rxjs/operators';

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


  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private PacienteService: PacienteService,
    private modalService: BsModalService
  ) {
    this.pacienteForm = this.fb.group({
      pac_nombres: ['', [Validators.required, /*Validators.pattern(this.valueNombre)*/]],
      pac_primer_apellido: new FormControl('', [Validators.required, /*Validators.pattern(this.valueNombre)*/]),
      pac_segundo_apellido: new FormControl('', [Validators.required, /*Validators.pattern(this.valueNombre)*/]),
      pac_curp: new FormControl('', [Validators.pattern(this.valueCURP)]),
      pac_f_nacimiento: new FormControl('', /*[Validators.required]*/),

      pac_email: new FormControl('', /*[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]*/),
      pac_telefono: new FormControl('', /*[Validators.required, Validators.pattern('[0-9]{10}')]*/),
      pac_celular: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      pac_estado_civil: new FormControl('', /*[Validators.required]*/),
      pac_escolaridad: new FormControl('', /*[Validators.required]*/),
      pac_sexo: new FormControl('', /*[Validators.required]*/),

      pac_pais: new FormControl('México', /*[Validators.required]*/),
      pac_estado: new FormControl('', /*[Validators.required]*/),
      pac_municipio: new FormControl('', /*[Validators.required]*/),

      pac_localidad: new FormControl('', /*[Validators.required]*/),
      pac_dir_cp: new FormControl('', /*[Validators.required, Validators.pattern('[0-9]{5}'), Validators.minLength(5)]*/),
      pac_dir_colonia: new FormControl('', /*[Validators.required]*/),
      pac_dir_calle: new FormControl('', /*[Validators.required]*/),
      pac_dir_comentarios: new FormControl('', /*[Validators.required]*/),
      pac_medio_contacto: new FormControl('', /*[Validators.required]*/),

    });

    if (this.router.getCurrentNavigation() != null) {
      /*queryParams: parámetro muy útil para enviar objetos complejos utilizando la navegación de ruta.
                    ↓↓↓↓↓*/
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

  async ngOnInit(): Promise<void> {

    if (this.idAdicional) {
      await new Promise<void>((resolve) => {
        this.PacienteService.getPacienteData(this.idAdicional).subscribe((data) => {
          this.currentPaciente = data;
          resolve()
        })

      })

      this.bandAddTitular = false;
      this.bandEditTitular = false;
      this.bandAddAdicional = false;

      this.bandEditAdicional = true;
      this.parentesco = this.currentPaciente.pac_parentesco;
      await this.loadMunicipios();
      this.loadUserData();
    }
  }

  loadMunicipios() {
    return new Promise((resolve) => {
      this.httpClient.get<any>("assets/docs/estadosymunicipios.json").subscribe((data) => {
        this.estadosymunicipios = data;
        resolve('success');
      })
    })
  }

  getMunicipios(value: any) {
    this.municipios = [];
    this.municipios = this.estadosymunicipios[value]
  }

  goToPacientes() {
    this.router.navigate(['pacientes']);
  }

  async addPacTitular() {
    let post = this.pacienteForm.value;

    post['pac_nombre_completo'] = post['pac_nombres'] + ' ' + post['pac_primer_apellido'] + ' ' + post['pac_segundo_apellido'];
    post['pac_tipo'] = 'titular';
    post['pac_adicionales'] = [];
    post['pac_cant_adicionales'] = 0;

    await this.PacienteService.creaPaciente(post);
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

    post['pac_nombre_completo'] = post['pac_nombres'] + ' ' + post['pac_primer_apellido'] + ' ' + post['pac_segundo_apellido'];
    post['pac_tipo'] = 'adicional';
    post['pac_titular_id'] = this.currentTitular.id;
    post['pac_parentesco'] = this.parentesco;
    post['pac_det_titular'] = {
      pac_nombre_completo: this.currentTitular.pac_nombre_completo,
      idTitular: this.currentTitular.id,
      pac_celular: this.currentTitular.pac_celular
    }

    let response = await this.PacienteService.creaPaciente(post);
    let arrayAdicionales = this.currentTitular.pac_adicionales;
    arrayAdicionales.push(response);

    let postTitular = {
      id: this.currentTitular.id,
      pac_cant_adicionales: this.currentTitular.pac_cant_adicionales + 1,
      pac_adicionales: arrayAdicionales
    }

    await this.PacienteService.updatePaciente(postTitular);

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

  loadUserData() {
    this.getMunicipios(this.currentPaciente.pac_estado);
    this.pacienteForm.patchValue({
      pac_nombres: this.currentPaciente.pac_nombres,
      pac_primer_apellido: this.currentPaciente.pac_primer_apellido,
      pac_segundo_apellido: this.currentPaciente.pac_segundo_apellido,
      pac_curp: this.currentPaciente.pac_curp,
      pac_f_nacimiento: this.currentPaciente.pac_f_nacimiento,

      pac_email: this.currentPaciente.pac_email,
      pac_telefono: this.currentPaciente.pac_telefono,
      pac_celular: this.currentPaciente.pac_celular,
      pac_estado_civil: this.currentPaciente.pac_estado_civil,
      pac_escolaridad: this.currentPaciente.pac_escolaridad,
      pac_sexo: this.currentPaciente.pac_sexo,

      pac_pais: this.currentPaciente.pac_pais,
      pac_estado: this.currentPaciente.pac_estado,
      pac_municipio: this.currentPaciente.pac_municipio,

      pac_localidad: this.currentPaciente.pac_localidad,
      pac_dir_cp: this.currentPaciente.pac_dir_cp,
      pac_dir_colonia: this.currentPaciente.pac_dir_colonia,
      pac_dir_calle: this.currentPaciente.pac_dir_calle,
      pac_dir_comentarios: this.currentPaciente.pac_dir_comentarios,

      pac_parentesco: this.currentPaciente.pac_parentesco,
    })
    this.nombreTitular = this.currentPaciente.pac_det_titular.pac_nombre_completo;
    this.telefonoTitular = this.currentPaciente.pac_det_titular.pac_celular;
    this.prueba = this.currentPaciente.pac_adicionales;
  }

  loadTitularData() {
    this.getMunicipios(this.currentPaciente.pac_estado);
    this.pacienteForm.patchValue({
      pac_nombres: this.currentPaciente.pac_nombres,
      pac_primer_apellido: this.currentPaciente.pac_primer_apellido,
      pac_segundo_apellido: this.currentPaciente.pac_segundo_apellido,
      pac_curp: this.currentPaciente.pac_curp,
      pac_f_nacimiento: this.currentPaciente.pac_f_nacimiento,

      pac_email: this.currentPaciente.pac_email,
      pac_telefono: this.currentPaciente.pac_telefono,
      pac_celular: this.currentPaciente.pac_celular,
      pac_estado_civil: this.currentPaciente.pac_estado_civil,
      pac_escolaridad: this.currentPaciente.pac_escolaridad,
      pac_sexo: this.currentPaciente.pac_sexo,

      pac_pais: this.currentPaciente.pac_pais,
      pac_estado: this.currentPaciente.pac_estado,
      pac_municipio: this.currentPaciente.pac_municipio,

      pac_localidad: this.currentPaciente.pac_localidad,
      pac_dir_cp: this.currentPaciente.pac_dir_cp,
      pac_dir_colonia: this.currentPaciente.pac_dir_colonia,
      pac_dir_calle: this.currentPaciente.pac_dir_calle,
      pac_dir_comentarios: this.currentPaciente.pac_dir_comentarios,

      pac_parentesco: this.currentPaciente.pac_parentesco,
    })
    this.prueba = Object.values(this.currentPaciente.pac_adicionales);
  }

  async updatePaciente() {
    let post = this.pacienteForm.value;
    post['pac_nombre_completo'] = post['pac_nombres'] + ' ' + post['pac_primer_apellido'] + ' ' + post['pac_segundo_apellido'];
    post['id'] = this.currentPaciente.id;
    await this.PacienteService.updatePaciente(post)
    Swal.fire({
      title: 'Paciente Editado',
      text: 'El paciente ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {

      if (this.currentPaciente.pac_tipo == 'adicional') {
        console.log(this.currentPaciente)
        //this.PacienteService.updatePaciente(post)
        this.PacienteService.getPacienteData(this.currentPaciente.pac_det_titular.idTitular).pipe(take(1)).subscribe(async data => {
          console.log(data);
          let arrayAdicionales = data['pac_adicionales'];

          let ad = arrayAdicionales.filter(p => p.id == this.currentPaciente.id)[0]

          if( ad['nombre_completo'] != post['pac_nombres'] + ' ' + post['pac_primer_apellido'] + ' ' + post['pac_segundo_apellido']){
            ad['nombre_completo'] = post['pac_nombres'] + ' ' + post['pac_primer_apellido'] + ' ' + post['pac_segundo_apellido'];

            let postTitular = {
              id: this.currentPaciente.pac_det_titular.idTitular,
              pac_adicionales: arrayAdicionales
            }
  
            await this.PacienteService.updatePaciente(postTitular);
            console.log('se ejecuta');
          }else{
            console.log('no se ejecuta');
          }
         

        })
      }


      this.pacienteForm.reset();
      if (this.idAdicional) {
        this.cerrarModal.emit({ cerrar: true });
      }
      else this.router.navigate(['pacientes']);
      return false;
    })
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

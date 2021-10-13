import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PacienteService } from '../../../service/paciente/paciente.service';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';

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

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private PacienteService: PacienteService,
  ) {
    this.pacienteForm = this.fb.group({
      pac_nombres: ['', /*[Validators.required, Validators.pattern(this.valueNombre)]*/],
      pac_primer_apellido: new FormControl('', /*[Validators.required, Validators.pattern(this.valueNombre)]*/),
      pac_segundo_apellido: new FormControl('', /*[Validators.required, Validators.pattern(this.valueNombre)]*/),
      pac_curp: new FormControl('', /*[Validators.required, Validators.pattern(this.valueCURP)]*/),
      pac_f_nacimiento: new FormControl('', /*[Validators.required]*/),

      pac_email: new FormControl('', /*[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]*/),
      pac_telefono: new FormControl('', /*[Validators.required, Validators.pattern('[0-9]{10}')]*/),
      pac_celular: new FormControl('', /*[Validators.required, Validators.pattern('[0-9]{10}')]*/),
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

    });

    if (this.router.getCurrentNavigation() != null) {
      /*queryParams: parámetro muy útil para enviar objetos complejos utilizando la navegación de ruta.
                    ↓↓↓↓↓*/
      console.log('entro al if getCurrentNavigation')
      this.route.queryParams.subscribe(async params => {
        console.log('entro al subscribe');
        if (this.router.getCurrentNavigation().extras.state) {
          console.log('entro al if state')
          if (this.router.getCurrentNavigation().extras.state.caso) {
            switch (this.router.getCurrentNavigation().extras.state.caso) {
              case 'editar titular':
                this.currentPaciente = this.router.getCurrentNavigation().extras.state.userData;
                this.bandEditTitular = true;
                await this.loadMunicipios();
                this.loadUserData();
                break;

              case 'editar adicional':
                this.currentPaciente = this.router.getCurrentNavigation().extras.state.userData;
                this.bandEditAdicional = true;
                this.parentesco=this.currentPaciente.pac_parentesco;
                await this.loadMunicipios();
                this.loadUserData();
                break;

              case 'agregar adicional':
                this.currentTitular = this.router.getCurrentNavigation().extras.state.userTitularData;
                console.log(this.currentTitular);
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
      console.log('else');
      this.bandAddTitular = true;
      this.currentPaciente = null;
    }
    console.log(this.currentPaciente);

  }

  ngOnInit(): void {
    console.log(history.state);
    /*this.httpClient.get<any>("assets/docs/estadosymunicipios.json").subscribe((data) => {
      this.estadosymunicipios = data,
      console.log(this.estadosymunicipios)
    })*/
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
    console.log(value)
    this.municipios = [],
      console.log(this.estadosymunicipios)
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
      console.log(this.pacienteForm);
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
    console.log(response);
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
      this.router.navigate(['pacientes']);
      console.log(this.pacienteForm);
      return false
    })
  }

  loadUserData() {
    console.log(this.currentPaciente.pac_municipio)
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

    })
  }

  updatePaciente() {
    let post = this.pacienteForm.value;
    post['id'] = this.currentPaciente.id;
    this.PacienteService.updatePaciente(post)
    Swal.fire({
      title: 'Paciente Editado',
      text: 'El paciente ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.pacienteForm.reset();
      this.router.navigate(['pacientes'])
      return false;
    })
  }

  alert() {
    console.log("Activado")
  }

  get f() {
    return this.pacienteForm.controls;
  }

}

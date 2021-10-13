import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PacienteService } from '../../../service/paciente/paciente.service';

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
  currentUser:any = null
  varActivo: boolean = true;

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
      municipio: new FormControl('', /*[Validators.required]*/),

      pac_localidad: new FormControl('', /*[Validators.required]*/),
      pac_dir_cp: new FormControl('', /*[Validators.required, Validators.pattern('[0-9]{5}'), Validators.minLength(5)]*/),
      pac_dir_colonia: new FormControl('', /*[Validators.required]*/),
      pac_dir_calle: new FormControl('', /*[Validators.required]*/),
      pac_dir_comentarios: new FormControl('', /*[Validators.required]*/),

      pac_status: (this.varActivo),
      pac_tipo: new FormControl('')
    })
    if(this.router.getCurrentNavigation() != null){
      /*queryParams: parámetro muy útil para enviar objetos complejos utilizando la navegación de ruta.
                    ↓↓↓↓↓*/
      this.route.queryParams.subscribe(async params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.currentUser = this.router.getCurrentNavigation().extras.state.userData;
          this.loadUserData();
        } else{
          this.currentUser = null;
        }
      });
    }
    else{
      this.currentUser = null;
    }
  }

  ngOnInit(): void {
    this.httpClient.get<any>("assets/docs/estadosymunicipios.json").subscribe((data) => {
      this.estadosymunicipios = data,
      console.log(this.estadosymunicipios)
    })
  }

  getMunicipios(value: number) {
    this.municipios = [],
    console.log(this.estadosymunicipios)
    this.municipios = this.estadosymunicipios[value]
  }

  goToPacientes() {
    this.router.navigate(['pacientes']);
  }

  async addPaciente(){
    await this.PacienteService.creaPaciente(this.pacienteForm.value);
    Swal.fire({
      title: 'Paciente Registrado',
      text: 'El paciente ha sido registrado correctamente',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(()=>{
      this.pacienteForm.reset()
      this.router.navigate(['pacientes']);
      console.log(this.pacienteForm);
      return false
    })
  }

  loadUserData(){
    this.pacienteForm.patchValue({
      pac_nombres: this.currentUser.pac_nombres,
      pac_primer_apellido: this.currentUser.pac_primer_apellido,
      pac_segundo_apellido: this.currentUser.pac_segundo_apellido,
      pac_curp: this.currentUser.pac_curp,
      pac_f_nacimiento: this.currentUser.pac_f_nacimiento,
      pac_status: this.currentUser.pac_status,
      pac_tipo: this.currentUser.pac_tipo,

      pac_email: this.currentUser.pac_email,
      pac_telefono: this.currentUser.pac_telefono,
      pac_celular: this.currentUser.pac_celular,
      pac_estado_civil: this.currentUser.pac_estado_civil,
      pac_escolaridad: this.currentUser.pac_escolaridad,
      pac_sexo: this.currentUser.pac_sexo,

      pac_pais: this.currentUser.pac_pais,
      pac_estado: this.currentUser.pac_estado,
      municipio: this.currentUser.municipio,

      pac_localidad: this.currentUser.pac_localidad,
      pac_dir_cp: this.currentUser.pac_dir_cp,
      pac_dir_colonia: this.currentUser.pac_dir_colonia,
      pac_dir_calle: this.currentUser.pac_dir_calle,
      pac_dir_comentarios: this.currentUser.pac_dir_comentarios,

    })
  }

  updatePaciente(){
    let post = this.pacienteForm.value;
    post['id'] = this.currentUser.id;
    this.PacienteService.updatePaciente(post)
    Swal.fire({
      title: 'Paciente Editado',
      text: 'El paciente ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(()=>{
      this.pacienteForm.reset();
      this.router.navigate(['pacientes'])
      return false;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.pacienteForm = this.fb.group({
      pac_nombres: new FormControl('', [Validators.required, Validators.pattern(this.valueNombre)]),
      pac_primer_apellido: new FormControl('', [Validators.required, Validators.pattern(this.valueNombre)]),
      pac_segundo_apellido: new FormControl('', [Validators.required, Validators.pattern(this.valueNombre)]),
      pac_curp: new FormControl('', [Validators.required, Validators.pattern(this.valueCURP)]),
      pac_f_nacimiento: new FormControl('', [Validators.required]),

      pac_email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]),
      pac_telefono: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      pac_celular: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      pac_estado_civil: new FormControl('', [Validators.required]),
      pac_escolaridad: new FormControl('', [Validators.required]),
      pac_sexo: new FormControl('', [Validators.required]),

      pac_pais: new FormControl('México', [Validators.required]),
      pac_estado: new FormControl('', [Validators.required]),
      pac_municipio: new FormControl('', [Validators.required]),
     
      pac_localidad: new FormControl('', [Validators.required]),
      pac_dir_cp: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}'), Validators.minLength(5)]),
      pac_dir_colonia: new FormControl('', [Validators.required]),
      pac_dir_calle: new FormControl('', [Validators.required]),
      pac_dir_comentarios: new FormControl('', [Validators.required]),
    })

  }

  ngOnInit(): void {
    this.httpClient.get<any>("assets/docs/estadosymunicipios.json").subscribe((data) => {
      this.estadosymunicipios = data
      console.log(this.estadosymunicipios)
    })
  }

  getMunicipios(value: number) {
    this.municipios = []
    console.log(this.estadosymunicipios)
    this.municipios = this.estadosymunicipios[value]
  }

  goToPacientes(){
    this.router.navigate(['pacientes']);
  }

}

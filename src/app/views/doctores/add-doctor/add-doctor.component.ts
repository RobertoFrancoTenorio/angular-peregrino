import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorService } from './../../../service/doctor/doctor.service';
import { HttpClient } from '@angular/common/http';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  //Variable para determinar cual de los 2 divs va a cargar
  done: boolean = true;
  editDoctor: boolean = false;
  /*Variable de tipo form group que guardará todos los datos que mandaremos desde el
  componente html*/
  doctorForm: FormGroup;
  municipio: any;
  //Variable que nos va a identificar sí se va a crear un nuevo doctor o solo se va a modificar
  currentUser:any = null

  //Variable que switchea el valor de activo
  varActivo: boolean = true;
  doc_id: string = '';

  metodoForm = this.fb.group({
    doc_metodo: ['', []],
    doc_telefono: ['', []],
    doc_horario: ['',[]]
  });
  isCitiesControlVisible = true;
  especialidades: any[]=[
    {name: 'Nutrición'},
    {name: 'Psicología'},
    {name: 'Medico General'}
  ]

  estadosymunicipios : any;
  municipios : any;

  valueNombre: string = '^([A-ZÀ-ÿ]{2,20})*( [A-ZÀ-ÿ]{2,20}){0,3}$';
  valueCURP: string = '[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}';

  prueba: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private DoctorService: DoctorService,
    private httpClient: HttpClient,
  ) {
    this.doctorForm = this.fb.group({
      doc_nombre: ['', [Validators.required]],
      doc_primer_apellido: ['', [Validators.required]],
      doc_segundo_apellido: ['', [Validators.required]],
      doc_cedula: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      doc_curp: ['', [Validators.required, Validators.pattern(this.valueCURP)]],
      doc_especialidades: ['',],
      activo: [this.varActivo, [Validators.required]],
      doc_estado: [''],
      doc_municipio: [''],
      doc_dir_colonia: [''],
      doc_dir_calle: [''],
      doc_dir_numero: ['',],
      doc_dir_cp: [''],
      doc_email: ['',[Validators.required, Validators.email]],
      doc_celular_principal: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      doc_horario_ini: [''],
      doc_horario_fin: [''],
      metodos_contacto: this.fb.array([]),
    })
    console.log('valor de ruta add doctor',this.router.getCurrentNavigation())
    if(this.router.getCurrentNavigation() != null){
      /*queryParams: parámetro muy útil para enviar objetos complejos utilizando la navegación de ruta.
                    ↓↓↓↓↓*/
      this.route.queryParams.subscribe(async params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.currentUser = this.router.getCurrentNavigation().extras.state.userData;
          await this.loadMunicipios();
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
    this.httpClient.get<any>("assets/docs/estadosymunicipios.json").subscribe( data => {
      this.estadosymunicipios = data,
      console.log(this.estadosymunicipios)
    })
  }

  loadUserData() {
    this.editDoctor = true;
    this.getMunicipios(this.currentUser.pac_estado);

    this.doctorForm.patchValue({
      doc_nombre: this.currentUser.doc_nombre,
      doc_primer_apellido: this.currentUser.doc_primer_apellido,
      doc_segundo_apellido: this.currentUser.doc_segundo_apellido,
      doc_especialidades: this.currentUser.doc_especialidades,
      doc_email: this.currentUser.doc_email,
      activo: this.currentUser.activo,
      doc_cedula: this.currentUser.doc_cedula,
      doc_curp: this.currentUser.doc_curp,
      doc_estado: this.currentUser.doc_estado,
      doc_municipio: this.currentUser.doc_municipio,
      doc_dir_colonia: this.currentUser.doc_dir_colonia,
      doc_dir_calle: this.currentUser.doc_dir_calle,
      doc_dir_numero: this.currentUser.doc_dir_numero,
      doc_dir_cp: this.currentUser.doc_dir_cp,
      doc_celular_principal: this.currentUser.doc_celular_principal,
      doc_horario_ini: this.currentUser.doc_horario_ini,
      doc_horario_fin: this.currentUser.doc_horario_fin,
    })
    this.currentUser.metodos_contacto.map(data => {
      this.metodos.push(
        this.fb.group({
          doc_metodo: [data.doc_metodo, [Validators.required]],
          doc_telefono_aux: [data.doc_telefono_aux, [Validators.required, Validators.minLength(10)]],
          doc_horario: [data.doc_horario, [Validators.required]]
        })
      )
    })
  }

  async addDoctor(){
    console.log(this.doctorForm.value);
    let post = this.doctorForm.value;
    post['doc_nombre_completo'] = post['doc_nombre'] + ' ' + post['doc_primer_apellido'] + ' ' + post['doc_segundo_apellido']
    await this.DoctorService.crearDoctor(post, this.doc_id);
    Swal.fire({
      title: 'Usuario Registrado',
      text: 'El usuario ha sido registrado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    .then(()=>{
      this.doctorForm.reset();
      this.router.navigate(['doctores']);
      return false;
    })
  }

  /*Metodo que va a actualizar los datos de algun Doctor */
  updateDoctor(){
    /*Almacena en una variable los datos del formulario para posteriormente
    enviarlos con el metodo UpdateDoctor de Doctor service*/
    let post = this.doctorForm.value;
    post['id'] = this.currentUser.id;
    post['doc_nombre_completo'] = post['doc_nombre'] + ' ' + post['doc_primer_apellido'] + ' ' + post['doc_segundo_apellido']
    console.log('Doctor Actualizado', post)
    this.DoctorService.updateDoctor(post)
    /*Sweet Alert*/
    Swal.fire({
      title: 'Usuario Editado',
      text: 'El usuario ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(()=>{
      this.doctorForm.reset();
      this.router.navigate(['doctores']);
      return false;
    })
  }

  goToDoctors() {
    this.router.navigate(['doctores']);
  }

  _keyUp(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  //Metodo para obtener los controles del formulario de Doctor
  get f(){
    return this.doctorForm.controls;
  }

  //Este metodo hace exactamente lo mismo que get metodos
  get camposMetodos(){
    return this.f.metodos as FormArray;
  }

  get metodos() {
    return this.doctorForm.controls["metodos_contacto"] as FormArray;
  }

  /*Agrega el nmetodo de contacto al formArray */
  addMetodo(){
    const metodoForm = this.fb.group({
      doc_metodo: ['', [Validators.required]],
      doc_telefono_aux: ['', [Validators.required, Validators.minLength(10)]],
      doc_horario: ['',[Validators.required]]
    });
    this.metodos.push(metodoForm);
  }

  /*Elimina el metodo que recibe como parametro*/
  deleteMetodo(metodoId: number){
    this.metodos.removeAt(metodoId);
  }

  /*Evento para validar que solo se capturen caracteres númericos */
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getMunicipios(value: number){
    this.municipios = [],
    this.municipios = this.estadosymunicipios[value]
  }

  loadMunicipios() {
    return new Promise((resolve) => {
      this.httpClient.get<any>("assets/docs/estadosymunicipios.json").subscribe((data) => {
        this.estadosymunicipios = data;
        resolve('success');
      })
    })
  }
}

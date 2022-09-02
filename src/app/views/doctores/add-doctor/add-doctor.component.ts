import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorService } from './../../../service/doctor/doctor.service';
import { HttpClient } from '@angular/common/http';
import { DoctorAPIService } from '../../../service/APIServices/DoctorAPI/doctor-api.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MetodoDeContactoAPIService } from './../../../service/APIServices/MetodoDeContactoAPI/metodo-de-contacto-api.service';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  done: boolean = true;
  editDoctor: boolean = false;
  doctorForm: FormGroup;
  municipio: any;
  currentUser:any = null
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
  bandMunicipio = false;
  municipio1 = '';
  valueNombre: string = '^([A-ZÀ-ÿ]{2,20})*( [A-ZÀ-ÿ]{2,20}){0,3}$';
  valueCURP: string = '[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}';

  prueba: any;
  doctor: any;
  metodosDeContacto: any;
  eliminar = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private DoctorAPIService: DoctorAPIService,
    private MetodoDeContactoAPIService: MetodoDeContactoAPIService
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
    if(this.router.getCurrentNavigation() != null){
      this.route.queryParams.subscribe(async params => {
        if(this.router.getCurrentNavigation().extras.state){
          console.log('id' , this.router.getCurrentNavigation().extras.state.userData.id)
          let id = this.router.getCurrentNavigation().extras.state.userData.id
          this.DoctorAPIService.getDoctor(id).subscribe(data =>{
            this.bandMunicipio = true;
            this.municipio1 = data.data['doc_municipio']
            this.currentUser = data.data;
            this.loadMunicipios();
            this.loadUserData();
          })
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
      doc_especialidad: this.currentUser.doc_especialidades.split(',')
    })
    let especialidades = this.currentUser.doc_especialidades.split(',');
    this.doctorForm.value.doc_especialidad = especialidades

    this.MetodoDeContactoAPIService.getMetodos(this.currentUser.id).subscribe(data =>{
      this.metodosDeContacto = data;
      console.log('data', this.metodosDeContacto)
      for(let i=0; i<this.metodosDeContacto.length; i++){
        this.metodosDeContacto[i]['en_base_de_datos'] = true;
        if(this.metodosDeContacto[i]['estatus_metodo_de_contacto'] == 'activo'){
          this.metodos.push(
            this.fb.group({
              doc_metodo: [data[i].doc_metodo, [Validators.required]],
              doc_telefono_aux: [data[i].doc_telefono_aux, [Validators.required, Validators.minLength(10)]],
              doc_horario: [data[i].doc_horario, [Validators.required]],
              id: [data[i].id],
              estatus_metodo_de_contacto: [data[i].estatus_metodo_de_contacto],
              en_base_de_datos: true
            })
          )
        }
      }
    })
  }

  async addDoctor(){
    this.doctor = {
      "doc_nombre": this.doctorForm.value.doc_nombre,
      "doc_primer_apellido": this.doctorForm.value.doc_primer_apellido,
      "doc_segundo_apellido": this.doctorForm.value.doc_segundo_apellido,
      "doc_nombre_completo": this.doctorForm.value.doc_nombre + ' ' + this.doctorForm.value.doc_primer_apellido + ' ' + this.doctorForm.value.doc_segundo_apellido,
      "doc_email": this.doctorForm.value.doc_email,
      "activo": true,
      "doc_cedula": this.doctorForm.value.doc_cedula,
      "doc_curp": this.doctorForm.value.doc_curp,
      "doc_estado": this.doctorForm.value.doc_estado,
      "doc_municipio": this.doctorForm.value.doc_municipio,
      "doc_dir_colonia": this.doctorForm.value.doc_dir_colonia,
      "doc_dir_calle": this.doctorForm.value.doc_dir_calle,
      "doc_dir_numero": this.doctorForm.value.doc_dir_numero,
      "doc_dir_cp": this.doctorForm.value.doc_dir_cp,
      "doc_celular_principal": this.doctorForm.value.doc_celular_principal,
      "doc_horario_ini": this.doctorForm.value.doc_horario_ini,
      "doc_horario_fin": this.doctorForm.value.doc_horario_fin,
      "doc_especialidades": this.doctorForm.value.doc_especialidades,
    }

    let especialidades = this.doctorForm.value.doc_especialidades
    let string = especialidades.toString();
    this.doctor.doc_especialidades = string;
    this.DoctorAPIService.postDoctor(this.doctor).subscribe(doctor => {
      this.doctor = doctor;
      console.log('doctor', this.doctor);
      this.postMetodo(this.doctor.id)
    })
  }

  postMetodo(idDoctor){
    console.log('Id', idDoctor)
    let metodos = this.doctorForm.value.metodos_contacto;
    for(let i = 0; i < metodos.length; i++){
      metodos[i]['idDoctor']= idDoctor;
      metodos[i]['estatus_metodo_de_contacto'] = 'activo'
    }
    for(let i = 0; i < metodos.length; i++){
      this.MetodoDeContactoAPIService.postMetodo(metodos[i]).subscribe();
    }
  }

  updateDoctor(){
    this.doctor = {
      id: this.currentUser.id,
      doc_nombre: this.doctorForm.value.doc_nombre,
      doc_primer_apellido: this.doctorForm.value.doc_primer_apellido,
      doc_segundo_apellido: this.doctorForm.value.doc_segundo_apellido,
      doc_nombre_completo: this.doctorForm.value.doc_nombre + ' ' + this.doctorForm.value.doc_primer_apellido + ' ' + this.doctorForm.value.doc_segundo_apellido,
      doc_email: this.doctorForm.value.doc_email,
      activo: true,
      doc_cedula: this.doctorForm.value.doc_cedula,
      doc_curp: this.doctorForm.value.doc_curp,
      doc_estado: this.doctorForm.value.doc_estado,
      doc_municipio: this.doctorForm.value.doc_municipio,
      doc_dir_colonia: this.doctorForm.value.doc_dir_colonia,
      doc_dir_calle: this.doctorForm.value.doc_dir_calle,
      doc_dir_numero: this.doctorForm.value.doc_dir_numero,
      doc_dir_cp: this.doctorForm.value.doc_dir_cp,
      doc_celular_principal: this.doctorForm.value.doc_celular_principal,
      doc_horario_ini: this.doctorForm.value.doc_horario_ini,
      doc_horario_fin: this.doctorForm.value.doc_horario_fin,
    }
    this.doctor.doc_especialidades = this.doctorForm.value.doc_especialidades.toString();
    this.DoctorAPIService.updateDoctor(this.doctor.id, this.doctor).subscribe(doc=>{})

    let metodos = this.doctorForm.value.metodos_contacto;

    for(let i = 0; i < metodos.length; i++) {
      metodos[i]['idDoctor']= this.currentUser.id;
      metodos[i]['id'] = this.metodosDeContacto[0].id;
      if(metodos[i]['en_base_de_datos']){
        console.log('update', metodos[i])
        this.MetodoDeContactoAPIService.updateMetodos(metodos[i].id, metodos[i]).subscribe(data => {
          console.log(data)
        });
      }
      else{
        console.log('add',metodos[i])
        let metContacto = {
          doc_horario: metodos[i].doc_horario,
          doc_metodo: metodos[i].doc_metodo,
          doc_telefono_aux: metodos[i].doc_telefono_aux,
          idDoctor: metodos[i].idDoctor,
          estatus_metodo_de_contacto: 'activo'
        }
        this.MetodoDeContactoAPIService.postMetodo(metContacto).subscribe(data => {
          console.log(data)
        })
      }

      if(this.eliminar.length > 0){
        for(let i = 0; i < this.eliminar.length; i++){
          let metodo = {
            doc_horario: this.eliminar[i].doc_horario,
            doc_metodo: this.eliminar[i].doc_metodo,
            doc_telefono_aux: this.eliminar[i].doc_telefono_aux,
            id_doctor: this.currentUser.id,
            estatus_metodo_de_contacto: 'inactivo',
            id: this.eliminar[i].id,
          }
          console.log('Metodo['+i+']', metodo);
          this.MetodoDeContactoAPIService.updateMetodos(this.eliminar[i].id, metodo).subscribe(data => {
            console.log(data)
          });
        }
      }
    }

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

  get f(){
    return this.doctorForm.controls;
  }

  get camposMetodos(){
    return this.f.metodos as FormArray;
  }

  get metodos() {
    return this.doctorForm.controls["metodos_contacto"] as FormArray;
  }

  addMetodo(){
    const metodoForm = this.fb.group({
      doc_metodo: ['', [Validators.required]],
      doc_telefono_aux: ['', [Validators.required, Validators.minLength(10)]],
      doc_horario: ['',[Validators.required]]
    });
    this.metodos.push(metodoForm);
  }

  deleteMetodo(metodoId: number){
    let metodo = this.metodos.at(metodoId).value
    this.metodos.removeAt(metodoId);
    this.eliminar.push(metodo);
    this.metodos.removeAt(metodoId);
  }

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

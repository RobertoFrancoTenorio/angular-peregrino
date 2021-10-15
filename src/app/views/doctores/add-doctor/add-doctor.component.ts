import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorService } from './../../../service/doctor/doctor.service';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  //Variable para determinar cual de los 2 divs va a cargar
  done: boolean = true;

  /*Variable de tipo form group que guardará todos los datos que mandaremos desde el
  componente html*/
  doctorForm: FormGroup;

  //Variable que nos va a identificar sí se va a crear un nuevo doctor o solo se va a modificar
  currentUser:any = null

  //Variable que switchea el valor de activo
  varActivo: boolean = true;

  faUserMd = faUserMd;
  faPlus = faPlus;
  faEraser = faEraser;
  faRoute = faRoute;
  faUserEdit = faUserEdit;
  faCommentMedical = faCommentMedical;
  alert = faExclamationCircle;
  at = faAt;
  fa = faPhoneAlt;
  clock = faClock;

  metodoForm = this.fb.group({
    metodo: ['', []],
    telefono: ['', []],
    horario: ['',[]]
  });

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
    /*Siempre que vaya a manipular un dato hay que incluir la variable */
    this.doctorForm = this.fb.group({
      userName: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],

      cedula: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      curp: ['', [Validators.required, Validators.pattern(this.valueCURP)]],

      especialidad: ['', [Validators.required]],
      activo: [this.varActivo, [Validators.required]],

      estado: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      no: ['', [Validators.required]],
      cp: ['', [Validators.required]],

      email: ['',[Validators.required, Validators.email]],
      telefono: ['',[Validators.required]],
      metodos: this.fb.array([]),
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
    this.httpClient.get<any>("assets/docs/estadosymunicipios.json").subscribe( data => {
      this.estadosymunicipios = data,
      console.log(this.estadosymunicipios)
    })
  }

  loadUserData() {
    //↓↓↓↓Se encarga de rellenar el formulario con los datos que pueden ser modificados
    this.doctorForm.patchValue({
      userName: this.currentUser.userName,
      primerApellido: this.currentUser.primerApellido,
      segundoApellido: this.currentUser.segundoApellido,
      especialidad: this.currentUser.especialidad,
      email: this.currentUser.email,
      activo: this.currentUser.activo,
      cedula: this.currentUser.cedula,
      curp: this.currentUser.curp,
      estado: this.currentUser.estado,
      municipio: this.currentUser.municipio,
      colonia: this.currentUser.colonia,
      calle: this.currentUser.calle,
      no: this.currentUser.no,
      cp: this.currentUser.cp,
      telefono: this.currentUser.telefono,
    })

    /*CurrentUser carga la información, en este caso accede al campo metodos y lo carga como un map,
    con la función flecha carga los datos en los campos necesarios con la variable data
    */
    this.currentUser.metodos.map(data => {
      this.metodos.push(
        this.fb.group({
          metodo: [data.metodo, [Validators.required]],
          telefonoAux: [data.telefonoAux, [Validators.required, Validators.minLength(10)]],
          horario: [data.horario, [Validators.required]]
        })
      )
    })

  }

  /*Metodo para dar de alta doctores*/
  async addDoctor(){
    console.log(this.doctorForm.value);
    /*
    ↓↓↓Esta parte recibe el formulario y lo pasa como parametro
    al servicio en su metodo crearDoctor↓↓↓*/
    await this.DoctorService.crearDoctor(this.doctorForm.value);
    console.log(this.doctorForm.value);
    /*Ejecución de Sweet Alert con los parametros necesarios*/
    Swal.fire({
      title: 'Usuario Registrado',
      text: 'El usuario ha sido registrado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    /*Una vez ejecutado el Sweet alert limpia el formulario
    y redirige al componente de doctores*/
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
    return this.doctorForm.controls["metodos"] as FormArray;
  }

  /*Agrega el nmetodo de contacto al formArray */
  addMetodo(){
    const metodoForm = this.fb.group({
      metodo: ['', [Validators.required]],
      telefonoAux: ['', [Validators.required, Validators.minLength(10)]],
      horario: ['',[Validators.required]]
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
    console.log(this.estadosymunicipios)
    this.municipios = this.estadosymunicipios[value]
  }

}

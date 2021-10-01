import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorService } from './../../../service/Doctor/doctor.service';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private DoctorService: DoctorService
  ) {
    /*Siempre que vaya a manipular un dato hay que incluir la variable */
    this.doctorForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      activo: [this.varActivo, [Validators.required]],
      cedula: ['', [Validators.required, Validators.min(7)]],
      telefono: ['', [Validators.required, Validators.min(10)]]
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
  }

  loadUserData() {
    //↓↓↓↓Se encarga de rellenar el formulario con los datos que pueden ser modificados
    this.doctorForm.patchValue({
      userName: this.currentUser.userName,
      email: this.currentUser.email,
      activo: this.currentUser.activo,
      cedula: this.currentUser.cedula,
      telefono: this.currentUser.telefono,
    })
  }


  //Metodo para obtener los controles del formulario de Doctor
  get f(){
    return this.doctorForm.controls;
  }

  /*Metodo para dar de alta doctores*/
  async addDoctor(){
    /*↓↓↓Esta parte recibe el formulario y lo pasa como parametro
    al servicio en su metodo crearDoctor↓↓↓*/
    await this.DoctorService.crearDoctor(this.doctorForm.value);
    console.log(this.doctorForm.value);
    /*Ejecución de Sweet Alert con los parametros necesarios */
    Swal.fire({
      title: 'Usuario Registrado',
      text: 'El usuario ha sido registrado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    /*Una vez ejecutado el Sweet alert limpia el formulario
    y redirige al componente de doctores */
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
}

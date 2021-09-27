import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../service/usuario/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent implements OnInit {

  done:boolean=true;

  userForm: FormGroup;

  currentUser:any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userServ: UsuarioService
  ) {
    this.userForm = this.fb.group({
      userName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]]
    }) 

    if (this.router.getCurrentNavigation() != null) {
      this.route.queryParams.subscribe(async params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.currentUser = this.router.getCurrentNavigation().extras.state.userData;
          this.loadUserData();
        } else {
          this.currentUser = null;
        }
      });
    } else {
      this.currentUser = null;
    }

   }

  ngOnInit(): void {
  }

  loadUserData(){
    this.userForm.patchValue({
      userName: this.currentUser.userName,
      email: this.currentUser.email
    })
  }

  get f() { return this.userForm.controls; }

  async addUser(){
    await this.userServ.crearUsuario(this.userForm.value);

    Swal.fire({
      title: 'Usuario Registrado',
      text: 'El usuario ha sido registrado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(()=>{
      this.userForm.reset();
      this.router.navigate(['usuarios']);
      return false;
    })
  }

  updateUser(){
    let post = this.userForm.value;
    post['id']=this.currentUser.id;
    this.userServ.updateUser(post);

    Swal.fire({
      title: 'Usuario Editado',
      text: 'El usuario ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(()=>{
      this.userForm.reset();
      this.router.navigate(['usuarios']);
      return false;
    })

  }

  goToUsers(){
    this.router.navigate(['usuarios']);
  }
}

import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  emailError = false;
  passError = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router,) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }
  ngOnInit(): void {
    this.onChanges();
  }

  get f() { return this.loginForm.controls; }

  onChanges(): void {
    this.loginForm.get('email').valueChanges.subscribe(val => {
      this.emailError = false;
      if (!this.loginForm.controls['email'].valid) this.emailError = true;
    });

    this.loginForm.get('password').valueChanges.subscribe(val => {
      this.passError = false;
      if (!this.loginForm.controls['password'].valid) this.passError = true;
    });
  }

  login() {
    this.auth.SignIn(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
      .then(res => {
        console.log(res);
        
        this.router.navigate(['/dashboard']);
      }, err => {
        console.log(err);
        if (err.code == 'auth/user-not-found') this.errorMessage = "El usuario no esta registrado o pudo haber sido eliminado";
        if (err.code == 'auth/wrong-password') this.errorMessage = "La contraseña es incorrecta";
      })
  }
}

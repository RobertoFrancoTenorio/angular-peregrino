import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-auth',
  templateUrl: './error-auth.component.html',
  styleUrls: ['./error-auth.component.scss']
})
export class ErrorAuthComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate(['dashboard']);
  }

}

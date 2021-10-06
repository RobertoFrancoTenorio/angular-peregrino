import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  done: boolean=true;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToAddPaciente(){
    this.router.navigate(['add-paciente']);
  }
}

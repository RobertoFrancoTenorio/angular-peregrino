import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-acciones-paciente',
  templateUrl: './acciones-paciente.component.html',
  styleUrls: ['./acciones-paciente.component.scss']
})
export class AccionesPacienteComponent implements ICellRendererAngularComp {
  public params: any;
  public activo: boolean;

  constructor(
    private router: Router
  ) { }
  async agInit(params: any): Promise<void> {
    this.params=params.data;
    this.activo= params.data.pac_status;
  }

  refresh(params): boolean {
    if (params.value !== this.params.value){
      this.params = params.data;
      this.activo = params.data.activo
    }
    return true;
  }

  editarUserShow(){
    let caso='';

    if(this.params.pac_tipo == 'titular') caso='editar titular';
    else caso='editar adicional';

    const navigationExtras: NavigationExtras = {
      state: {
        caso: caso,
        userData: this.params,
      }
    };
    this.router.navigate(['add-paciente'], navigationExtras);
  }

  addUserAdicional(){
    const navigationExtras: NavigationExtras = {
      state: {
        caso: 'agregar adicional',
        userTitularData: this.params,
      }
    };
    this.router.navigate(['add-paciente'], navigationExtras);
  }

}

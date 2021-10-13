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
    this.params=params;
    this.activo= params.data.pac_status;
  }

  refresh(params): boolean {
    if (params.value !== this.params.value){
      this.params = params;
      this.activo = params.data.activo
    }
    return true;
  }

  editarUserShow(){
    const navigationExtras: NavigationExtras = {
      state: {
        userData: this.params.data,
      }
    };
    this.router.navigate(['add-paciente'], navigationExtras);
  }

}

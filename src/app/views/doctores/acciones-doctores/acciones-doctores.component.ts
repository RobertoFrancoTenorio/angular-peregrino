import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-acciones-doctores',
  templateUrl: './acciones-doctores.component.html',
  styleUrls: ['./acciones-doctores.component.scss']
})
export class AccionesDoctoresComponent implements ICellRendererAngularComp {

  public activo: boolean;
  public params: any;

  constructor(
    private router: Router
  ) { }

  async agInit(params: any): Promise<void> {
    this.params = params;
    this.activo = params.data.activo;
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
    this.router.navigate(['add-doctor'], navigationExtras);
  }

}

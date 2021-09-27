import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-acciones-usuarios',
  templateUrl: './acciones-usuarios.component.html',
  styleUrls: ['./acciones-usuarios.component.scss']
})
export class AccionesUsuariosComponent implements ICellRendererAngularComp {

  public params: any;
  public activo: boolean;

  constructor(
    private router: Router
  ) { }

  async agInit(params: any): Promise<void> {
    this.params = params;
    this.activo = params.data.activo
  }

  refresh(params): boolean {
    if (params.value !== this.params.value) {
      this.params = params;
      this.activo = params.data.activo
    }
    return true;
  }


  editarUserShow() {
    console.log(this.params.data)

    const navigationExtras: NavigationExtras = {
      state: {
        userData: this.params.data,
      }
    };

    this.router.navigate(['add-user'], navigationExtras);

  }

}

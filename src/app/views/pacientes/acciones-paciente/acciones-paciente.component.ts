import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalInfoPacComponent } from '../modal-info-pac/modal-info-pac.component';
@Component({
  selector: 'app-acciones-paciente',
  templateUrl: './acciones-paciente.component.html',
  styleUrls: ['./acciones-paciente.component.scss']
})
export class AccionesPacienteComponent implements ICellRendererAngularComp {

  public params: any;
  public activo: boolean;

  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private modalService: BsModalService
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

  verInfoShow(){
    console.log('Params', this.params)
    const initialState = {
      currentPaciente: this.params,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-xl'
    };

    this.modalRef = this.modalService.show(ModalInfoPacComponent, {
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-xl', initialState
    });
  }

}

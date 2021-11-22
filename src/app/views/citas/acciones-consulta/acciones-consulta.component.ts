import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NavigationExtras, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalInfoConsultaComponent } from '../../citas/modal-info-consulta/modal-info-consulta.component';

@Component({
  selector: 'app-acciones-consulta',
  templateUrl: './acciones-consulta.component.html',
  styleUrls: ['./acciones-consulta.component.scss']
})
export class AccionesConsultaComponent implements ICellRendererAngularComp {
  public params: any;
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
  ) { }

  agInit(params: ICellRendererParams): void {
    console.log(params);
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  verConsulta(){
    //this.router.navigate(['add-doctor'], navigationExtras);
    const initialState = {
      currentConsulta: this.params.data,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-xl'
    };
    console.log('Params', this.params.data);

    this.modalRef = this.modalService.show(ModalInfoConsultaComponent, {
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-xl', initialState,
    });
  }
}

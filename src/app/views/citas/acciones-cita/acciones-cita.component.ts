import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddCitaComponent } from '../add-cita/add-cita.component';

@Component({
  selector: 'app-acciones-cita',
  templateUrl: './acciones-cita.component.html',
  styleUrls: ['./acciones-cita.component.scss']
})
export class AccionesCitaComponent implements ICellRendererAngularComp {
  public params: any;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
  ) { }

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    console.log(params);
    this.params = params;
  }

  ngOnInit(): void {
  }

  editarConsulta(){
    const initialState = {
      currentCita: {
        currentCita: this.params.data,
        editarCita: true,
      },
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-xl'
    };
    console.log('Params', this.params.data);

    this.modalRef = this.modalService.show(AddCitaComponent, {
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'gray modal-xl', initialState,
    });
  }
}

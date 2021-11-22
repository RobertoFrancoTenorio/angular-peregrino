import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-info-consulta',
  templateUrl: './modal-info-consulta.component.html',
  styleUrls: ['./modal-info-consulta.component.scss']
})
export class ModalInfoConsultaComponent implements OnInit {
  @Input() currentConsulta: any = null;
  constructor(
    public modalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    console.log('Data modal', this.currentConsulta);
  }

  cerrarModal() {
    this.modalRef.hide();
  }
}

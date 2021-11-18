import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-modal-edit-pac',
  templateUrl: './modal-edit-pac.component.html',
  styleUrls: ['./modal-edit-pac.component.scss']
})
export class ModalEditPacComponent implements OnInit {

  @Input() idAdicional: string = null;

  constructor(
    public auth: AuthService,
    public modalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    console.log(this.idAdicional);
  }

  cerrarModal(event:any) {
    console.log(event);
    this.modalRef.hide();
  }
}

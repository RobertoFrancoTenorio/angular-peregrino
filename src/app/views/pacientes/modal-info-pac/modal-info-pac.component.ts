import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-info-pac',
  templateUrl: './modal-info-pac.component.html',
  styleUrls: ['./modal-info-pac.component.scss']
})
export class ModalInfoPacComponent implements OnInit {

  @Input() currentPaciente: any = null;
  @Input() detallesBand: boolean = true;
  @Input() antecedentesBand: boolean = false;
  @Input() citasBand: boolean = false;
 

  constructor(public modalRef: BsModalRef,) { }

  ngOnInit(): void {
    this.currentPaciente['edad'] = this.calcularEdad(this.currentPaciente.pac_f_nacimiento);
  }

  calcularEdad(fecha: string) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }

  activarAntecedentes(){
    this.citasBand=false;
    this.detallesBand=false;
    this.antecedentesBand=true;
  }

  activarDetalles(){
    this.citasBand=false;
    this.detallesBand=true;
    this.antecedentesBand=false;
  }

  activarCita(){
    this.citasBand=true;
    this.detallesBand=false;
    this.antecedentesBand=false;
  }

}

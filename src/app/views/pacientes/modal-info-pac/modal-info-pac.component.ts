import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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

  heredoFamForm: FormGroup;
  enfermedades = [
    { id: 'Diabetes', enf: 'Diabetes' },
    { id: 'Presión', enf: 'Presión' },
    { id: 'Alergias', enf: 'Alergias' },
    { id: 'Transfuciones', enf: 'Transfuciones' }
  ];


  constructor(public modalRef: BsModalRef, private fb: FormBuilder) {
    // Create a FormControl for each available music preference, initialize them as unchecked, and put them in an array

    // Create a FormControl for the select/unselect all checkbox
   // const selectAllControl = new FormControl(false);
  
    // Simply add the list of FormControls to the FormGroup as a FormArray, add the selectAllControl separetely
    this.heredoFamForm = this.fb.group({
      padre: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      madre: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      hijo: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      abuelosPaternos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      abuelosMaternos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      //selectAll: selectAllControl
    });
  }

  ngOnInit(): void {
    this.currentPaciente['edad'] = this.calcularEdad(this.currentPaciente.pac_f_nacimiento);
    this.onChanges();
  }

  onChanges(): void {
    // Subscribe to changes on the selectAll checkbox
    /*this.heredoFamForm.get('selectAll').valueChanges.subscribe(bool => {
      console.log(bool);

      this.heredoFamForm
        .get('enfermedades')
        .patchValue(Array(this.enfermedades.length).fill(bool), { emitEvent: false });
    });*/

    // Subscribe to changes on the music preference checkboxes

    this.heredoFamForm.get('padre').valueChanges.subscribe(val => {
      console.log('abuelosMaternos: '+val);
    });

    this.heredoFamForm.get('abuelosMaternos').valueChanges.subscribe(val => {
      console.log('abuelosMaternos: '+val);
    });
  }

  submit() {
    // Filter out the unselected ids
    const selectedPreferences = this.heredoFamForm.value.padre
      .map((checked, index) => checked ? this.enfermedades[index].id : null)
      .filter(value => value !== null);
    // Do something with the result
    console.log('Enfermedades padre: ');
    console.log(selectedPreferences)

    const selectedPreferences2 = this.heredoFamForm.value.madre
      .map((checked, index) => checked ? this.enfermedades[index].id : null)
      .filter(value => value !== null);
    // Do something with the result
    console.log('Enfermedades madre: ');
    console.log(selectedPreferences2)

    let model={
      pac_antecedentes_data : {
        heredo_familiares: {
          padre: selectedPreferences,
          madre: selectedPreferences2
        }
      }
    }

    console.log(model);
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

  activarAntecedentes() {
    this.citasBand = false;
    this.detallesBand = false;
    this.antecedentesBand = true;
  }

  activarDetalles() {
    this.citasBand = false;
    this.detallesBand = true;
    this.antecedentesBand = false;
  }

  activarCita() {
    this.citasBand = true;
    this.detallesBand = false;
    this.antecedentesBand = false;
  }

}

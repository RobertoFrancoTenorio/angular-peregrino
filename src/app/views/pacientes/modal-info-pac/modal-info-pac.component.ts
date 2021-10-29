import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-modal-info-pac',
  templateUrl: './modal-info-pac.component.html',
  styleUrls: ['./modal-info-pac.component.scss']
})
export class ModalInfoPacComponent implements OnInit {
  private stepper: Stepper;

  @Input() currentPaciente: any = null;
  @Input() detallesBand: boolean = true;
  @Input() antecedentesBand: boolean = false;
  @Input() citasBand: boolean = false;

  heredoFamForm: FormGroup;

  seleccionesPadre;
  seleccionesMadre;
  seleccionesAbuelosPat;
  seleccionesAbuelosMat;
  seleccionesHermanos;
  seleccionesOtros;
  alergias;

  enfermedades = [
    { id: 'Diabetes Mellitus', enf: 'Diabetes Mellitus (azúcar alta)' },
    { id: 'Hipertensión Arterial Sistémica', enf: 'Hipertensión Arterial Sistémica (presión alta)' },
    { id: 'Obesidad', enf: 'Obesidad Diagnosticada' },
    { id: 'Neoplasias', enf: 'Neoplasias (Cualquier tipo de cáncer)' },
    { id: 'Malformaciones hereditarias / congenitas', enf: 'Malformaciones hereditarias / congenitas'},
    { id: 'Alergias', enf: 'Alergias a medicamentos, clima, sustancias, etc.'},
    { id: 'Enfermedades psiquiatricas', enf: 'Enfermedades psiquiatricas (Depresión, ansiedad, dsquizofrenia, etc)'},
    { id: 'Enfermedades neurologicas', enf: 'Enfermedades neurologicas (Epilepsia, convulsiones, alzheimer, demencia, parkinson, etc'},
    { id: 'Enfermedades cardiovasculares', enf: 'Enfermedades cardiovasculares (Preinfartos, infartos, colesterol, triglicéridos elevados)'},
    { id: 'Enfermedades broncopulmonares', enf: 'Enfermedades broncopulmonares (Asma, EPOC, bronquitis)'},
    { id: 'Enfermedades tiroideas', enf: 'Enfermedades tiroideas (hiper o hipotiroidismo)'},
    { id: 'Enfermedades renales', enf: 'Enfermedades renales (Litiasis, insuficiencia, diálisis)'},
    { id: 'Enfermedades osteoarticulares', enf: 'Enfermedades osteoarticulares (artritis, fibromialgia)'},
    { id: 'Enfermedades Infectocontagiosas', enf: 'Enfermedades Infectocontagiosas (Infecciones de relevancia)'},
    { id: 'Enfermedades Autoinmunes', enf: 'Enfermedades autoinmunes (LUPUS, artritis, etc.)'}
  ];


  patologias = [
    { id: 'Diabetes Mellitus', value: 'Diabetes Mellitus'},
    { id: 'Hipertensión Arterial Sistémica', value: 'Hipertensión Arterial Sistémica'},
    { id: 'Obesidad', value: 'Obesidad'},
    { id: 'Cancer', value: 'Cancer'},
    { id: 'Artritis Reumatoide', value: 'Artritis Reumatoide'},
    { id: 'Enfermedad de Gota', value: 'Enfermedad de Gota (ácido úrico elevado)'},
    { id: 'Enfermedades Psiquiatricas', value: 'Enfermedades Psiquiatricas (ansiedad, depresión, esquizofrenia)'},
    { id: 'Enfermedades del sistema nervioso', value: 'Enfermedades del sistema nervioso (Epilepsia, covulsiones, alzheimer, demensia, parkinson, etc.'},
    { id: 'Enfermedades del sistema cardiovascular', value: 'Enfermedades del sistema cardiovascular'},
    { id: 'Enfermedades del sistema respiratorio', value: 'Enfermedades del sistema respiratorio'},
    { id: 'Enfermedades del sistema gastrointestinal', value: 'Enfermedades del sistema gastrointestinal'},
    { id: 'Enfermedades del sistema endocrino', value: 'Enfermedades del sistema endocrino'},
    { id: 'Enfermedades del sistema urinario', value: 'Enfermedades del sistema urinario'},
    { id: 'Enfermedades del sistema musculoesqueletico', value: 'Enfermedades del sistema musculoesqueletico (secuelas de lesiones, tenditis'},
    { id: 'Enfermedades del sistema tegumentario', value: 'Enfermedades del sistema tegumentario'},
    { id: 'Otra enfermedad cronico degenerativa', value: 'Otra enfermedad cronico degenerativa'}
  ]

  constructor(public modalRef: BsModalRef, private fb: FormBuilder, private readonly elementRef: ElementRef) {
    // Va agregando un array para cada campo, todos estan inicializados en false
    this.heredoFamForm = this.fb.group({
      padre: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      madre: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      abuelosPaternos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      abuelosMaternos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      hermanos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      otros: new FormArray(this.enfermedades.map(control => new FormControl(false))),

      patolgias: new FormArray(this.patologias.map(control => new FormControl(false))),
      alergia: new FormControl('')
    });

  }

  ngOnInit(): void {
    this.currentPaciente['edad'] = this.calcularEdad(this.currentPaciente.pac_f_nacimiento);
    this.onChanges();
    const nuevo = document.querySelector('.bs-stepper');
    console.log('Nombre: ', nuevo);
  }

  onSubmit() {
    return false;
  }

  onChanges(): void {
    // Subscribe to changes on the music preference checkboxes

    /*this.heredoFamForm.get('padre').valueChanges.subscribe(val => {
    });*/
  }

  submit() {
    // Filter out the unselected ids
    this.seleccionesPadre = this.heredoFamForm.value.padre.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);

    this.seleccionesMadre = this.heredoFamForm.value.madre.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);

    this.seleccionesAbuelosPat = this.heredoFamForm.value.abuelosPaternos.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);

    this.seleccionesAbuelosMat = this.heredoFamForm.value.abuelosMaternos.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);

    this.seleccionesHermanos = this.heredoFamForm.value.hermanos.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);

    this.seleccionesOtros = this.heredoFamForm.value.otros.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);

    this.alergias = this.heredoFamForm.value.alergias;
    // Do something with the result
    console.log('Enfermedades padre: ');
    console.log()

    let model={
      pac_antecedentes_data : {
        heredo_familiares: {
          padre: this.seleccionesPadre,
          madre: this.seleccionesMadre,
          abuelosPaternos: this.seleccionesAbuelosPat,
          abuelosMaternos: this.seleccionesAbuelosMat,
          hermanos: this.seleccionesHermanos,
          otros: this.seleccionesOtros,
          adicciones: this.alergias
        }
      }
    }

    let patologias ={
      pac_patologias_data : {
        adicciones : {

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

  next() {
    this.stepper.next();
  }
}

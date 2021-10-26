import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import * as _ from "lodash";

@Component({
  selector: 'app-heredo-familiares',
  templateUrl: './heredo-familiares.component.html',
  styleUrls: ['./heredo-familiares.component.scss']
})
export class HeredoFamiliaresComponent implements OnInit {

  enfermedades: any[]
  padre: any[]
  Enfermedades: any[];

  heredoFamiliaresForm: FormGroup;

  opcionesSeleccionadas: [string];
  constructor() {
    this.enfermedades = [
      {nombre: 'Diabetes Mellitus'}, {nombre: "Hipertensión Arterial Sistémica"},{nombre: 'Obesidad'},{nombre: 'Neoplasias'},{nombre: 'Malformación hereditaria/ congenita'},{nombre: 'Alergias'},{nombre: 'Enfermedades psiquiatricas'}, {nombre: 'Enfermedades neuroñógicas'},{nombre: 'Enfermedades cardiovasculares'},{nombre: 'Enfermedades broncopulmonares'},{nombre: 'Enfermedades tiroideas'},{nombre: 'Enfermedades renales'},{nombre: 'Enfermedades obsteoarticulares'},{nombre: 'Enfermedades infectocontagiosas'},
    ]
    this.padre = [
      {id: 'pad_diabetesMellitus'}, {id: 'pad_Hipertension'},
    ]

    this.Enfermedades = [
      {id:'General', name: 'Alergicos', value: 'Alergicos'}, {id:'General', name: 'Hospitalizaciones', value: 'quirurgicos'},{id:'General', name: 'Traumaticos', value: 'traumaticos'},{id:'General', name: 'Transfusiones', value: 'transfusiones'},

      {id:'Adicciones', name: 'Alcoholismo', value: 'alcoholismo'}, {id:'Adicciones', name: 'Tabaquismo', value:'tabaquismo'}, {id:'Adicciones', name: 'Otras sustancias psicoactivas', value: 'otras'},

      {id: 'Patologias', name: 'Exantemática subita', value: "Exantemática subita"}, {id: 'Patologias', name: 'Roséola escarlatina', value: 'Roséola escarlatina'}, {id: 'Patologias', name: 'Rúbeola', value: 'rubeola'}, {id: 'Patologias', name: 'Sarampión', value: 'sarampion'}, {id: 'Patologias', name: 'Varicela', value: 'varicela'}, {id: 'Patologias', name: 'Otra patología exantemática', value: 'otra patología exantemática'},

      {id: 'infectocontagiosas', name: 'Faringoamigdalitis', value: 'faringoamigdalitis'}, {id: 'infectocontagiosas', name: 'Fiebre Reumática', value: 'fiebre'}, {id: 'infectocontagiosas', name: 'Hepátitis', value: 'hepatitis'}, {id: 'infectocontagiosas',  name: 'Parasitosis', value: 'Parasitosis' }, {id: 'infectocontagiosas',  name: 'tifoidea', value: 'tifoidea'}, {id: 'infectocontagiosas', name: 'Tifoidea', value: 'tifoidea'}, {id: 'infectocontagiosas', name: 'Transmisión sexual', value: 'transmisionSexual'}, {id: 'infectocontagiosas', name: 'Tuberculosis', value: 'tuberculosis'}, {id: 'infectocontagiosas', name: 'Otra patología infecto contagiosa', value: 'otraPatologia'},

      {id: 'Cronicas', name: 'Diabetes Mellitus', value: 'diabetesMellitus'}, {id: 'Cronicas', name: 'Hipertensión Arterial Sistémica', value: 'hipertensionArterialSistémica' }, {id: 'Cronicas', name: 'Obesidad', value: 'obesidad'}, {id: 'Cronicas', name: 'Neoplasticas', value: 'neoplasticas'}, {id: 'Cronicas', name: 'Artitris Reumatoide', value: 'artritisReumatoide'}, {id: 'Cronicas', name: 'Enfermedad de Gota', value: 'Enfermedad de Gota'}, {id: 'Cronicas', name: 'Enfermedades psiquiatricas', value: 'Enfermedades Psiquiatricas'}, {id: 'Cronicas', name: 'Enfermedades del Sistema Nervioso', value: 'Enfermedades del Sistema Nervioso'}, {id: 'Cronicas', name: 'Enfermedades del Sistema Cardiovascular', value: 'Enfermedades del Sistema Cardiovascular'}, {id: 'Cronicas', name: 'Enfermedades del Sistema Respiratorio', value: 'Enfermedades del Sistema Respiratorio'},
      {id: 'Cronicas', name: 'Enfermedades del Sistema gastrointestinal', vale: 'Enfermedades del Sistema gastrointestinal'}, {id: 'Cronicas', name: 'Enfermedades del Sistema endocrino', value: 'Enfermedades del Sistema endocrino'}, {id: 'Cronicas', name: 'Enfermedades del Sistema Urinario', value: 'Enfermedades del Sistema Urinario'}, { id: 'Cronicas', name: 'Enfermedades del Sistema musculoesqueletico'}, { id: 'Cronicas', name: 'Enfermedades del Sistema tegumentario', value: 'Enfermedades del Sistema tegumentario'}, {id: 'Cronicas', name: 'Otra enfermedad cronico degenerativa', value: 'Otra enfermedad cronico degenerativa'}
    ]

  }


  ngOnInit(): void {

  }

  createFormInputs(){
    this.heredoFamiliaresForm = new FormGroup({
      enfer: this.createEnfermedades(this.Enfermedades)
    })
  }

  createEnfermedades(EnfermedadesInput){
    const arr = EnfermedadesInput.map( enfermedad => {
      return new FormControl(enfermedad.selected || false)
    });
    return new FormArray(arr)
  }

  getSelectedEnfermedades(){
    this.opcionesSeleccionadas = _.map(
      this.heredoFamiliaresForm.controls.enfermedades["controls"],
      (enfermedad, i) =>{
        return enfermedad.value && this.enfermedades[i].value;
      }
    )
  }

  getSelectedEnfermedadesName(){
    this.opcionesSeleccionadas = _.filter(
      this.opcionesSeleccionadas,
      function(enfermedad){
        if(enfermedad !== false){
          return enfermedad
        }
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'app-multicheckbox',
  templateUrl: './multicheckbox.component.html',
  styleUrls: ['./multicheckbox.component.scss']
})
export class MulticheckboxComponent implements OnInit {
  personForm: FormGroup;
  selectedHobbiesNames: [string];
  myhobbies: any = [
    {id:'General', name: 'Alergicos', value: 'Alergicos'}, {id:'General', name: 'Hospitalizaciones', value: 'Hospitalizaciones'},{id:'General', name: 'Traumáticos', value: 'Traumáticos'},{id:'General', name: 'Transfusiones', value: 'Transfusiones'},

      {id:'Adicciones', name: 'Alcoholismo', value: 'Alcoholismo'}, {id:'Adicciones', name: 'Tabaquismo', value:'Tabaquismo'}, {id:'Adicciones', name: 'Otras sustancias psicoactivas', value: 'Otras sustancias psicoactivas'},

      {id: 'Patologias', name: 'Exantemática subita', value: "Exantemática subita"}, {id: 'Patologias', name: 'Roséola escarlatina', value: 'Roséola escarlatina'}, {id: 'Patologias', name: 'Rúbeola', value: 'Rúbeola'}, {id: 'Patologias', name: 'Sarampión', value: 'Sarampión'}, {id: 'Patologias', name: 'Varicela', value: 'Varicela'}, {id: 'Patologias', name: 'Otra patología exantemática', value: 'otra patología exantemática'},

      {id: 'infectocontagiosas', name: 'Faringoamigdalitis', value: 'Faringoamigdalitis'}, {id: 'infectocontagiosas', name: 'Fiebre Reumática', value: 'Fiebre Reumática'}, {id: 'infectocontagiosas', name: 'Hepátitis', value: 'hepatitis'}, {id: 'infectocontagiosas',  name: 'Parasitosis', value: 'Parasitosis' }, {id: 'infectocontagiosas', name: 'Tifoidea', value: 'tifoidea'}, {id: 'infectocontagiosas', name: 'Transmisión sexual', value: 'Transmisión sexual'}, {id: 'infectocontagiosas', name: 'Tuberculosis', value: 'Tuberculosis'}, {id: 'infectocontagiosas', name: 'Otra patología infecto contagiosa', value: 'Otra patología infecto contagiosa'},

      {id: 'Cronicas', name: 'Diabetes Mellitus', value: 'Diabetes Mellitus'}, {id: 'Cronicas', name: 'Hipertensión Arterial Sistémica', value: 'Hipertensión Arterial Sistémica' }, {id: 'Cronicas', name: 'Obesidad', value: 'Obesidad'}, {id: 'Cronicas', name: 'Neoplasticas', value: 'Neoplasticas'}, {id: 'Cronicas', name: 'Artitris Reumatoide', value: 'Artitris Reumatoide'}, {id: 'Cronicas', name: 'Enfermedad de Gota', value: 'Enfermedad de Gota'}, {id: 'Cronicas', name: 'Enfermedades psiquiatricas', value: 'Enfermedades Psiquiatricas'}, {id: 'Cronicas', name: 'Enfermedades del Sistema Nervioso', value: 'Enfermedades del Sistema Nervioso'}, {id: 'Cronicas', name: 'Enfermedades del Sistema Cardiovascular', value: 'Enfermedades del Sistema Cardiovascular'}, {id: 'Cronicas', name: 'Enfermedades del Sistema Respiratorio', value: 'Enfermedades del Sistema Respiratorio'},
      {id: 'Cronicas', name: 'Enfermedades del Sistema gastrointestinal', value: 'Enfermedades del Sistema gastrointestinal'}, {id: 'Cronicas', name: 'Enfermedades del Sistema endocrino', value: 'Enfermedades del Sistema endocrino'}, {id: 'Cronicas', name: 'Enfermedades del Sistema Urinario', value: 'Enfermedades del Sistema Urinario'}, { id: 'Cronicas', name: 'Enfermedades del Sistema musculoesqueletico', value: 'Enfermedades del Sistema musculoesqueletico'}, { id: 'Cronicas', name: 'Enfermedades del Sistema tegumentario', value: 'Enfermedades del Sistema tegumentario'}, {id: 'Cronicas', name: 'Otra enfermedad cronico degenerativa', value: 'Otra enfermedad cronico degenerativa'}
  ];

  constructor() { }

  ngOnInit() {
    this.createFormInputs();
  }

  createFormInputs() {
    this.personForm = new FormGroup({
      hobbies: this.createHobbies(this.myhobbies)
    });
    this.getSelectedHobbies();
  }

  createHobbies(hobbiesInputs) {
    const arr = hobbiesInputs.map(hobby => {
      return new FormControl(hobby.selected || false);
    });
    return new FormArray(arr);
  }

  getSelectedHobbies() {
    this.selectedHobbiesNames = _.map(
      this.personForm.controls.hobbies["controls"],
      (hobby, i) => {
        return hobby.value && this.myhobbies[i].value;
      }
    );
    this.getSelectedHobbiesName();
  }

  getSelectedHobbiesName() {
    this.selectedHobbiesNames = _.filter(
      this.selectedHobbiesNames,
      function(hobby) {
        if (hobby !== false) {
          return hobby;
        }
      }
    );
  }

  get f(){
    return this.personForm.controls;
  }
}

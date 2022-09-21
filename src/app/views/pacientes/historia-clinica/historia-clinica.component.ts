import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from './../../../service/paciente/paciente.service';
import { CitaService } from '../../../service/cita/cita.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinicaAPIService } from '../../../service/APIServices/HistoriaClinica/historia-clinica-api.service';
import { AuthService } from '../../../service/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {
  @Input() pac_sexo;
  @Input() editar: boolean = false;
  @Input() idPaciente;
  @Output() cerrarModal = new EventEmitter<any>();

  isLinear = true;
  id: any = null;
  bandSexo;

  heredoFamForm: FormGroup;
  PatologiasForm: FormGroup;
  GinecoObstricoForm: FormGroup;
  AlergiasForm: FormGroup;
  HospitalizacionesForm: FormGroup;
  QuirurgicasForm: FormGroup;
  TraumaticosForm: FormGroup;
  TransfusionesForm: FormGroup;
  PsicoactivasForm: FormGroup;
  NoPatologicosForm: FormGroup;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  ActividadesFisicasForm = this.fb.group({
    pac_actividad_fisica: ['', Validators.required],
    pac_frecuencia_act_fisica: ['', Validators.required]
  })

  MedicamentosForm = this.fb.group({
    medicamento_nombre: ['', Validators.required],
    medicamento_frecuencia_consumo: ['',Validators.required],
    medicamento_inicio_de_consumo: ['', Validators.required],
  })

  infoHistoriaClinica = [];

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

  patologicas = [
    { id: 'Diabetes Mellitus', value: 'Diabetes Mellitus'},
    { id: 'Hipertensión Arterial Sistémica', value: 'Hipertensión Arterial Sistémica'},
    { id: 'Obesidad', value: 'Obesidad'},
    { id: 'Cancer', value: 'Cancer'},
    { id: 'Artritis Reumatoide', value: 'Artritis Reumatoide'},
    { id: 'Enfermedad de Gota', value: 'Enfermedad de Gota (ácido úrico elevado)'},
    { id: 'Enf. Psiquiatricas', value: 'Enfermedades Psiquiatricas (ansiedad, depresión, esquizofrenia)'},
    { id: 'Enf. del sistema nervioso', value: 'Enfermedades del sistema nervioso (Epilepsia, covulsiones, alzheimer, demensia, parkinson, etc.'},
    { id: 'Enf. del sistema cardiovascular', value: 'Enfermedades del sistema cardiovascular'},
    { id: 'Enf. del sistema respiratorio', value: 'Enfermedades del sistema respiratorio'},
    { id: 'Enf. del sistema gastrointestinal', value: 'Enfermedades del sistema gastrointestinal'},
    { id: 'Enf. del sistema endocrino', value: 'Enfermedades del sistema endocrino'},
    { id: 'Enf. del sistema urinario', value: 'Enfermedades del sistema urinario'},
    { id: 'Enf. del sistema musculoesqueletico', value: 'Enfermedades del sistema musculoesqueletico (secuelas de lesiones, tenditis'},
    { id: 'Enf. del sistema tegumentario', value: 'Enfermedades del sistema tegumentario'},
    { id: 'Otra enfermedad cronico degenerativa', value: 'Otra enfermedad cronico degenerativa'}
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private AuthService: AuthService,
    private PacienteService: PacienteService,
    private HistoriaClinicaAPIService: HistoriaClinicaAPIService,
    ) {
    // Va agregando un array para cada campo, todos estan inicializados en false
  }

  async ngOnInit(): Promise<void> {
    console.log('sexo', this.pac_sexo)
    if(this.editar){
      this.constructorForms()
      await this.getData()
    }
    else{
      this.constructorForms()
    }

    console.log('id', this.idPaciente)
    //this.onChanges();
  }

  constructorForms(){
    this.heredoFamForm = this.fb.group({
      padre: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      madre: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      abuelosPaternos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      abuelosMaternos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      hermanos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      otros: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      observaciones: ('')
    });

    this.PatologiasForm = this.fb.group({
      patologias: new FormArray(this.patologicas.map(control => new FormControl((false)))),
      Medicamento: this.fb.array([]),
      observaciones: ([''])
    })

    this.AlergiasForm = this.fb.group({
      alergias: ['', Validators.required],
      alergia_tipo: ['', Validators.required],
    })

    this.HospitalizacionesForm = this.fb.group({
      hospitalizaciones: ['', Validators.required],
      hospitalizacion_fecha: ['', Validators.required],
      hospitalizacion_causa: ['', Validators.required],
      hospitalizacion_secuela: ['', Validators.required],
    })

    this.QuirurgicasForm = this.fb.group({
      quirurgicas: ['', Validators.required],
      quirurgico_fecha:  ['', Validators.required],
      quirurgico_causa:  ['', Validators.required],
      quirurgico_secuela: ['', Validators.required],
    })

    this.TraumaticosForm = this.fb.group({
      traumaticos: ['', Validators.required],
      traumatismo_fecha: ['', Validators.required],
      traumatismo_tipo: ['', Validators.required],
      traumatismo_causa: ['', Validators.required],
      traumatismo_secuela: ['', Validators.required],
    })

    this.TransfusionesForm = this.fb.group({
      transfusiones: ['', Validators.required],
      transfusion_fecha: ['', Validators.required],
      transfusion_causa: ['', Validators.required],
    })

    this.PsicoactivasForm = this.fb.group({
      consumo_alguna_sustancia: ['', Validators.required],
      sustancia_psicoactiva_alcohol: ['', Validators.required],
      sustancia_psicoactiva_alcohol_frecuencia: ['', Validators.required],
      sustancia_psicoactiva_alcohol_cantidad: ['', Validators.required],

      sustancia_psicoactiva_tabaco: ['', Validators.required],
      sustancia_psicoactiva_tabaco_frecuencia: ['', Validators.required],
      sustancia_psicoactiva_tabaco_cantidad: ['', Validators.required],

      sustancia_psicoactiva_otra: ['', Validators.required],
      sustancia_psicoactiva_otra_tipo: ['', Validators.required],
      sustancia_psicoactiva_otra_ultimo_consumo: ['', Validators.required],
      sustancia_psicoactiva_otra_frecuencia: ['', Validators.required],
    })

    this.GinecoObstricoForm = this.fb.group({
      pac_menarquia: ['', Validators.required],
      menstruacion_fecha_Ultima: ['', Validators.required],
      menstruacion_duracion: ['', Validators.required],
      menstruacion_cantidad: ['', Validators.required],
      menstruacion_frecuencia: ['', Validators.required],
      menstruacion_presencia_De_Dolor: ['', Validators.required],
      menstruacion_otras_secreciones: ['', Validators.required],

      androgenico_vida_sexual_activa: ['', Validators.required],
      androgenico_inicio_vida_sexual: ['', Validators.required],
      androgenico_no_comp_sexuales: ['', Validators.required],
      androgenico_metodo_anticonceptivo: ['', Validators.required],
      androgenico_tipo_relaciones: ['', Validators.required],
      androgenico_ets: ['', Validators.required],
      androgenico_metodo_anticonceptivo_hormonal: ['', Validators.required],
      androgenico_androgenico_pac_metodo_anticonceptivo_hormonal_diu: ['', Validators.required],

      ExamenProstata: [''],
      fecha_ultimo_Examen_Prostatico: ['', Validators.required],
      observaciones_ultimo_examen_prostatico: ['', Validators.required],

      pac_gestaciones: ['', Validators.required],
      gestacion_cantidad: ['', Validators.required],
      gestacion_ultima_fecha: ['', Validators.required],
      gestacion_observacion: ['', Validators.required],

      pac_partos: ['', Validators.required],
      parto_cantidad: ['', Validators.required],
      parto_ultima_fecha: ['', Validators.required],
      parto_observacion: ['', Validators.required],

      pac_abortos: ['', Validators.required],
      aboto_cantidad: ['', Validators.required],
      aborto_ultima_fecha: ['', Validators.required],
      aborto_observacion: ['', Validators.required],

      pac_cesareas: ['', Validators.required],
      cesarea_cantidad: ['', Validators.required],
      cesarea_ultima_fecha: ['', Validators.required],
      cesarea_observacion: ['',Validators.required],

      pac_papanicolau: ['', Validators.required],
      papanicolau_fecha: ['', Validators.required],
      papanicolau_observacion: ['', Validators.required],

      pac_tamis_mama: ['', Validators.required],
      tamis_fecha: ['', Validators.required],
      tamis_observacion: ['', Validators.required],
    })

    this.NoPatologicosForm = this.fb.group({
      pac_mascota: ['', Validators.required],
      pac_mascota_tipo: ['', Validators.required],
      pac_NumeroHabitaciones: ['', Validators.required],
      pac_NumeroHabitantes: ['', Validators.required],
      pac_ConsumoDeAlimentosCapeados: ['', Validators.required],
      pac_GruposAlimenticios: ['', Validators.required],
      pac_CantidadDeComidasAlDia: ['', Validators.required],
      pac_ConsumoDePan: ['', Validators.required],
      pac_ConsumoDeSal: ['', Validators.required],
      pac_ConsumoDeRefresco: ['', Validators.required],
      observaciones: [''],
      Actividades_Fisicas: this.fb.array([]),
    })
  }

  onSubmit() {
    return false;
  }

  onChanges(): void {
  /*  this.NoPatologicosForm.get("mascota").valueChanges.subscribe(data => {
      if (data == "Si"){
        this.NoPatologicosForm.get("pac_mascota_tipo").enable();
      }
      else {
        this.NoPatologicosForm.get("pac_mascota_tipo").disable();
      }
    }) */
    this.AlergiasForm.get("alergias").valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.AlergiasForm.get("alergia_tipo").enable()
      }
      else{
        this.AlergiasForm.get("alergia_tipo").disable()
      }
    })
    this.HospitalizacionesForm.get("hospitalizaciones").valueChanges.subscribe(data =>{
      if (data == "Si"){
        this.HospitalizacionesForm.get("hospitalizacion_fecha").enable();
        this.HospitalizacionesForm.get("hospitalizacion_causa").enable();
        this.HospitalizacionesForm.get("hospitalizacion_secuela").enable();
      }
      else{
        this.HospitalizacionesForm.get("hospitalizacion_fecha").disable();
        this.HospitalizacionesForm.get("hospitalizacion_causa").disable();
        this.HospitalizacionesForm.get("hospitalizacion_secuela").disable();
      }
    })
    this.QuirurgicasForm.get("quirurgicas").valueChanges.subscribe(data =>{
      if (data == "Si"){
        this.QuirurgicasForm.get("quirurgico_fecha").enable();
        this.QuirurgicasForm.get("quirurgico_causa").enable();
        this.QuirurgicasForm.get("quirurgico_secuela").enable();
      }
      else{
        this.QuirurgicasForm.get("quirurgico_fecha").disable();
        this.QuirurgicasForm.get("quirurgico_causa").disable();
        this.QuirurgicasForm.get("quirurgico_secuela").disable();
      }
    })
    this.TraumaticosForm.get('traumaticos').valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.TraumaticosForm.get("traumatismo_fecha").enable();
        this.TraumaticosForm.get("traumatismo_tipo").enable();
        this.TraumaticosForm.get("traumatismo_causa").enable();
        this.TraumaticosForm.get("traumatismo_secuela").enable();
      }
      else{
        this.TraumaticosForm.get("traumatismo_fecha").disable();
        this.TraumaticosForm.get("traumatismo_tipo").disable();
        this.TraumaticosForm.get("traumatismo_causa").disable();
        this.TraumaticosForm.get("traumatismo_secuela").disable();
      }
    })
    this.TransfusionesForm.get("transfusiones").valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.TransfusionesForm.get('transfusion_fecha').enable();
        this.TransfusionesForm.get('transfusion_causa').enable();
      }
      else{
        this.TransfusionesForm.get('transfusion_fecha').disable();
        this.TransfusionesForm.get('transfusion_causa').disable();
      }
    })
    this.PsicoactivasForm.get('sustancia_psicoactiva_alcohol').valueChanges.subscribe(data =>{
      if (data == "Si"){
        this.PsicoactivasForm.get("sustancia_psicoactiva_alcohol_frecuencia").enable();
        this.PsicoactivasForm.get("sustancia_psicoactiva_alcohol_cantidad").enable();
      }
      else{
        this.PsicoactivasForm.get("sustancia_psicoactiva_alcohol_frecuencia").disable();
        this.PsicoactivasForm.get("sustancia_psicoactiva_alcohol_cantidad").disable();
      }
    })
    this.PsicoactivasForm.get('sustancia_psicoactiva_tabaco').valueChanges.subscribe(data =>{
      if (data == "Si"){
        this.PsicoactivasForm.get("sustancia_psicoactiva_tabaco_frecuencia").enable();
        this.PsicoactivasForm.get("sustancia_psicoactiva_tabaco_cantidad").enable();
      }
      else{
        this.PsicoactivasForm.get("sustancia_psicoactiva_tabaco_frecuencia").disable();
        this.PsicoactivasForm.get("sustancia_psicoactiva_tabaco_cantidad").disable();
      }
    })
    this.PsicoactivasForm.get('sustancia_psicoactiva_otra').valueChanges.subscribe(data =>{
      if (data == "Si"){
        this.PsicoactivasForm.get("sustancia_psicoactiva_otra_tipo").enable();
        this.PsicoactivasForm.get("sustancia_psicoactiva_otra_ultimo_consumo").enable();
        this.PsicoactivasForm.get("sustancia_psicoactiva_otra_frecuencia").enable();
      }
      else{
        this.PsicoactivasForm.get("sustancia_psicoactiva_otra_tipo").disable();
        this.PsicoactivasForm.get("sustancia_psicoactiva_otra_ultimo_consumo").disable();
        this.PsicoactivasForm.get("sustancia_psicoactiva_otra_frecuencia").disable();
      }
    })
    if(this.bandSexo == 'M'){
      this.GinecoObstricoForm.get("pac_menarquia").disable();
      this.GinecoObstricoForm.get("menstruacion_fecha_Ultima").disable();
      this.GinecoObstricoForm.get("menstruacion_duracion").disable();
      this.GinecoObstricoForm.get("menstruacion_frecuencia").disable();
      this.GinecoObstricoForm.get("menstruacion_cantidad").disable();
      this.GinecoObstricoForm.get("menstruacion_presencia_De_Dolor").disable();
      this.GinecoObstricoForm.get("menstruacion_otras_secreciones").disable();
      this.GinecoObstricoForm.get("pac_gestaciones").disable();
      this.GinecoObstricoForm.get("pac_partos").disable();
      this.GinecoObstricoForm.get("pac_abortos").disable();
      this.GinecoObstricoForm.get("pac_cesareas").disable();
      this.GinecoObstricoForm.get("aboto_cantidad").disable();
      this.GinecoObstricoForm.get("cesarea_cantidad").disable();
      this.GinecoObstricoForm.get("gestacion_cantidad").disable();
      this.GinecoObstricoForm.get("parto_cantidad").disable();
      this.GinecoObstricoForm.get("pac_papanicolau").disable();
      this.GinecoObstricoForm.get("papanicolau_fecha").disable();
      this.GinecoObstricoForm.get("papanicolau_observacion").disable();
      this.GinecoObstricoForm.get("tamis_fecha").disable();
      this.GinecoObstricoForm.get("pac_tamis_mama").disable();
      this.GinecoObstricoForm.get("tamis_observacion").disable();
      this.GinecoObstricoForm.get("cesarea_ultima_fecha").disable();
      this.GinecoObstricoForm.get("cesarea_observacion").disable();
      this.GinecoObstricoForm.get("gestacion_ultima_fecha").disable();
      this.GinecoObstricoForm.get("gestacion_observacion").disable();
      this.GinecoObstricoForm.get("aborto_ultima_fecha").disable();
      this.GinecoObstricoForm.get("parto_ultima_fecha").disable();
      this.GinecoObstricoForm.get("parto_observacion").disable();
      this.GinecoObstricoForm.get("aborto_observacion").disable();
    }
    else{
      this.GinecoObstricoForm.get("pac_menarquia").enable();
      this.GinecoObstricoForm.get("menstruacion_fecha_Ultima").enable();
      this.GinecoObstricoForm.get("menstruacion_duracion").enable();
      this.GinecoObstricoForm.get("menstruacion_frecuencia").enable();
      this.GinecoObstricoForm.get("menstruacion_cantidad").enable();
      this.GinecoObstricoForm.get("menstruacion_presencia_De_Dolor").enable();
      this.GinecoObstricoForm.get("menstruacion_otras_secreciones").enable();
      this.GinecoObstricoForm.get("pac_gestaciones").enable();
      this.GinecoObstricoForm.get("pac_partos").enable();
      this.GinecoObstricoForm.get("pac_abortos").enable();
      this.GinecoObstricoForm.get("pac_cesareas").enable();
      this.GinecoObstricoForm.get("ExamenProstata").enable();
      this.GinecoObstricoForm.get("fecha_ultimo_Examen_Prostatico").enable();
      this.GinecoObstricoForm.get("observaciones_ultimo_examen_prostatico").enable();

    }
    this.GinecoObstricoForm.get('ExamenProstata').valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.GinecoObstricoForm.get("fecha_ultimo_Examen_Prostatico").enable();
        this.GinecoObstricoForm.get("observaciones_ultimo_examen_prostatico").enable();
      }else{
        this.GinecoObstricoForm.get("fecha_ultimo_Examen_Prostatico").disable();
        this.GinecoObstricoForm.get("observaciones_ultimo_examen_prostatico").disable();
      }
    })
    this.GinecoObstricoForm.get('androgenico_metodo_anticonceptivo').valueChanges.subscribe(data =>{
      if(data == 'Hormonal'){
        this.GinecoObstricoForm.get('androgenico_metodo_anticonceptivo_hormonal').enable();
      }
      else{
        this.GinecoObstricoForm.get('androgenico_metodo_anticonceptivo_hormonal').disable();
      }
    })
    this.GinecoObstricoForm.get('androgenico_metodo_anticonceptivo_hormonal').valueChanges.subscribe(data =>{
      if(data == 'DIU'){
        this.GinecoObstricoForm.get('androgenico_androgenico_pac_metodo_anticonceptivo_hormonal_diu').enable();
      }
      else{
        this.GinecoObstricoForm.get('androgenico_pac_metodo_anticonceptivo_hormonal_diu').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_gestaciones').valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.GinecoObstricoForm.get('gestacion_cantidad').enable();
        this.GinecoObstricoForm.get('gestacion_ultima_fecha').enable();
        this.GinecoObstricoForm.get('gestacion_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('gestacion_cantidad').disable();
        this.GinecoObstricoForm.get('gestacion_ultima_fecha').disable();
        this.GinecoObstricoForm.get('gestacion_observacion').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_partos').valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.GinecoObstricoForm.get('parto_cantidad').enable();
        this.GinecoObstricoForm.get('parto_ultima_fecha').enable();
        this.GinecoObstricoForm.get('parto_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('parto_cantidad').disable();
        this.GinecoObstricoForm.get('parto_ultima_fecha').disable();
        this.GinecoObstricoForm.get('parto_observacion').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_abortos').valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.GinecoObstricoForm.get('aboto_cantidad').enable();
        this.GinecoObstricoForm.get('aborto_ultima_fecha').enable();
        this.GinecoObstricoForm.get('aborto_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('aboto_cantidad').disable();
        this.GinecoObstricoForm.get('aborto_ultima_fecha').disable();
        this.GinecoObstricoForm.get('aborto_observacion').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_cesareas').valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.GinecoObstricoForm.get('cesarea_cantidad').enable();
        this.GinecoObstricoForm.get('cesarea_ultima_fecha').enable();
        this.GinecoObstricoForm.get('cesarea_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('cesarea_cantidad').disable();
        this.GinecoObstricoForm.get('cesarea_ultima_fecha').disable();
        this.GinecoObstricoForm.get('cesarea_observacion').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_papanicolau').valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.GinecoObstricoForm.get('papanicolau_fecha').enable();
        this.GinecoObstricoForm.get('papanicolau_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('papanicolau_fecha').enable();
        this.GinecoObstricoForm.get('papanicolau_observacion').enable();
      }
    })
    this.GinecoObstricoForm.get('pac_tamis_mama').valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.GinecoObstricoForm.get('tamis_fecha').enable();
        this.GinecoObstricoForm.get('tamis_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('tamis_fecha').enable();
        this.GinecoObstricoForm.get('tamis_observacion').enable();
      }
    })
  }

  submit() {
  }

  alertGuardado(){
    Swal.fire({
      title: 'Historia Clínica Completa',
      text: 'Se ha completado correctamente los antecedentes.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(()=>{
      this.heredoFamForm.reset();
      this.AlergiasForm.reset();
      this.GinecoObstricoForm.reset();
      this.PatologiasForm.reset();
      this.QuirurgicasForm.reset();
      this.HospitalizacionesForm.reset();
      this.NoPatologicosForm.reset();
      this.TraumaticosForm.reset();
      this.TransfusionesForm.reset();
      this.router.navigate(['pacientes']);
      return false;
    })
  }

  alertEditado(){
    Swal.fire({
      title: 'Historia Clínica Completa',
      text: 'Se ha editado correctamente los antecedentes.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(()=>{
      this.heredoFamForm.reset();
      this.AlergiasForm.reset();
      this.GinecoObstricoForm.reset();
      this.PatologiasForm.reset();
      this.QuirurgicasForm.reset();
      this.HospitalizacionesForm.reset();
      this.NoPatologicosForm.reset();
      this.TraumaticosForm.reset();
      this.TransfusionesForm.reset();
      this.router.navigate(['pacientes']);
      return false;
    })
  }

  get act_fisicas(){
    return this.NoPatologicosForm.controls["Actividades_Fisicas"] as FormArray;
  }

  addActividades(){
    const actividad = this.fb.group({
      pac_actividad_fisica: [''],
      pac_actividad_frec: [''],
    })
    this.act_fisicas.push(actividad);
  }

  deleteActividad(actId: number){
    this.act_fisicas.removeAt(actId);
  }

  get list_medicamentos(){
    return this.PatologiasForm.controls["Medicamento"] as FormArray;
  }

  addMedicamento(){
    const med = this.fb.group({
      medicamento_nombre: ['', [Validators.required]],
      medicamento_frecuencia_consumo: ['', [Validators.required]],
      medicamento_inicio_de_consumo: ['', [Validators.required]],
    })
    this.list_medicamentos.push(med);
  }

  deleteMedicamento(medicamentoId: number){
    return this.list_medicamentos.removeAt(medicamentoId);
  }

  postHistoriaClinica(){
    let post = {};
    post['id_register'] = this.AuthService.currentUserId;
    post['idPaciente'] = this.idPaciente;

    this.HistoriaClinicaAPIService.postHistoriaClinica(post).subscribe(data => {
      console.log('HC', data)

      this.postNoPatologico(data.idHistoriaClinica);
      this.postPatologico(data.idHistoriaClinica);
      this.postAndrogenicos(data.idHistoriaClinica);
      if(this.pac_sexo == 'M'){
        this.postAntecedenteProstatico(data.idHistoriaClinica);
      }
      else{
        this.postAntecedenteGinecobstetrico(data.idHistoriaClinica);
      }
    })
  }

  postNoPatologico(idHistoriaClinica: number):void{
    console.log('idHistoriaClinica', idHistoriaClinica)
    let noPat = this.NoPatologicosForm.value;
    let actividadesFisicas : [] = noPat['Actividades_Fisicas'];

    noPat['idHistoriaClinica'] = idHistoriaClinica;
    delete noPat['Actividades_Fisicas'];
    console.log('post', noPat)

    this.HistoriaClinicaAPIService.postNoPatologico(noPat).subscribe(data =>{
      for(let i = 0; i < actividadesFisicas.length; i++){
        let actividad = {};
        actividad['idAntecedenteNoPatologico'] = data.idAntecedenteNoPatologico;
        actividad['actividad_nombre'] = actividadesFisicas[i]['pac_actividad_fisica'];
        actividad['actividad_frecuencia'] = actividadesFisicas[i]['pac_actividad_frec'];
        actividad['estatusActividadFisica'] = true;
        console.log('actividad [', i, ']', actividad);
        this.HistoriaClinicaAPIService.postActividadFisica(actividad).subscribe(data => {
          console.log('data', data)
        })
      }
    });
  }

  postPatologico(idHistoriaClinica: number): void{
    let POST = {};
    POST['idHistoriaClinica'] = idHistoriaClinica;
    POST['antecedente_patologico_hospitalizacion'] = this.HospitalizacionesForm.value.hospitalizaciones;
    POST['antecedente_patologico_quirugicas'] = this.QuirurgicasForm.value.quirurgicas;
    POST['antecedente_patologico_trumatismo'] = this.TraumaticosForm.value.traumaticos;
    POST['antecedente_patologico_trasnfusion'] = this.TransfusionesForm.value.transfusiones;
    POST['antecedente_patologico_consumo_de_sustancia_psicoactiva'] = this.PsicoactivasForm.value.consumo_alguna_sustancia;
    POST['antecedente_patologico_alergias'] = this.AlergiasForm.value.alergias;
    this.HistoriaClinicaAPIService.postPatologico(POST).subscribe(data =>{
      this.postHeredoFamiliares(data.id);

      if(POST['antecedente_patologico_hospitalizacion'] == 'Si'){
        let hospitalizacion: {} = this.HospitalizacionesForm.value;
        hospitalizacion['idAntecedentePatologico'] = data.id;
        delete hospitalizacion['hospitalizaciones'];
        this.HistoriaClinicaAPIService.postHospitalizacion(hospitalizacion).subscribe(hospitalizacion => {
          console.log('hospitalizacion', hospitalizacion)
        })
      }

      if(POST['antecedente_patologico_alergias'] == 'Si'){
        let alergia = this.AlergiasForm.value;
        delete alergia['hospitalizaciones'];
        alergia['idAntecedentePatologico'] = data.id;
        this.HistoriaClinicaAPIService.postAlergia(alergia).subscribe(alergia =>{
          console.log('alergia', alergia)
        })
      }

      if(POST['antecedente_patologico_quirugicas'] == 'Si'){
        let quirurgica = this.QuirurgicasForm.value;
        delete quirurgica['quirurgicas'];
        quirurgica['idAntecedentePatologico'] = data.id;
        this.HistoriaClinicaAPIService.postQuirurgica(quirurgica).subscribe(quirurgica =>{
          console.log('quirurgica', quirurgica);
        })
      }

      if(POST['antecedente_patologico_trumatismo'] == 'Si'){
        let traumatismo = this.TraumaticosForm.value;
        delete traumatismo['traumaticos'];
        traumatismo['idAntecedentePatologico'] = data.id;
        console.log('traumatismo', traumatismo)
        this.HistoriaClinicaAPIService.postTraumatismo(traumatismo).subscribe(traumatismo =>{
          console.log('quirurgica', traumatismo);
        })
      }

      if(POST['antecedente_patologico_trasnfusion'] == 'Si'){
        let transfusion = this.TransfusionesForm.value;
        delete transfusion['transfusiones'];
        transfusion['idAntecedentePatologico'] = data.id;
        console.log('transfusion', transfusion)
        this.HistoriaClinicaAPIService.postTransfusion(transfusion).subscribe(transfusion =>{
          console.log('transfusion', transfusion);
        })
      }

      if(POST['antecedente_patologico_consumo_de_sustancia_psicoactiva'] == 'Si'){
        let sustancias = this.PsicoactivasForm.value;
        sustancias['idAntecedentePatologico'] = data.id;
        console.log('sustancias', sustancias)
        this.HistoriaClinicaAPIService.postSustanciasPsicoactivas(sustancias).subscribe(sustancias =>{
          console.log('sustancia_psicoactiva_otra', sustancias);
        })
      }

      let padecimientos: [] = this.PatologiasForm.value.patologias.map((checked, index) => checked ? this.patologicas[index].id : null).filter(value => value !== null);
      for(let i = 0; i < padecimientos.length; i++){
        let padecimiento = {};
        padecimiento['padecimiento'] = padecimientos[i];
        padecimiento['idAntecedentePatologico'] = data.id;
        padecimiento['padecimiento_estatus'] = true;
        this.HistoriaClinicaAPIService.postPadecimiento(padecimiento).subscribe(padecimiento=>{
          console.log('padecimiento', padecimiento)
        })
      }

      let medicamentos: [] = this.PatologiasForm.value.Medicamento;
      if(medicamentos.length > 0){
        let detalleMedicamento: {} = {};
        detalleMedicamento['idAntecedentePatologico'] = data.id;
        this.HistoriaClinicaAPIService.postDetalleMedicamento(detalleMedicamento).subscribe(detalle =>{
          console.log('detalleMedicamento', detalle)
          for(let i = 0; i < medicamentos.length; i++){
            let medicamento: {} = {};
            medicamento = medicamentos[i];
            medicamento['idDetalleMedicamento'] = detalle.id
            this.HistoriaClinicaAPIService.postMedicamento(medicamento).subscribe(medicamento => {
              console.log('medicamento', medicamento)
            })
          }
        })
      }

    })
  }

  postAndrogenicos(idHistoriaClinica: number): void {
    let androgenico:{} = {};
    androgenico['androgenico_vida_sexual_activa'] = this.GinecoObstricoForm.value.androgenico_vida_sexual_activa;
    androgenico['androgenico_inicio_vida_sexual'] = this.GinecoObstricoForm.value.androgenico_inicio_vida_sexual;
    androgenico['androgenico_no_comp_sexuales'] = this.GinecoObstricoForm.value.androgenico_no_comp_sexuales;
    androgenico['androgenico_metodo_anticonceptivo'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo;
    androgenico['androgenico_tipo_relaciones'] = this.GinecoObstricoForm.value.androgenico_tipo_relaciones;
    androgenico['androgenico_ets'] = this.GinecoObstricoForm.value.androgenico_ets;
    androgenico['androgenico_metodo_anticonceptivo_hormonal'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo_hormonal;
    androgenico['androgenico_metodo_anticonceptivo_hormonal'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo_hormonal;
    androgenico['idHistoriaClinica'] = idHistoriaClinica;
    this.HistoriaClinicaAPIService.postAndrogenicos(androgenico).subscribe(androgenico =>{
      console.log('androgenico', androgenico);
    })
  }

  postAntecedenteProstatico(idHistoriaClinica: number): void {
    let prostatico: {} = {}
    prostatico['idHistoriaClinica'] = idHistoriaClinica;
    prostatico['ExamenProstata'] = this.GinecoObstricoForm.value.ExamenProstata;
    this.HistoriaClinicaAPIService.postAntecedenteProstatico(prostatico).subscribe(prostatico =>{
      if(prostatico['ExamenProstata'] == 'Si'){
        let examenProstata = {};
        examenProstata['fecha_ultimo_Examen_Prostatico'] = this.GinecoObstricoForm.value.fecha_ultimo_Examen_Prostatico;
        examenProstata['observaciones_ultimo_examen_prostatico'] = this.GinecoObstricoForm.value.observaciones_ultimo_examen_prostatico;
        examenProstata['idAntecedenteProstatico'] = prostatico.id;
        this.HistoriaClinicaAPIService.postExamenProstatico(examenProstata).subscribe(examenProstata =>{
          console.log('examenProstata', examenProstata);
        })
      }
    })
  }

  postAntecedenteGinecobstetrico(idHistoriaClinica: number){
    let antecedente:{} = {};
    antecedente['idHistoriaClinica'] = idHistoriaClinica;
    antecedente['menarquia'] = this.GinecoObstricoForm.value.pac_menarquia;
    antecedente['papanicolau'] = this.GinecoObstricoForm.value.pac_papanicolau;
    antecedente['tamisDeMama'] = this.GinecoObstricoForm.value.pac_tamis_mama;
    antecedente['aborto'] = this.GinecoObstricoForm.value.pac_abortos;
    antecedente['parto'] = this.GinecoObstricoForm.value.pac_partos;
    antecedente['cesarea'] = this.GinecoObstricoForm.value.pac_cesareas;
    antecedente['gestacion'] = this.GinecoObstricoForm.value.pac_gestaciones;
    this.HistoriaClinicaAPIService.postAntecedenteGinecobstetrico(antecedente).subscribe(antecedente => {
      console.log('antecedente', antecedente)
      this.postGinecoObstetricos(antecedente.id, antecedente);
    })
  }

  postGinecoObstetricos(idAntecedenteGO, data): void {
    if(data['menarquia'] == 'Si'){
      let antecedente = {};
      antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
      antecedente['menstruacion_frecuencia'] = this.GinecoObstricoForm.value.menstruacion_frecuencia;
      antecedente['menstruacion_cantidad'] = this.GinecoObstricoForm.value.menstruacion_cantidad;
      antecedente['menstruacion_duracion'] = this.GinecoObstricoForm.value.menstruacion_duracion;
      antecedente['menstruacion_presencia_De_Dolor'] = this.GinecoObstricoForm.value.menstruacion_presencia_De_Dolor;
      antecedente['menstruacion_fecha_Ultima'] = this.GinecoObstricoForm.value.menstruacion_fecha_Ultima;
      antecedente['menstruacion_otras_secreciones'] = this.GinecoObstricoForm.value.menstruacion_otras_secreciones;
      this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoMenstruacion(antecedente).subscribe(antecedente =>{
        console.log('antecedente', antecedente);
      })
    }

    if(data['gestacion'] == 'Si'){
      let antecedente = {};
      antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
      antecedente['gestacion_cantidad'] = this.GinecoObstricoForm.value.gestacion_cantidad;
      antecedente['gestacion_ultima_fecha'] = this.GinecoObstricoForm.value.gestacion_ultima_fecha;
      antecedente['gestacion_observacion'] = this.GinecoObstricoForm.value.gestacion_observacion;
      this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoGestacion(antecedente).subscribe(antecedente => {
        console.log('antecedente', antecedente);
      })
    }

    if(data['parto'] == 'Si'){
      let antecedente = {};
      antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
      antecedente['parto_cantidad'] = this.GinecoObstricoForm.value.parto_cantidad;
      antecedente['parto_ultima_fecha'] = this.GinecoObstricoForm.value.parto_ultima_fecha;
      antecedente['parto_observacion'] = this.GinecoObstricoForm.value.parto_observacion;
      this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoParto(antecedente).subscribe(antecedente => {
        console.log('antecedente', antecedente);
      })
    }

    if(data['aborto'] == 'Si'){
      let antecedente = {};
      antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
      antecedente['aboto_cantidad'] = this.GinecoObstricoForm.value.aboto_cantidad;
      antecedente['aborto_ultima_fecha'] = this.GinecoObstricoForm.value.aborto_ultima_fecha;
      antecedente['aborto_observacion'] = this.GinecoObstricoForm.value.aborto_observacion;
      this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoAborto(antecedente).subscribe(antecedente => {
        console.log('antecedente', antecedente);
      })
    }

    if(data['cesarea'] == 'Si'){
      let antecedente = {};
      antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
      antecedente['cesarea_cantidad'] = this.GinecoObstricoForm.value.cesarea_cantidad;
      antecedente['cesarea_ultima_fecha'] = this.GinecoObstricoForm.value.cesarea_ultima_fecha;
      antecedente['cesarea_observacion'] = this.GinecoObstricoForm.value.cesarea_observacion;
      this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoCesarea(antecedente).subscribe(antecedente => {
        console.log('antecedente', antecedente);
      })
    }

    if(data['tamisDeMama'] == 'Si'){
      let antecedente = {};
      antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
      antecedente['tamis_fecha'] = this.GinecoObstricoForm.value.tamis_fecha;
      antecedente['tamis_observacion'] = this.GinecoObstricoForm.value.tamis_observacion;
      this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoTamisDeMama(antecedente).subscribe(antecedente => {
        console.log('antecedente', antecedente);
      })
    }

    if(data['papanicolau'] == 'Si'){
      let antecedente = {};
      antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
      antecedente['papanicolau_fecha'] = this.GinecoObstricoForm.value.papanicolau_fecha;
      antecedente['papanicolau_observacion'] = this.GinecoObstricoForm.value.papanicolau_observacion;
      this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoPapanicolau(antecedente).subscribe(antecedente => {
        console.log('antecedente', antecedente);
      })
    }

  }

  postHeredoFamiliares(idAntecedentePatologico?): void {
    let padre = this.heredoFamForm.value.padre.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);
    console.log('padre', padre)
    for(let i = 0; i < padre.length; i++) {
      let padecimiento = {};
      padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
      padecimiento['padecimiento_hf_parentesco'] = 'Padre';
      padecimiento['padecimiento'] = padre[i];
      this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(padecimiento =>{
        console.log('padecimiento', padecimiento);
      })
    }

    let madre = this.heredoFamForm.value.madre.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);
    console.log('madre', madre)
    for(let i = 0; i < madre.length; i++) {
      let padecimiento = {};
      padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
      padecimiento['padecimiento_hf_parentesco'] = 'Madre';
      padecimiento['padecimiento'] = madre[i];
      this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(padecimiento =>{
        console.log('padecimiento', padecimiento);
      })
    }

    let abuelosPaternos = this.heredoFamForm.value.abuelosPaternos.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);
    console.log('abuelosPaternos', abuelosPaternos)
    for(let i = 0; i < abuelosPaternos.length; i++) {
      let padecimiento = {};
      padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
      padecimiento['padecimiento_hf_parentesco'] = 'Abuelos Paternos';
      padecimiento['padecimiento'] = abuelosPaternos[i];
      this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(padecimiento =>{
        console.log('padecimiento', padecimiento);
      })
    }

    let abuelosMaternos = this.heredoFamForm.value.abuelosMaternos.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);
    console.log('abuelosMaternos', abuelosMaternos)
    for(let i = 0; i < abuelosMaternos.length; i++) {
      let padecimiento = {};
      padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
      padecimiento['padecimiento_hf_parentesco'] = 'Abuelos Maternos';
      padecimiento['padecimiento'] = abuelosMaternos[i];
      this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(padecimiento =>{
        console.log('padecimiento', padecimiento);
      })
    }

    let hermanos = this.heredoFamForm.value.hermanos.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);
    console.log('abuelosMaternos', hermanos)
    for(let i = 0; i < hermanos.length; i++) {
      let padecimiento = {};
      padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
      padecimiento['padecimiento_hf_parentesco'] = 'Hermanos';
      padecimiento['padecimiento'] = hermanos[i];
      this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(padecimiento =>{
        console.log('padecimiento', padecimiento);
      })
    }

    let otros = this.heredoFamForm.value.otros.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null);
    console.log('otros', otros)
    for(let i = 0; i < otros.length; i++) {
      let padecimiento = {};
      padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
      padecimiento['padecimiento_hf_parentesco'] = 'Otros';
      padecimiento['padecimiento'] = otros[i];
      this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(padecimiento =>{
        console.log('padecimiento', padecimiento);
      })
    }
  }

  //#region LoadData
  getData(){
    this.HistoriaClinicaAPIService.getHistoriaClinica(this.idPaciente).subscribe(data =>{
      this.HistoriaClinicaAPIService.getHistoriaAntecedentePatologico(data[0].idHistoriaClinica).subscribe(patologico => {
        console.log('patologico', patologico)
        this.getPatologicos(patologico[0].idAntecedentePatologico)
        this.HospitalizacionesForm = this.fb.group({
          hospitalizaciones: patologico[0].antecedente_patologico_hospitalizacion,
        })
      })

      this.HistoriaClinicaAPIService.getNoPatologico(data[0].idHistoriaClinica).subscribe(noPatologico => {
        console.log('noPatologico', noPatologico);
        this.NoPatologicosForm = this.fb.group({
          pac_mascota: noPatologico[0].pac_mascota,
          pac_mascota_tipo: noPatologico[0].pac_mascota_tipo,
          pac_NumeroHabitaciones: noPatologico[0].pac_mascota,
          pac_NumeroHabitantes: noPatologico[0].pac_NumeroHabitaciones,
          pac_ConsumoDeAlimentosCapeados: noPatologico[0].pac_ConsumoDeAlimentosCapeados,
          pac_GruposAlimenticios: noPatologico[0].pac_GruposAlimenticios,
          pac_CantidadDeComidasAlDia: noPatologico[0].pac_CantidadDeComidasAlDia,
          pac_ConsumoDePan: noPatologico[0].pac_ConsumoDePan,
          pac_ConsumoDeSal: noPatologico[0].pac_ConsumoDeSal,
          pac_ConsumoDeRefresco: noPatologico[0].pac_ConsumoDeRefresco,
          observaciones: noPatologico[0].observaciones,
          Actividades_Fisicas: this.fb.array([]),
        })
      })
    })

    console.log('data', this.infoHistoriaClinica)
  }


  getPatologicos(idAntecedentePatologico: number){
    this.HistoriaClinicaAPIService.getPadecimientos(idAntecedentePatologico).subscribe(padecimientos => {
      for(let i = 0; i < padecimientos.length; i++){
        this.infoHistoriaClinica[2] = padecimientos[i]
      }
    })

    this.HistoriaClinicaAPIService.getPadecimientos_HF(idAntecedentePatologico).subscribe(padecimientos => {
      for(let i = 0; i < padecimientos.length; i++){
        this.infoHistoriaClinica[3] = padecimientos[i]
      }
    })
  }
  //#endregion

}

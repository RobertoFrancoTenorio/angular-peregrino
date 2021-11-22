import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PacienteService } from './../../../service/paciente/paciente.service';
import Stepper from 'bs-stepper';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CitaService } from '../../../service/cita/cita.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-modal-info-pac',
  templateUrl: './modal-info-pac.component.html',
  styleUrls: ['./modal-info-pac.component.scss']
})
export class ModalInfoPacComponent implements OnInit {
  private stepper: Stepper;
  isLinear = true;
  @Input() currentPaciente: any = null;
  @Input() detallesBand: boolean = true;
  @Input() antecedentesBand: boolean = false;
  @Input() citasBand: boolean = false;
  @Input() verHistoria: boolean = false;

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
    pac_medicamento: ['', Validators.required],
    pac_frecuencia_consumo: ['',Validators.required],
    pac_inicio_consumo: ['', Validators.required],
  })

  dataCitasAll=[];

  seleccionesPatologicas;
  bandSexo
  isCollapsed = true;
  patologias = true;
  ginecoObstetrico = true;
  heredoPadres = true;
  heredoAbuelos = true;
  otros = true;
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
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private PacienteService: PacienteService,
    private router: Router,
    private citaServ: CitaService
    ) {
    // Va agregando un array para cada campo, todos estan inicializados en false
    this.heredoFamForm = this.fb.group({
      padre: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      madre: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      abuelosPaternos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      abuelosMaternos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      hermanos: new FormArray(this.enfermedades.map(control => new FormControl(false))),
      otros: new FormArray(this.enfermedades.map(control => new FormControl(false))),
    });

    this.PatologiasForm = this.fb.group({
      patologias: new FormArray(this.patologicas.map(control => new FormControl((false)))),
      Medicamento: this.fb.array([]),
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
      quirurgica_fecha:  ['', Validators.required],
      quirurgica_causa:  ['', Validators.required],
      quirurgica_secuela: ['', Validators.required],
    })

    this.TraumaticosForm = this.fb.group({
      traumaticos: ['', Validators.required],
      fecha_traumaticos: ['', Validators.required],
      tipos_traumaticos: ['', Validators.required],
      causas_traumaticos: ['', Validators.required],
      secuelas_traumaticos: ['', Validators.required],
    })

    this.TransfusionesForm = this.fb.group({
      transfusiones: ['', Validators.required],
      transfusiones_fecha: ['', Validators.required],
      transfusiones_causas: ['', Validators.required],
    })

    this.PsicoactivasForm = this.fb.group({
      alcoholismo: ['', Validators.required],
      alcoholismo_frecuencia: ['', Validators.required],
      alcoholismo_cantidad: ['', Validators.required],

      tabaquismo: ['', Validators.required],
      tabaquismo_frecuencia: ['', Validators.required],
      tabaquismo_cantidad: ['', Validators.required],

      otras: ['', Validators.required],
      otras_tipo: ['', Validators.required],
      otras_ultimo_consumo: ['', Validators.required],
      otras_frecuencia: ['', Validators.required],
    })

    this.GinecoObstricoForm = this.fb.group({
      pac_menarquia: ['', Validators.required],
      pac_carac_mens: ['', Validators.required],
      pac_dias_mens: ['', Validators.required],
      pac_cant_mens: ['', Validators.required],
      pac_frec_mens: ['', Validators.required],
      pac_precencia_dolor_mens: ['', Validators.required],
      pac_otras_sec_mens: ['', Validators.required],

      pac_vida_sexual_activa: ['', Validators.required],
      pac_inicio_vida_sexual: ['', Validators.required],
      pac_no_comp_sexuales: ['', Validators.required],
      pac_metodo_anticonceptivo: ['', Validators.required],
      pac_tipo_relaciones: ['', Validators.required],
      pac_ets: ['', Validators.required],
      pac_metodo_anticonceptivo_hormonal: ['', Validators.required],
      pac_metodo_anticonceptivo_hormonal_diu: ['', Validators.required],

      pac_gestaciones: ['', Validators.required],
      pac_cant_gestaciones: ['', Validators.required],
      pac_ultima_gestacion: ['', Validators.required],
      pac_ultima_gestacion_observacion: ['', Validators.required],
      pac_partos: ['', Validators.required],
      pac_cant_partos: ['', Validators.required],
      pac_ultimo_parto: ['', Validators.required],
      pac_ultimo_parto_observacion: ['', Validators.required],
      pac_abortos: ['', Validators.required],
      pac_cant_abortos: ['', Validators.required],
      pac_ultimo_aborto: ['', Validators.required],
      pac_ultimo_aborto_observacion: ['', Validators.required],
      pac_cesareas: ['', Validators.required],
      pac_cant_cesareas: ['', Validators.required],
      pac_ultima_cesarea: ['', Validators.required],
      pac_ultima_cesarea_observacion: ['',Validators.required],

      pac_papanicolau: ['', Validators.required],
      pac_papanicolau_fecha: ['', Validators.required],
      pac_papanicolau_observacion: ['', Validators.required],
      pac_tamis_mama: ['', Validators.required],
      pac_tamis_fecha: ['', Validators.required],
      pac_tamis_observacion: ['', Validators.required],
    })

    this.NoPatologicosForm = this.fb.group({
      pac_habitaciones: ['', Validators.required],
      pac_habitantes: ['', Validators.required],
      mascota: ['', Validators.required],
      pac_mascota_tipo: ['', Validators.required],
      pac_comidas_al_dia: ['', Validators.required],
      pac_consumo_pan: ['', Validators.required],
      pac_consumo_refresco: ['', Validators.required],
      pac_consumo_sal: ['', Validators.required],
      pac_gpos_alimenticios: ['', Validators.required],
      pac_alimentos_capeados: ['', Validators.required],

      Actividades_Fisicas: this.fb.array([]),
    })
  }

  async ngOnInit(): Promise<void> {
    this.currentPaciente['edad'] = this.calcularEdad(this.currentPaciente.pac_f_nacimiento);
    this.bandSexo= this.currentPaciente.pac_sexo;
    console.log(this.bandSexo)
    const nuevo = document.querySelector('.bs-stepper');
    console.log('Nombre: ', nuevo);
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      thirdControl: ['', Validators.required]
    })

    this.fourthFormGroup = this.fb.group({
      fourthCtrl: ['', Validators.required]
    })

    await new Promise<void>((resolve) => {
      this.citaServ.getCitasPaciente(this.currentPaciente.id,'asignada').pipe(take(1)).subscribe(dataCitasAsig=>{
        this.dataCitasAll=[...this.dataCitasAll,...dataCitasAsig]
        resolve();
      })
    })

    await new Promise<void>((resolve) => {
      this.citaServ.getCitasPaciente(this.currentPaciente.id,'aceptada').pipe(take(1)).subscribe(dataCitasAsig=>{
        this.dataCitasAll=[...this.dataCitasAll,...dataCitasAsig]
        resolve();
      })
    })

    await new Promise<void>((resolve) => {
      this.citaServ.getCitasPaciente(this.currentPaciente.id,'rechazada').pipe(take(1)).subscribe(dataCitasAsig=>{
        this.dataCitasAll=[...this.dataCitasAll,...dataCitasAsig]
        resolve();
      })
    })

    console.log(this.dataCitasAll);

    this.onChanges();

  }

  onSubmit() {
    return false;
  }

  onChanges(): void {
    this.NoPatologicosForm.get("mascota").valueChanges.subscribe(data => {
      if (data == 'Si'){
        this.NoPatologicosForm.get("pac_mascota_tipo").enable();
      }
      else {
        this.NoPatologicosForm.get("pac_mascota_tipo").disable();
      }
    })
    this.AlergiasForm.get("alergias").valueChanges.subscribe(data =>{
      if(data == 'Si'){
        this.AlergiasForm.get("alergia_tipo").enable()
      }
      else{
        this.AlergiasForm.get("alergia_tipo").disable()
      }
    })
    this.HospitalizacionesForm.get("hospitalizaciones").valueChanges.subscribe(data =>{
      if (data == 'Si'){
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
      if (data == 'Si'){
        this.QuirurgicasForm.get("quirurgica_fecha").enable();
        this.QuirurgicasForm.get("quirurgica_causa").enable();
        this.QuirurgicasForm.get("quirurgica_secuela").enable();
      }
      else{
        this.QuirurgicasForm.get("quirurgica_fecha").disable();
        this.QuirurgicasForm.get("quirurgica_causa").disable();
        this.QuirurgicasForm.get("quirurgica_secuela").disable();
      }
    })
    this.TraumaticosForm.get('traumaticos').valueChanges.subscribe(data =>{
      if(data == 'Si'){
        this.TraumaticosForm.get("fecha_traumaticos").enable();
        this.TraumaticosForm.get("tipos_traumaticos").enable();
        this.TraumaticosForm.get("causas_traumaticos").enable();
        this.TraumaticosForm.get("secuelas_traumaticos").enable();
      }
      else{
        this.TraumaticosForm.get("fecha_traumaticos").disable();
        this.TraumaticosForm.get("tipos_traumaticos").disable();
        this.TraumaticosForm.get("causas_traumaticos").disable();
        this.TraumaticosForm.get("secuelas_traumaticos").disable();
      }
    })
    this.TransfusionesForm.get("transfusiones").valueChanges.subscribe(data =>{
      if(data == 'Si'){
        this.TransfusionesForm.get('transfusiones_fecha').enable();
        this.TransfusionesForm.get('transfusiones_causas').enable();
      }
      else{
        this.TransfusionesForm.get('transfusiones_fecha').disable();
        this.TransfusionesForm.get('transfusiones_causas').disable();
      }
    })
    this.PsicoactivasForm.get('alcoholismo').valueChanges.subscribe(data =>{
      if (data == 'Si'){
        this.PsicoactivasForm.get("alcoholismo_frecuencia").enable();
        this.PsicoactivasForm.get("alcoholismo_cantidad").enable();
      }
      else{
        this.PsicoactivasForm.get("alcoholismo_frecuencia").disable();
        this.PsicoactivasForm.get("alcoholismo_cantidad").disable();
      }
    })
    this.PsicoactivasForm.get('tabaquismo').valueChanges.subscribe(data =>{
      if (data == 'Si'){
        this.PsicoactivasForm.get("tabaquismo_frecuencia").enable();
        this.PsicoactivasForm.get("tabaquismo_cantidad").enable();
      }
      else{
        this.PsicoactivasForm.get("tabaquismo_frecuencia").disable();
        this.PsicoactivasForm.get("tabaquismo_cantidad").disable();
      }
    })
    this.PsicoactivasForm.get('otras').valueChanges.subscribe(data =>{
      if (data == 'Si'){
        this.PsicoactivasForm.get("otras_tipo").enable();
        this.PsicoactivasForm.get("otras_ultimo_consumo").enable();
        this.PsicoactivasForm.get("otras_frecuencia").enable();
      }
      else{
        this.PsicoactivasForm.get("otras_tipo").disable();
        this.PsicoactivasForm.get("otras_ultimo_consumo").disable();
        this.PsicoactivasForm.get("otras_frecuencia").disable();
      }
    })
    if(this.bandSexo == 'M'){
      this.GinecoObstricoForm.get("pac_menarquia").disable();
      this.GinecoObstricoForm.get("pac_carac_mens").disable();
      this.GinecoObstricoForm.get("pac_dias_mens").disable();
      this.GinecoObstricoForm.get("pac_frec_mens").disable();
      this.GinecoObstricoForm.get("pac_cant_mens").disable();
      this.GinecoObstricoForm.get("pac_precencia_dolor_mens").disable();
      this.GinecoObstricoForm.get("pac_otras_sec_mens").disable();
      this.GinecoObstricoForm.get("pac_gestaciones").disable();
      this.GinecoObstricoForm.get("pac_partos").disable();
      this.GinecoObstricoForm.get("pac_abortos").disable();
      this.GinecoObstricoForm.get("pac_cesareas").disable();
      this.GinecoObstricoForm.get("pac_cant_abortos").disable();
      this.GinecoObstricoForm.get("pac_cant_cesareas").disable();
      this.GinecoObstricoForm.get("pac_cant_gestaciones").disable();
      this.GinecoObstricoForm.get("pac_cant_partos").disable();
      this.GinecoObstricoForm.get("pac_papanicolau").disable();
      this.GinecoObstricoForm.get("pac_papanicolau_fecha").disable();
      this.GinecoObstricoForm.get("pac_papanicolau_observacion").disable();
      this.GinecoObstricoForm.get("pac_tamis_fecha").disable();
      this.GinecoObstricoForm.get("pac_tamis_mama").disable();
      this.GinecoObstricoForm.get("pac_tamis_observacion").disable();
      this.GinecoObstricoForm.get("pac_ultima_cesarea").disable();
      this.GinecoObstricoForm.get("pac_ultima_cesarea_observacion").disable();
      this.GinecoObstricoForm.get("pac_ultima_gestacion").disable();
      this.GinecoObstricoForm.get("pac_ultima_gestacion_observacion").disable();
      this.GinecoObstricoForm.get("pac_ultimo_aborto").disable();
      this.GinecoObstricoForm.get("pac_ultimo_parto").disable();
      this.GinecoObstricoForm.get("pac_ultimo_parto_observacion").disable();
    }
    else{
      this.GinecoObstricoForm.get("pac_menarquia").enable();
      this.GinecoObstricoForm.get("pac_carac_mens").enable();
      this.GinecoObstricoForm.get("pac_dias_mens").enable();
      this.GinecoObstricoForm.get("pac_frec_mens").enable();
      this.GinecoObstricoForm.get("pac_cant_mens").enable();
      this.GinecoObstricoForm.get("pac_precencia_dolor_mens").enable();
      this.GinecoObstricoForm.get("pac_otras_sec_mens").enable();
      this.GinecoObstricoForm.get("pac_gestaciones").enable();
      this.GinecoObstricoForm.get("pac_partos").enable();
      this.GinecoObstricoForm.get("pac_abortos").enable();
      this.GinecoObstricoForm.get("pac_cesareas").enable();
    }
    this.GinecoObstricoForm.get('pac_metodo_anticonceptivo').valueChanges.subscribe(data =>{
      if(data == 'Hormonal'){
        this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal').enable();
      }
      else{
        this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal').valueChanges.subscribe(data =>{
      if(data == 'DIU'){
        this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal_diu').enable();
      }
      else{
        this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal_diu').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_gestaciones').valueChanges.subscribe(data =>{
      if(data == 'Si'){
        this.GinecoObstricoForm.get('pac_cant_gestaciones').enable();
        this.GinecoObstricoForm.get('pac_ultima_gestacion').enable();
        this.GinecoObstricoForm.get('pac_ultima_gestacion_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('pac_cant_gestaciones').disable();
        this.GinecoObstricoForm.get('pac_ultima_gestacion').disable();
        this.GinecoObstricoForm.get('pac_ultima_gestacion_observacion').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_partos').valueChanges.subscribe(data =>{
      if(data == 'Si'){
        this.GinecoObstricoForm.get('pac_cant_partos').enable();
        this.GinecoObstricoForm.get('pac_ultimo_parto').enable();
        this.GinecoObstricoForm.get('pac_ultimo_parto_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('pac_cant_partos').disable();
        this.GinecoObstricoForm.get('pac_ultimo_parto').disable();
        this.GinecoObstricoForm.get('pac_ultimo_parto_observacion').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_abortos').valueChanges.subscribe(data =>{
      if(data == 'Si'){
        this.GinecoObstricoForm.get('pac_cant_abortos').enable();
        this.GinecoObstricoForm.get('pac_ultimo_aborto').enable();
        this.GinecoObstricoForm.get('pac_ultimo_aborto_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('pac_cant_abortos').disable();
        this.GinecoObstricoForm.get('pac_ultimo_aborto').disable();
        this.GinecoObstricoForm.get('pac_ultimo_aborto_observacion').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_cesareas').valueChanges.subscribe(data =>{
      if(data == 'Si'){
        this.GinecoObstricoForm.get('pac_cant_cesareas').enable();
        this.GinecoObstricoForm.get('pac_ultima_cesarea').enable();
        this.GinecoObstricoForm.get('pac_ultima_cesarea_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('pac_cant_cesareas').disable();
        this.GinecoObstricoForm.get('pac_ultima_cesarea').disable();
        this.GinecoObstricoForm.get('pac_ultima_cesarea_observacion').disable();
      }
    })
    this.GinecoObstricoForm.get('pac_papanicolau').valueChanges.subscribe(data =>{
      if(data == 'Si'){
        this.GinecoObstricoForm.get('pac_papanicolau_fecha').enable();
        this.GinecoObstricoForm.get('pac_papanicolau_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('pac_papanicolau_fecha').enable();
        this.GinecoObstricoForm.get('pac_papanicolau_observacion').enable();
      }
    })
    this.GinecoObstricoForm.get('pac_tamis_mama').valueChanges.subscribe(data =>{
      if(data == 'Si'){
        this.GinecoObstricoForm.get('pac_tamis_fecha').enable();
        this.GinecoObstricoForm.get('pac_tamis_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('pac_tamis_fecha').enable();
        this.GinecoObstricoForm.get('pac_tamis_observacion').enable();
      }
    })
  }

  submit() {
    // Filter out the unselected ids
    this.guardaPatolgiasFam();
  }

  guardaPatolgiasFam(){
    let model={
      pac_antecedentes_data : {
        heredo_familiares: {
          padre: this.heredoFamForm.value.padre.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null),
          madre: this.heredoFamForm.value.madre.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null),
          abuelosPaternos: this.heredoFamForm.value.abuelosPaternos.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null),
          abuelosMaternos: this.heredoFamForm.value.abuelosMaternos.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null),
          hermanos: this.heredoFamForm.value.hermanos.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null),
          otros: this.heredoFamForm.value.otros.map((checked, index) => checked ? this.enfermedades[index].id : null).filter(value => value !== null),
        },
        No_Patolgicos: this.NoPatologicosForm.value,
        Patologicos : {
          cronico_degenerativas: this.PatologiasForm.value.patologias.map((checked, index) => checked ? this.patologicas[index].id : null).filter(value => value !== null),
          alergias: this.AlergiasForm.value,
          Hospitalizaciones: this.HospitalizacionesForm.value,
          quirurgicas: this.QuirurgicasForm.value,
          traumaticos: this.TraumaticosForm.value,
          transfusiones: this.TransfusionesForm.value,
          sustancias_psicoactivas: this.PsicoactivasForm.value,
          Medicamentos: this.PatologiasForm.value.Medicamento,
        },
        GinecoObstrico: this.GinecoObstricoForm.value,
      }
    }
    console.log(model);
    let post = model;
    post['id']= this.currentPaciente.id;
    post['pac_historia_clinica'] = true;
    this.PacienteService.updatePaciente(post);
    Swal.fire({
      title: 'Historia Clínica Completa',
      text: 'Se ha completado correctamente los antecedentes.',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    /*Una vez ejecutado el Sweet alert limpia el formulario
    y redirige al componente de doctores*/
    .then(()=>{
      this.heredoFamForm.reset();
      this.AlergiasForm.reset();
      this.GinecoObstricoForm.reset();
      this.PatologiasForm.reset();
      this.QuirurgicasForm.reset();
      this.HospitalizacionesForm.reset();
      this.NoPatologicosForm.reset();
      this.TraumaticosForm.reset();
      this.TransfusionesForm.reset();
      this.modalRef.hide()
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
      pac_medicamento: ['', [Validators.required]],
      pac_frecuencia_consumo: ['', [Validators.required]],
      pac_inicio_consumo: ['', [Validators.required]],
    })
    this.list_medicamentos.push(med);
  }

  deleteMedicamento(medicamentoId: number){
    return this.list_medicamentos.removeAt(medicamentoId);
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

  activarVerHistoria(){
    this.citasBand = false;
    this.detallesBand = false;
    this.verHistoria = true;
  }

  cerrarModal(){
    this.modalRef.hide()
  }

  next() {
    this.stepper.next();
  }

  citaSave(event: any){
    if (event.citaSave) {
      console.log('Cita almacenada')
      this.activarDetalles();
    }else{
      console.log('Cancel Cita')
      this.activarDetalles();
    }
  }
}

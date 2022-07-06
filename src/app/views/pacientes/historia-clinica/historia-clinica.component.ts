import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from './../../../service/paciente/paciente.service';
import { CitaService } from '../../../service/cita/cita.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder,
    private PacienteService: PacienteService,
    private router: Router,
    private citaServ: CitaService
    ) {
    // Va agregando un array para cada campo, todos estan inicializados en false
  }

  async ngOnInit(): Promise<void> {
    if(this.editar){
      this.constructorForms()
      this.loadData()
    }
    else{
      this.constructorForms()
    }
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

    this.onChanges();
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

      pac_exam_prostata: [''],
      pac_exam_prostata_fecha: ['', Validators.required],
      pac_exam_prostata_obs: ['', Validators.required],

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
      observaciones: [''],
      Actividades_Fisicas: this.fb.array([]),
    })
  }

  loadData(){
    this.PacienteService.getPacienteData(this.idPaciente).subscribe(data => {
      console.log('Data', data)
      //#region LoadArrays
      let varPadre = this.heredoFamForm.get('padre') as FormArray;
      for(let i=0; i < varPadre.length; i++){
        if(data['pac_antecedentes_data'].heredo_familiares.padre.includes(this.enfermedades[i].id)){
          varPadre.at(i).setValue(true)
        }
      }

      let varMadre = this.heredoFamForm.get('madre') as FormArray;
      for(let i=0; i < varMadre.length; i++){
        if(data['pac_antecedentes_data'].heredo_familiares.madre.includes(this.enfermedades[i].id)){
          varMadre.at(i).setValue(true)
        }
      }

      let varAbPat = this.heredoFamForm.get('abuelosPaternos') as FormArray;
      for(let i=0; i < varAbPat.length; i++){
        if(data['pac_antecedentes_data'].heredo_familiares.abuelosPaternos.includes(this.enfermedades[i].id)){
          varAbPat.at(i).setValue(true)
        }
      }

      let varAbMat = this.heredoFamForm.get('abuelosMaternos') as FormArray;
      for(let i=0; i < varAbMat.length; i++){
        if(data['pac_antecedentes_data'].heredo_familiares.abuelosMaternos.includes(this.enfermedades[i].id)){
          varAbMat.at(i).setValue(true)
        }
      }

      let varHmnos = this.heredoFamForm.get('hermanos') as FormArray;
      for(let i=0; i < varHmnos.length; i++){
        if(data['pac_antecedentes_data'].heredo_familiares.hermanos.includes(this.enfermedades[i].id)){
          varHmnos.at(i).setValue(true)
        }
      }

      let varOtros = this.heredoFamForm.get('otros') as FormArray;
      for(let i=0; i < varOtros.length; i++){
        if(data['pac_antecedentes_data'].heredo_familiares.otros.includes(this.enfermedades[i].id)){
          varOtros.at(i).setValue(true)
        }
      }

      let varPatologias = this.PatologiasForm.get('patologias') as FormArray;
      for(let i=0; i < varPatologias.length; i++){
        if(data['pac_antecedentes_data'].Patologicos.cronico_degenerativas.includes(this.patologicas[i].id)){
          varPatologias.at(i).setValue(true)
        }
      }
      //#endregion

      //#region Patologias
      this.heredoFamForm.patchValue({
        observaciones: data['pac_antecedentes_data'].Observaciones.observaciones_heredoFam
      })

      this.PatologiasForm.patchValue({
        observaciones: data['pac_antecedentes_data'].Observaciones.observaciones_Patologias
      })

      this.AlergiasForm.patchValue({
        alergias: data['pac_antecedentes_data'].Patologicos.alergias.alergias,
        alergia_tipo: data['pac_antecedentes_data'].Patologicos.alergias.alergia_tipo,
      })

      this.NoPatologicosForm.patchValue({
        pac_habitaciones: data['pac_antecedentes_data'].No_Patolgicos.pac_habitaciones,
        pac_habitantes:         data['pac_antecedentes_data'].No_Patolgicos.pac_habitantes,
        mascota:                data['pac_antecedentes_data'].No_Patolgicos.mascota,
        pac_mascota_tipo:       data['pac_antecedentes_data'].No_Patolgicos.pac_mascota_tipo,
        pac_comidas_al_dia:     data['pac_antecedentes_data'].No_Patolgicos.pac_comidas_al_dia,
        pac_consumo_pan:        data['pac_antecedentes_data'].No_Patolgicos.pac_consumo_pan,
        pac_consumo_refresco:   data['pac_antecedentes_data'].No_Patolgicos.pac_consumo_refresco,
        pac_consumo_sal:        data['pac_antecedentes_data'].No_Patolgicos.pac_consumo_sal,
        pac_gpos_alimenticios:  data['pac_antecedentes_data'].No_Patolgicos.pac_gpos_alimenticios,
        pac_alimentos_capeados: data['pac_antecedentes_data'].No_Patolgicos.pac_alimentos_capeados,
        observaciones: data['pac_antecedentes_data'].Observaciones.observaciones_NoPatologicos
      })

      this.HospitalizacionesForm.patchValue({
        hospitalizaciones:       data['pac_antecedentes_data'].Patologicos.Hospitalizaciones.hospitalizaciones,
        hospitalizacion_fecha:   data['pac_antecedentes_data'].Patologicos.Hospitalizaciones.hospitalizacion_fecha,
        hospitalizacion_causa:   data['pac_antecedentes_data'].Patologicos.Hospitalizaciones.hospitalizacion_causa,
        hospitalizacion_secuela: data['pac_antecedentes_data'].Patologicos.Hospitalizaciones.hospitalizacion_secuela,
      })

      this.QuirurgicasForm.patchValue({
        quirurgicas:        data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgicas,
        quirurgica_fecha:   data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgica_fecha,
        quirurgica_causa:   data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgica_causa,
        quirurgica_secuela: data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgica_secuela,
      })

      this.TraumaticosForm.patchValue({
        traumaticos:          data['pac_antecedentes_data'].Patologicos.traumaticos.traumaticos,
        fecha_traumaticos:    data['pac_antecedentes_data'].Patologicos.traumaticos.fecha_traumaticos,
        tipos_traumaticos:    data['pac_antecedentes_data'].Patologicos.traumaticos.tipos_traumaticos,
        causas_traumaticos:   data['pac_antecedentes_data'].Patologicos.traumaticos.causas_traumaticos,
        secuelas_traumaticos: data['pac_antecedentes_data'].Patologicos.traumaticos.secuelas_traumaticos,
      })

      this.TransfusionesForm.patchValue({
        transfusiones:        data['pac_antecedentes_data'].Patologicos.transfusiones.transfusiones,
        transfusiones_fecha:  data['pac_antecedentes_data'].Patologicos.transfusiones.transfusiones_fecha,
        transfusiones_causas: data['pac_antecedentes_data'].Patologicos.transfusiones.transfusiones_causas,
      })

      this.PsicoactivasForm.patchValue({
        alcoholismo:            data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.alcoholismo,
        alcoholismo_frecuencia: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.alcoholismo_frecuencia,
        alcoholismo_cantidad:   data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.alcoholismo_cantidad,
        tabaquismo:             data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.tabaquismo,
        tabaquismo_frecuencia:  data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.tabaquismo_frecuencia,
        tabaquismo_cantidad:    data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.tabaquismo_cantidad,
        otras:                  data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.otras,
        otras_tipo:             data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.otras_tipo,
        otras_ultimo_consumo:   data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.otras_ultimo_consumo,
        otras_frecuencia:       data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.otras_frecuencia,
      })
      //#endregion

      this.GinecoObstricoForm = this.fb.group({
        pac_menarquia:                          data['pac_antecedentes_data'].GinecoObstrico.pac_menarquia,
        pac_carac_mens:                         data['pac_antecedentes_data'].GinecoObstrico.pac_carac_mens,
        pac_dias_mens:                          data['pac_antecedentes_data'].GinecoObstrico.pac_dias_mens,
        pac_cant_mens:                          data['pac_antecedentes_data'].GinecoObstrico.pac_cant_mens,
        pac_frec_mens:                          data['pac_antecedentes_data'].GinecoObstrico.pac_frec_mens,
        pac_precencia_dolor_mens:               data['pac_antecedentes_data'].GinecoObstrico.pac_precencia_dolor_mens,
        pac_otras_sec_mens:                     data['pac_antecedentes_data'].GinecoObstrico.pac_otras_sec_mens,
        pac_vida_sexual_activa:                 data['pac_antecedentes_data'].GinecoObstrico.pac_vida_sexual_activa,
        pac_inicio_vida_sexual:                 data['pac_antecedentes_data'].GinecoObstrico.pac_inicio_vida_sexual,
        pac_no_comp_sexuales:                   data['pac_antecedentes_data'].GinecoObstrico.pac_no_comp_sexuales,
        pac_metodo_anticonceptivo:              data['pac_antecedentes_data'].GinecoObstrico.pac_metodo_anticonceptivo,
        pac_tipo_relaciones:                    data['pac_antecedentes_data'].GinecoObstrico.pac_tipo_relaciones,
        pac_ets:                                data['pac_antecedentes_data'].GinecoObstrico.pac_ets,
        pac_metodo_anticonceptivo_hormonal:     data['pac_antecedentes_data'].GinecoObstrico.pac_metodo_anticonceptivo_hormonal,
        pac_metodo_anticonceptivo_hormonal_diu: data['pac_antecedentes_data'].GinecoObstrico.pac_metodo_anticonceptivo_hormonal_diu,
        pac_exam_prostata:                      data['pac_antecedentes_data'].GinecoObstrico.pac_exam_prostata,
        pac_exam_prostata_fecha:                data['pac_antecedentes_data'].GinecoObstrico.pac_exam_prostata_fecha,
        pac_exam_prostata_obs:                  data['pac_antecedentes_data'].GinecoObstrico.pac_exam_prostata_obs,
        pac_gestaciones:                        data['pac_antecedentes_data'].GinecoObstrico.pac_gestaciones,
        pac_cant_gestaciones:                   data['pac_antecedentes_data'].GinecoObstrico.pac_cant_gestaciones,
        pac_ultima_gestacion:                   data['pac_antecedentes_data'].GinecoObstrico.pac_ultima_gestacion,
        pac_ultima_gestacion_observacion:       data['pac_antecedentes_data'].GinecoObstrico.pac_ultima_gestacion_observacion,
        pac_partos:                             data['pac_antecedentes_data'].GinecoObstrico.pac_partos,
        pac_cant_partos:                        data['pac_antecedentes_data'].GinecoObstrico.pac_cant_partos,
        pac_ultimo_parto:                       data['pac_antecedentes_data'].GinecoObstrico.pac_ultimo_parto,
        pac_ultimo_parto_observacion:           data['pac_antecedentes_data'].GinecoObstrico.pac_ultimo_parto_observacion,
        pac_abortos:                            data['pac_antecedentes_data'].GinecoObstrico.pac_abortos,
        pac_cant_abortos:                       data['pac_antecedentes_data'].GinecoObstrico.pac_cant_abortos,
        pac_ultimo_aborto:                      data['pac_antecedentes_data'].GinecoObstrico.pac_ultimo_aborto,
        pac_ultimo_aborto_observacion:          data['pac_antecedentes_data'].GinecoObstrico.pac_ultimo_aborto_observacion,
        pac_cesareas:                           data['pac_antecedentes_data'].GinecoObstrico.pac_cesareas,
        pac_cant_cesareas:                      data['pac_antecedentes_data'].GinecoObstrico.pac_cant_cesareas,
        pac_ultima_cesarea:                     data['pac_antecedentes_data'].GinecoObstrico.pac_ultima_cesarea,
        pac_ultima_cesarea_observacion:         data['pac_antecedentes_data'].GinecoObstrico.pac_ultima_cesarea_observacion,
        pac_papanicolau:                        data['pac_antecedentes_data'].GinecoObstrico.pac_papanicolau,
        pac_papanicolau_fecha:                  data['pac_antecedentes_data'].GinecoObstrico.pac_papanicolau_fecha,
        pac_papanicolau_observacion:            data['pac_antecedentes_data'].GinecoObstrico.pac_papanicolau_observacion,
        pac_tamis_mama:                         data['pac_antecedentes_data'].GinecoObstrico.pac_tamis_mama,
        pac_tamis_fecha:                        data['pac_antecedentes_data'].GinecoObstrico.pac_tamis_fecha,
        pac_tamis_observacion:                  data['pac_antecedentes_data'].GinecoObstrico.pac_tamis_observacion,
      })
    })
  }

  onSubmit() {
    return false;
  }

  onChanges(): void {
    this.NoPatologicosForm.get("mascota").valueChanges.subscribe(data => {
      if (data == "Si"){
        this.NoPatologicosForm.get("pac_mascota_tipo").enable();
      }
      else {
        this.NoPatologicosForm.get("pac_mascota_tipo").disable();
      }
    })
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
      if(data == "Si"){
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
      if(data == "Si"){
        this.TransfusionesForm.get('transfusiones_fecha').enable();
        this.TransfusionesForm.get('transfusiones_causas').enable();
      }
      else{
        this.TransfusionesForm.get('transfusiones_fecha').disable();
        this.TransfusionesForm.get('transfusiones_causas').disable();
      }
    })
    this.PsicoactivasForm.get('alcoholismo').valueChanges.subscribe(data =>{
      if (data == "Si"){
        this.PsicoactivasForm.get("alcoholismo_frecuencia").enable();
        this.PsicoactivasForm.get("alcoholismo_cantidad").enable();
      }
      else{
        this.PsicoactivasForm.get("alcoholismo_frecuencia").disable();
        this.PsicoactivasForm.get("alcoholismo_cantidad").disable();
      }
    })
    this.PsicoactivasForm.get('tabaquismo').valueChanges.subscribe(data =>{
      if (data == "Si"){
        this.PsicoactivasForm.get("tabaquismo_frecuencia").enable();
        this.PsicoactivasForm.get("tabaquismo_cantidad").enable();
      }
      else{
        this.PsicoactivasForm.get("tabaquismo_frecuencia").disable();
        this.PsicoactivasForm.get("tabaquismo_cantidad").disable();
      }
    })
    this.PsicoactivasForm.get('otras').valueChanges.subscribe(data =>{
      if (data == "Si"){
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
      this.GinecoObstricoForm.get("pac_ultimo_aborto_observacion").disable();
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
      this.GinecoObstricoForm.get("pac_exam_prostata").enable();
      this.GinecoObstricoForm.get("pac_exam_prostata_fecha").enable();
      this.GinecoObstricoForm.get("pac_exam_prostata_obs").enable();

    }
    this.GinecoObstricoForm.get('pac_exam_prostata').valueChanges.subscribe(data =>{
      if(data == "Si"){
        this.GinecoObstricoForm.get("pac_exam_prostata_fecha").enable();
        this.GinecoObstricoForm.get("pac_exam_prostata_obs").enable();
      }else{
        this.GinecoObstricoForm.get("pac_exam_prostata_fecha").disable();
        this.GinecoObstricoForm.get("pac_exam_prostata_obs").disable();
      }
    })
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
      if(data == "Si"){
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
      if(data == "Si"){
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
      if(data == "Si"){
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
      if(data == "Si"){
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
      if(data == "Si"){
        this.GinecoObstricoForm.get('pac_papanicolau_fecha').enable();
        this.GinecoObstricoForm.get('pac_papanicolau_observacion').enable();
      }
      else{
        this.GinecoObstricoForm.get('pac_papanicolau_fecha').enable();
        this.GinecoObstricoForm.get('pac_papanicolau_observacion').enable();
      }
    })
    this.GinecoObstricoForm.get('pac_tamis_mama').valueChanges.subscribe(data =>{
      if(data == "Si"){
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
        Observaciones: {
          observaciones_heredoFam: this.heredoFamForm.value.observaciones,
          observaciones_NoPatologicos: this.NoPatologicosForm.value.observaciones,
          observaciones_Patologias: this.PatologiasForm.value.observaciones,
        }
      }
    }
    let post = model;
    post['id']= this.idPaciente;
    post['pac_historia_clinica'] = true;
    this.PacienteService.updatePaciente(post);
    if(this.editar){
      this.alertEditado()
    }
    else{
      this.alertGuardado()
    }
    this.cerrarModal.emit(true)
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
      pac_medicamento: ['', [Validators.required]],
      pac_frecuencia_consumo: ['', [Validators.required]],
      pac_inicio_consumo: ['', [Validators.required]],
    })
    this.list_medicamentos.push(med);
  }

  deleteMedicamento(medicamentoId: number){
    return this.list_medicamentos.removeAt(medicamentoId);
  }

}

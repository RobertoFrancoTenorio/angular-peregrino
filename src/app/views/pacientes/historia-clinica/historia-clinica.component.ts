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
      pac_carac_mens: ['', Validators.required],
      pac_dias_mens: ['', Validators.required],
      pac_cant_mens: ['', Validators.required],
      pac_frec_mens: ['', Validators.required],
      pac_precencia_dolor_mens: ['', Validators.required],
      pac_otras_sec_mens: ['', Validators.required],

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
        quirurgico_fecha:   data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgico_fecha,
        quirurgico_causa:   data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgico_causa,
        quirurgico_secuela: data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgico_secuela,
      })

      this.TraumaticosForm.patchValue({
        traumaticos:          data['pac_antecedentes_data'].Patologicos.traumaticos.traumaticos,
        traumatismo_fecha:    data['pac_antecedentes_data'].Patologicos.traumaticos.traumatismo_fecha,
        traumatismo_tipo:    data['pac_antecedentes_data'].Patologicos.traumaticos.traumatismo_tipo,
        traumatismo_causa:   data['pac_antecedentes_data'].Patologicos.traumaticos.traumatismo_causa,
        traumatismo_secuela: data['pac_antecedentes_data'].Patologicos.traumaticos.traumatismo_secuela,
      })

      this.TransfusionesForm.patchValue({
        transfusiones:        data['pac_antecedentes_data'].Patologicos.transfusiones.transfusiones,
        transfusion_fecha:  data['pac_antecedentes_data'].Patologicos.transfusiones.transfusion_fecha,
        transfusion_causa: data['pac_antecedentes_data'].Patologicos.transfusiones.transfusion_causa,
      })

      this.PsicoactivasForm.patchValue({
        sustancia_psicoactiva_alcohol:            data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_alcohol,
        sustancia_psicoactiva_alcohol_frecuencia: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_alcohol_frecuencia,
        sustancia_psicoactiva_alcohol_cantidad:   data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_alcohol_cantidad,
        sustancia_psicoactiva_tabaco:             data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_tabaco,
        sustancia_psicoactiva_tabaco_frecuencia:  data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_tabaco_frecuencia,
        sustancia_psicoactiva_tabaco_cantidad:    data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_tabaco_cantidad,
        sustancia_psicoactiva_otra:                  data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_otra,
        sustancia_psicoactiva_otra_tipo:             data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_otra_tipo,
        sustancia_psicoactiva_otra_ultimo_consumo:   data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_otra_ultimo_consumo,
        sustancia_psicoactiva_otra_frecuencia:       data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_otra_frecuencia,
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
        androgenico_vida_sexual_activa:                 data['pac_antecedentes_data'].GinecoObstrico.androgenico_vida_sexual_activa,
        androgenico_inicio_vida_sexual:                 data['pac_antecedentes_data'].GinecoObstrico.androgenico_vida_sexual_activa,
        androgenico_no_comp_sexuales:                   data['pac_antecedentes_data'].GinecoObstrico.androgenico_no_comp_sexuales,
        androgenico_metodo_anticonceptivo:              data['pac_antecedentes_data'].GinecoObstrico.androgenico_metodo_anticonceptivo,
        androgenico_tipo_relaciones:                    data['pac_antecedentes_data'].GinecoObstrico.androgenico_tipo_relaciones,
        androgenico_ets:                                data['pac_antecedentes_data'].GinecoObstrico.androgenico_ets,
        androgenico_metodo_anticonceptivo_hormonal:     data['pac_antecedentes_data'].GinecoObstrico.androgenico_metodo_anticonceptivo_hormonal,
        androgenico_androgenico_pac_metodo_anticonceptivo_hormonal_diu: data['pac_antecedentes_data'].GinecoObstrico.androgenico_androgenico_pac_metodo_anticonceptivo_hormonal_diu,
        ExamenProstata:                      data['pac_antecedentes_data'].GinecoObstrico.ExamenProstata,
        fecha_ultimo_Examen_Prostatico:                data['pac_antecedentes_data'].GinecoObstrico.fecha_ultimo_Examen_Prostatico,
        observaciones_ultimo_examen_prostatico:                  data['pac_antecedentes_data'].GinecoObstrico.observaciones_ultimo_examen_prostatico,
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
      //this.postNoPatologico(data.idHistoriaClinica);
      //this.postPatologico(data.idHistoriaClinica);
      //this.postAndrogenicos(data.idHistoriaClinica);
      if(this.pac_sexo == 'M'){
        this.postAntecedenteProstatico(data.idHistoriaClinica);
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

      console.log('Medicamentos', this.PatologiasForm.value.Medicamento)
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

  postAndrogenicos(idAntecedentePatologico: number): void {
    let androgenico:{} = {};
    androgenico['androgenico_vida_sexual_activa'] = this.GinecoObstricoForm.value.androgenico_vida_sexual_activa;
    androgenico['androgenico_inicio_vida_sexual'] = this.GinecoObstricoForm.value.androgenico_inicio_vida_sexual;
    androgenico['androgenico_no_comp_sexuales'] = this.GinecoObstricoForm.value.androgenico_no_comp_sexuales;
    androgenico['androgenico_metodo_anticonceptivo'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo;
    androgenico['androgenico_tipo_relaciones'] = this.GinecoObstricoForm.value.androgenico_tipo_relaciones;
    androgenico['androgenico_ets'] = this.GinecoObstricoForm.value.androgenico_ets;
    androgenico['androgenico_metodo_anticonceptivo_hormonal'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo_hormonal;
    androgenico['androgenico_metodo_anticonceptivo_hormonal'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo_hormonal;
    androgenico['idAntecedentePatologico'] = idAntecedentePatologico;
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

}

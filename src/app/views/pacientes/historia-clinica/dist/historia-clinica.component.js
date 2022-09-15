"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HistoriaClinicaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var HistoriaClinicaComponent = /** @class */ (function () {
    function HistoriaClinicaComponent(router, fb, AuthService, PacienteService, HistoriaClinicaAPIService) {
        this.router = router;
        this.fb = fb;
        this.AuthService = AuthService;
        this.PacienteService = PacienteService;
        this.HistoriaClinicaAPIService = HistoriaClinicaAPIService;
        this.editar = false;
        this.cerrarModal = new core_1.EventEmitter();
        this.isLinear = true;
        this.id = null;
        this.ActividadesFisicasForm = this.fb.group({
            pac_actividad_fisica: ['', forms_1.Validators.required],
            pac_frecuencia_act_fisica: ['', forms_1.Validators.required]
        });
        this.MedicamentosForm = this.fb.group({
            medicamento_nombre: ['', forms_1.Validators.required],
            medicamento_frecuencia_consumo: ['', forms_1.Validators.required],
            medicamento_inicio_de_consumo: ['', forms_1.Validators.required]
        });
        this.dataCitasAll = [];
        this.isCollapsed = true;
        this.patologias = true;
        this.ginecoObstetrico = true;
        this.heredoPadres = true;
        this.heredoAbuelos = true;
        this.otros = true;
        this.enfermedades = [
            { id: 'Diabetes Mellitus', enf: 'Diabetes Mellitus (azúcar alta)' },
            { id: 'Hipertensión Arterial Sistémica', enf: 'Hipertensión Arterial Sistémica (presión alta)' },
            { id: 'Obesidad', enf: 'Obesidad Diagnosticada' },
            { id: 'Neoplasias', enf: 'Neoplasias (Cualquier tipo de cáncer)' },
            { id: 'Malformaciones hereditarias / congenitas', enf: 'Malformaciones hereditarias / congenitas' },
            { id: 'Alergias', enf: 'Alergias a medicamentos, clima, sustancias, etc.' },
            { id: 'Enfermedades psiquiatricas', enf: 'Enfermedades psiquiatricas (Depresión, ansiedad, dsquizofrenia, etc)' },
            { id: 'Enfermedades neurologicas', enf: 'Enfermedades neurologicas (Epilepsia, convulsiones, alzheimer, demencia, parkinson, etc' },
            { id: 'Enfermedades cardiovasculares', enf: 'Enfermedades cardiovasculares (Preinfartos, infartos, colesterol, triglicéridos elevados)' },
            { id: 'Enfermedades broncopulmonares', enf: 'Enfermedades broncopulmonares (Asma, EPOC, bronquitis)' },
            { id: 'Enfermedades tiroideas', enf: 'Enfermedades tiroideas (hiper o hipotiroidismo)' },
            { id: 'Enfermedades renales', enf: 'Enfermedades renales (Litiasis, insuficiencia, diálisis)' },
            { id: 'Enfermedades osteoarticulares', enf: 'Enfermedades osteoarticulares (artritis, fibromialgia)' },
            { id: 'Enfermedades Infectocontagiosas', enf: 'Enfermedades Infectocontagiosas (Infecciones de relevancia)' },
            { id: 'Enfermedades Autoinmunes', enf: 'Enfermedades autoinmunes (LUPUS, artritis, etc.)' }
        ];
        this.patologicas = [
            { id: 'Diabetes Mellitus', value: 'Diabetes Mellitus' },
            { id: 'Hipertensión Arterial Sistémica', value: 'Hipertensión Arterial Sistémica' },
            { id: 'Obesidad', value: 'Obesidad' },
            { id: 'Cancer', value: 'Cancer' },
            { id: 'Artritis Reumatoide', value: 'Artritis Reumatoide' },
            { id: 'Enfermedad de Gota', value: 'Enfermedad de Gota (ácido úrico elevado)' },
            { id: 'Enf. Psiquiatricas', value: 'Enfermedades Psiquiatricas (ansiedad, depresión, esquizofrenia)' },
            { id: 'Enf. del sistema nervioso', value: 'Enfermedades del sistema nervioso (Epilepsia, covulsiones, alzheimer, demensia, parkinson, etc.' },
            { id: 'Enf. del sistema cardiovascular', value: 'Enfermedades del sistema cardiovascular' },
            { id: 'Enf. del sistema respiratorio', value: 'Enfermedades del sistema respiratorio' },
            { id: 'Enf. del sistema gastrointestinal', value: 'Enfermedades del sistema gastrointestinal' },
            { id: 'Enf. del sistema endocrino', value: 'Enfermedades del sistema endocrino' },
            { id: 'Enf. del sistema urinario', value: 'Enfermedades del sistema urinario' },
            { id: 'Enf. del sistema musculoesqueletico', value: 'Enfermedades del sistema musculoesqueletico (secuelas de lesiones, tenditis' },
            { id: 'Enf. del sistema tegumentario', value: 'Enfermedades del sistema tegumentario' },
            { id: 'Otra enfermedad cronico degenerativa', value: 'Otra enfermedad cronico degenerativa' }
        ];
        // Va agregando un array para cada campo, todos estan inicializados en false
    }
    HistoriaClinicaComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                console.log('sexo', this.pac_sexo);
                if (this.editar) {
                    this.constructorForms();
                    this.loadData();
                }
                else {
                    this.constructorForms();
                }
                this.firstFormGroup = this.fb.group({
                    firstCtrl: ['', forms_1.Validators.required]
                });
                this.secondFormGroup = this.fb.group({
                    secondCtrl: ['', forms_1.Validators.required]
                });
                this.thirdFormGroup = this.fb.group({
                    thirdControl: ['', forms_1.Validators.required]
                });
                this.fourthFormGroup = this.fb.group({
                    fourthCtrl: ['', forms_1.Validators.required]
                });
                return [2 /*return*/];
            });
        });
    };
    HistoriaClinicaComponent.prototype.constructorForms = function () {
        this.heredoFamForm = this.fb.group({
            padre: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            madre: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            abuelosPaternos: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            abuelosMaternos: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            hermanos: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            otros: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            observaciones: ('')
        });
        this.PatologiasForm = this.fb.group({
            patologias: new forms_1.FormArray(this.patologicas.map(function (control) { return new forms_1.FormControl((false)); })),
            Medicamento: this.fb.array([]),
            observaciones: ([''])
        });
        this.AlergiasForm = this.fb.group({
            alergias: ['', forms_1.Validators.required],
            alergia_tipo: ['', forms_1.Validators.required]
        });
        this.HospitalizacionesForm = this.fb.group({
            hospitalizaciones: ['', forms_1.Validators.required],
            hospitalizacion_fecha: ['', forms_1.Validators.required],
            hospitalizacion_causa: ['', forms_1.Validators.required],
            hospitalizacion_secuela: ['', forms_1.Validators.required]
        });
        this.QuirurgicasForm = this.fb.group({
            quirurgicas: ['', forms_1.Validators.required],
            quirurgico_fecha: ['', forms_1.Validators.required],
            quirurgico_causa: ['', forms_1.Validators.required],
            quirurgico_secuela: ['', forms_1.Validators.required]
        });
        this.TraumaticosForm = this.fb.group({
            traumaticos: ['', forms_1.Validators.required],
            traumatismo_fecha: ['', forms_1.Validators.required],
            traumatismo_tipo: ['', forms_1.Validators.required],
            traumatismo_causa: ['', forms_1.Validators.required],
            traumatismo_secuela: ['', forms_1.Validators.required]
        });
        this.TransfusionesForm = this.fb.group({
            transfusiones: ['', forms_1.Validators.required],
            transfusion_fecha: ['', forms_1.Validators.required],
            transfusion_causa: ['', forms_1.Validators.required]
        });
        this.PsicoactivasForm = this.fb.group({
            consumo_alguna_sustancia: ['', forms_1.Validators.required],
            sustancia_psicoactiva_alcohol: ['', forms_1.Validators.required],
            sustancia_psicoactiva_alcohol_frecuencia: ['', forms_1.Validators.required],
            sustancia_psicoactiva_alcohol_cantidad: ['', forms_1.Validators.required],
            sustancia_psicoactiva_tabaco: ['', forms_1.Validators.required],
            sustancia_psicoactiva_tabaco_frecuencia: ['', forms_1.Validators.required],
            sustancia_psicoactiva_tabaco_cantidad: ['', forms_1.Validators.required],
            sustancia_psicoactiva_otra: ['', forms_1.Validators.required],
            sustancia_psicoactiva_otra_tipo: ['', forms_1.Validators.required],
            sustancia_psicoactiva_otra_ultimo_consumo: ['', forms_1.Validators.required],
            sustancia_psicoactiva_otra_frecuencia: ['', forms_1.Validators.required]
        });
        this.GinecoObstricoForm = this.fb.group({
            pac_menarquia: ['', forms_1.Validators.required],
            pac_carac_mens: ['', forms_1.Validators.required],
            pac_dias_mens: ['', forms_1.Validators.required],
            pac_cant_mens: ['', forms_1.Validators.required],
            pac_frec_mens: ['', forms_1.Validators.required],
            pac_precencia_dolor_mens: ['', forms_1.Validators.required],
            pac_otras_sec_mens: ['', forms_1.Validators.required],
            androgenico_vida_sexual_activa: ['', forms_1.Validators.required],
            androgenico_inicio_vida_sexual: ['', forms_1.Validators.required],
            androgenico_no_comp_sexuales: ['', forms_1.Validators.required],
            androgenico_metodo_anticonceptivo: ['', forms_1.Validators.required],
            androgenico_tipo_relaciones: ['', forms_1.Validators.required],
            androgenico_ets: ['', forms_1.Validators.required],
            androgenico_metodo_anticonceptivo_hormonal: ['', forms_1.Validators.required],
            androgenico_androgenico_pac_metodo_anticonceptivo_hormonal_diu: ['', forms_1.Validators.required],
            ExamenProstata: [''],
            fecha_ultimo_Examen_Prostatico: ['', forms_1.Validators.required],
            observaciones_ultimo_examen_prostatico: ['', forms_1.Validators.required],
            pac_gestaciones: ['', forms_1.Validators.required],
            pac_cant_gestaciones: ['', forms_1.Validators.required],
            pac_ultima_gestacion: ['', forms_1.Validators.required],
            pac_ultima_gestacion_observacion: ['', forms_1.Validators.required],
            pac_partos: ['', forms_1.Validators.required],
            pac_cant_partos: ['', forms_1.Validators.required],
            pac_ultimo_parto: ['', forms_1.Validators.required],
            pac_ultimo_parto_observacion: ['', forms_1.Validators.required],
            pac_abortos: ['', forms_1.Validators.required],
            pac_cant_abortos: ['', forms_1.Validators.required],
            pac_ultimo_aborto: ['', forms_1.Validators.required],
            pac_ultimo_aborto_observacion: ['', forms_1.Validators.required],
            pac_cesareas: ['', forms_1.Validators.required],
            pac_cant_cesareas: ['', forms_1.Validators.required],
            pac_ultima_cesarea: ['', forms_1.Validators.required],
            pac_ultima_cesarea_observacion: ['', forms_1.Validators.required],
            pac_papanicolau: ['', forms_1.Validators.required],
            pac_papanicolau_fecha: ['', forms_1.Validators.required],
            pac_papanicolau_observacion: ['', forms_1.Validators.required],
            pac_tamis_mama: ['', forms_1.Validators.required],
            pac_tamis_fecha: ['', forms_1.Validators.required],
            pac_tamis_observacion: ['', forms_1.Validators.required]
        });
        this.NoPatologicosForm = this.fb.group({
            pac_mascota: ['', forms_1.Validators.required],
            pac_mascota_tipo: ['', forms_1.Validators.required],
            pac_NumeroHabitaciones: ['', forms_1.Validators.required],
            pac_NumeroHabitantes: ['', forms_1.Validators.required],
            pac_ConsumoDeAlimentosCapeados: ['', forms_1.Validators.required],
            pac_GruposAlimenticios: ['', forms_1.Validators.required],
            pac_CantidadDeComidasAlDia: ['', forms_1.Validators.required],
            pac_ConsumoDePan: ['', forms_1.Validators.required],
            pac_ConsumoDeSal: ['', forms_1.Validators.required],
            pac_ConsumoDeRefresco: ['', forms_1.Validators.required],
            observaciones: [''],
            Actividades_Fisicas: this.fb.array([])
        });
    };
    HistoriaClinicaComponent.prototype.loadData = function () {
        var _this = this;
        this.PacienteService.getPacienteData(this.idPaciente).subscribe(function (data) {
            console.log('Data', data);
            //#region LoadArrays
            var varPadre = _this.heredoFamForm.get('padre');
            for (var i = 0; i < varPadre.length; i++) {
                if (data['pac_antecedentes_data'].heredo_familiares.padre.includes(_this.enfermedades[i].id)) {
                    varPadre.at(i).setValue(true);
                }
            }
            var varMadre = _this.heredoFamForm.get('madre');
            for (var i = 0; i < varMadre.length; i++) {
                if (data['pac_antecedentes_data'].heredo_familiares.madre.includes(_this.enfermedades[i].id)) {
                    varMadre.at(i).setValue(true);
                }
            }
            var varAbPat = _this.heredoFamForm.get('abuelosPaternos');
            for (var i = 0; i < varAbPat.length; i++) {
                if (data['pac_antecedentes_data'].heredo_familiares.abuelosPaternos.includes(_this.enfermedades[i].id)) {
                    varAbPat.at(i).setValue(true);
                }
            }
            var varAbMat = _this.heredoFamForm.get('abuelosMaternos');
            for (var i = 0; i < varAbMat.length; i++) {
                if (data['pac_antecedentes_data'].heredo_familiares.abuelosMaternos.includes(_this.enfermedades[i].id)) {
                    varAbMat.at(i).setValue(true);
                }
            }
            var varHmnos = _this.heredoFamForm.get('hermanos');
            for (var i = 0; i < varHmnos.length; i++) {
                if (data['pac_antecedentes_data'].heredo_familiares.hermanos.includes(_this.enfermedades[i].id)) {
                    varHmnos.at(i).setValue(true);
                }
            }
            var varOtros = _this.heredoFamForm.get('otros');
            for (var i = 0; i < varOtros.length; i++) {
                if (data['pac_antecedentes_data'].heredo_familiares.otros.includes(_this.enfermedades[i].id)) {
                    varOtros.at(i).setValue(true);
                }
            }
            var varPatologias = _this.PatologiasForm.get('patologias');
            for (var i = 0; i < varPatologias.length; i++) {
                if (data['pac_antecedentes_data'].Patologicos.cronico_degenerativas.includes(_this.patologicas[i].id)) {
                    varPatologias.at(i).setValue(true);
                }
            }
            //#endregion
            //#region Patologias
            _this.heredoFamForm.patchValue({
                observaciones: data['pac_antecedentes_data'].Observaciones.observaciones_heredoFam
            });
            _this.PatologiasForm.patchValue({
                observaciones: data['pac_antecedentes_data'].Observaciones.observaciones_Patologias
            });
            _this.AlergiasForm.patchValue({
                alergias: data['pac_antecedentes_data'].Patologicos.alergias.alergias,
                alergia_tipo: data['pac_antecedentes_data'].Patologicos.alergias.alergia_tipo
            });
            _this.NoPatologicosForm.patchValue({
                pac_habitaciones: data['pac_antecedentes_data'].No_Patolgicos.pac_habitaciones,
                pac_habitantes: data['pac_antecedentes_data'].No_Patolgicos.pac_habitantes,
                mascota: data['pac_antecedentes_data'].No_Patolgicos.mascota,
                pac_mascota_tipo: data['pac_antecedentes_data'].No_Patolgicos.pac_mascota_tipo,
                pac_comidas_al_dia: data['pac_antecedentes_data'].No_Patolgicos.pac_comidas_al_dia,
                pac_consumo_pan: data['pac_antecedentes_data'].No_Patolgicos.pac_consumo_pan,
                pac_consumo_refresco: data['pac_antecedentes_data'].No_Patolgicos.pac_consumo_refresco,
                pac_consumo_sal: data['pac_antecedentes_data'].No_Patolgicos.pac_consumo_sal,
                pac_gpos_alimenticios: data['pac_antecedentes_data'].No_Patolgicos.pac_gpos_alimenticios,
                pac_alimentos_capeados: data['pac_antecedentes_data'].No_Patolgicos.pac_alimentos_capeados,
                observaciones: data['pac_antecedentes_data'].Observaciones.observaciones_NoPatologicos
            });
            _this.HospitalizacionesForm.patchValue({
                hospitalizaciones: data['pac_antecedentes_data'].Patologicos.Hospitalizaciones.hospitalizaciones,
                hospitalizacion_fecha: data['pac_antecedentes_data'].Patologicos.Hospitalizaciones.hospitalizacion_fecha,
                hospitalizacion_causa: data['pac_antecedentes_data'].Patologicos.Hospitalizaciones.hospitalizacion_causa,
                hospitalizacion_secuela: data['pac_antecedentes_data'].Patologicos.Hospitalizaciones.hospitalizacion_secuela
            });
            _this.QuirurgicasForm.patchValue({
                quirurgicas: data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgicas,
                quirurgico_fecha: data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgico_fecha,
                quirurgico_causa: data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgico_causa,
                quirurgico_secuela: data['pac_antecedentes_data'].Patologicos.quirurgicas.quirurgico_secuela
            });
            _this.TraumaticosForm.patchValue({
                traumaticos: data['pac_antecedentes_data'].Patologicos.traumaticos.traumaticos,
                traumatismo_fecha: data['pac_antecedentes_data'].Patologicos.traumaticos.traumatismo_fecha,
                traumatismo_tipo: data['pac_antecedentes_data'].Patologicos.traumaticos.traumatismo_tipo,
                traumatismo_causa: data['pac_antecedentes_data'].Patologicos.traumaticos.traumatismo_causa,
                traumatismo_secuela: data['pac_antecedentes_data'].Patologicos.traumaticos.traumatismo_secuela
            });
            _this.TransfusionesForm.patchValue({
                transfusiones: data['pac_antecedentes_data'].Patologicos.transfusiones.transfusiones,
                transfusion_fecha: data['pac_antecedentes_data'].Patologicos.transfusiones.transfusion_fecha,
                transfusion_causa: data['pac_antecedentes_data'].Patologicos.transfusiones.transfusion_causa
            });
            _this.PsicoactivasForm.patchValue({
                sustancia_psicoactiva_alcohol: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_alcohol,
                sustancia_psicoactiva_alcohol_frecuencia: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_alcohol_frecuencia,
                sustancia_psicoactiva_alcohol_cantidad: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_alcohol_cantidad,
                sustancia_psicoactiva_tabaco: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_tabaco,
                sustancia_psicoactiva_tabaco_frecuencia: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_tabaco_frecuencia,
                sustancia_psicoactiva_tabaco_cantidad: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_tabaco_cantidad,
                sustancia_psicoactiva_otra: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_otra,
                sustancia_psicoactiva_otra_tipo: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_otra_tipo,
                sustancia_psicoactiva_otra_ultimo_consumo: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_otra_ultimo_consumo,
                sustancia_psicoactiva_otra_frecuencia: data['pac_antecedentes_data'].Patologicos.sustancias_psicoactivas.sustancia_psicoactiva_otra_frecuencia
            });
            //#endregion
            _this.GinecoObstricoForm = _this.fb.group({
                pac_menarquia: data['pac_antecedentes_data'].GinecoObstrico.pac_menarquia,
                pac_carac_mens: data['pac_antecedentes_data'].GinecoObstrico.pac_carac_mens,
                pac_dias_mens: data['pac_antecedentes_data'].GinecoObstrico.pac_dias_mens,
                pac_cant_mens: data['pac_antecedentes_data'].GinecoObstrico.pac_cant_mens,
                pac_frec_mens: data['pac_antecedentes_data'].GinecoObstrico.pac_frec_mens,
                pac_precencia_dolor_mens: data['pac_antecedentes_data'].GinecoObstrico.pac_precencia_dolor_mens,
                pac_otras_sec_mens: data['pac_antecedentes_data'].GinecoObstrico.pac_otras_sec_mens,
                androgenico_vida_sexual_activa: data['pac_antecedentes_data'].GinecoObstrico.androgenico_vida_sexual_activa,
                androgenico_inicio_vida_sexual: data['pac_antecedentes_data'].GinecoObstrico.androgenico_vida_sexual_activa,
                androgenico_no_comp_sexuales: data['pac_antecedentes_data'].GinecoObstrico.androgenico_no_comp_sexuales,
                androgenico_metodo_anticonceptivo: data['pac_antecedentes_data'].GinecoObstrico.androgenico_metodo_anticonceptivo,
                androgenico_tipo_relaciones: data['pac_antecedentes_data'].GinecoObstrico.androgenico_tipo_relaciones,
                androgenico_ets: data['pac_antecedentes_data'].GinecoObstrico.androgenico_ets,
                androgenico_metodo_anticonceptivo_hormonal: data['pac_antecedentes_data'].GinecoObstrico.androgenico_metodo_anticonceptivo_hormonal,
                androgenico_androgenico_pac_metodo_anticonceptivo_hormonal_diu: data['pac_antecedentes_data'].GinecoObstrico.androgenico_androgenico_pac_metodo_anticonceptivo_hormonal_diu,
                ExamenProstata: data['pac_antecedentes_data'].GinecoObstrico.ExamenProstata,
                fecha_ultimo_Examen_Prostatico: data['pac_antecedentes_data'].GinecoObstrico.fecha_ultimo_Examen_Prostatico,
                observaciones_ultimo_examen_prostatico: data['pac_antecedentes_data'].GinecoObstrico.observaciones_ultimo_examen_prostatico,
                pac_gestaciones: data['pac_antecedentes_data'].GinecoObstrico.pac_gestaciones,
                pac_cant_gestaciones: data['pac_antecedentes_data'].GinecoObstrico.pac_cant_gestaciones,
                pac_ultima_gestacion: data['pac_antecedentes_data'].GinecoObstrico.pac_ultima_gestacion,
                pac_ultima_gestacion_observacion: data['pac_antecedentes_data'].GinecoObstrico.pac_ultima_gestacion_observacion,
                pac_partos: data['pac_antecedentes_data'].GinecoObstrico.pac_partos,
                pac_cant_partos: data['pac_antecedentes_data'].GinecoObstrico.pac_cant_partos,
                pac_ultimo_parto: data['pac_antecedentes_data'].GinecoObstrico.pac_ultimo_parto,
                pac_ultimo_parto_observacion: data['pac_antecedentes_data'].GinecoObstrico.pac_ultimo_parto_observacion,
                pac_abortos: data['pac_antecedentes_data'].GinecoObstrico.pac_abortos,
                pac_cant_abortos: data['pac_antecedentes_data'].GinecoObstrico.pac_cant_abortos,
                pac_ultimo_aborto: data['pac_antecedentes_data'].GinecoObstrico.pac_ultimo_aborto,
                pac_ultimo_aborto_observacion: data['pac_antecedentes_data'].GinecoObstrico.pac_ultimo_aborto_observacion,
                pac_cesareas: data['pac_antecedentes_data'].GinecoObstrico.pac_cesareas,
                pac_cant_cesareas: data['pac_antecedentes_data'].GinecoObstrico.pac_cant_cesareas,
                pac_ultima_cesarea: data['pac_antecedentes_data'].GinecoObstrico.pac_ultima_cesarea,
                pac_ultima_cesarea_observacion: data['pac_antecedentes_data'].GinecoObstrico.pac_ultima_cesarea_observacion,
                pac_papanicolau: data['pac_antecedentes_data'].GinecoObstrico.pac_papanicolau,
                pac_papanicolau_fecha: data['pac_antecedentes_data'].GinecoObstrico.pac_papanicolau_fecha,
                pac_papanicolau_observacion: data['pac_antecedentes_data'].GinecoObstrico.pac_papanicolau_observacion,
                pac_tamis_mama: data['pac_antecedentes_data'].GinecoObstrico.pac_tamis_mama,
                pac_tamis_fecha: data['pac_antecedentes_data'].GinecoObstrico.pac_tamis_fecha,
                pac_tamis_observacion: data['pac_antecedentes_data'].GinecoObstrico.pac_tamis_observacion
            });
        });
    };
    HistoriaClinicaComponent.prototype.onSubmit = function () {
        return false;
    };
    HistoriaClinicaComponent.prototype.onChanges = function () {
        var _this = this;
        /*  this.NoPatologicosForm.get("mascota").valueChanges.subscribe(data => {
           if (data == "Si"){
             this.NoPatologicosForm.get("pac_mascota_tipo").enable();
           }
           else {
             this.NoPatologicosForm.get("pac_mascota_tipo").disable();
           }
         }) */
        this.AlergiasForm.get("alergias").valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.AlergiasForm.get("alergia_tipo").enable();
            }
            else {
                _this.AlergiasForm.get("alergia_tipo").disable();
            }
        });
        this.HospitalizacionesForm.get("hospitalizaciones").valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.HospitalizacionesForm.get("hospitalizacion_fecha").enable();
                _this.HospitalizacionesForm.get("hospitalizacion_causa").enable();
                _this.HospitalizacionesForm.get("hospitalizacion_secuela").enable();
            }
            else {
                _this.HospitalizacionesForm.get("hospitalizacion_fecha").disable();
                _this.HospitalizacionesForm.get("hospitalizacion_causa").disable();
                _this.HospitalizacionesForm.get("hospitalizacion_secuela").disable();
            }
        });
        this.QuirurgicasForm.get("quirurgicas").valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.QuirurgicasForm.get("quirurgico_fecha").enable();
                _this.QuirurgicasForm.get("quirurgico_causa").enable();
                _this.QuirurgicasForm.get("quirurgico_secuela").enable();
            }
            else {
                _this.QuirurgicasForm.get("quirurgico_fecha").disable();
                _this.QuirurgicasForm.get("quirurgico_causa").disable();
                _this.QuirurgicasForm.get("quirurgico_secuela").disable();
            }
        });
        this.TraumaticosForm.get('traumaticos').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.TraumaticosForm.get("traumatismo_fecha").enable();
                _this.TraumaticosForm.get("traumatismo_tipo").enable();
                _this.TraumaticosForm.get("traumatismo_causa").enable();
                _this.TraumaticosForm.get("traumatismo_secuela").enable();
            }
            else {
                _this.TraumaticosForm.get("traumatismo_fecha").disable();
                _this.TraumaticosForm.get("traumatismo_tipo").disable();
                _this.TraumaticosForm.get("traumatismo_causa").disable();
                _this.TraumaticosForm.get("traumatismo_secuela").disable();
            }
        });
        this.TransfusionesForm.get("transfusiones").valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.TransfusionesForm.get('transfusion_fecha').enable();
                _this.TransfusionesForm.get('transfusion_causa').enable();
            }
            else {
                _this.TransfusionesForm.get('transfusion_fecha').disable();
                _this.TransfusionesForm.get('transfusion_causa').disable();
            }
        });
        this.PsicoactivasForm.get('sustancia_psicoactiva_alcohol').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.PsicoactivasForm.get("sustancia_psicoactiva_alcohol_frecuencia").enable();
                _this.PsicoactivasForm.get("sustancia_psicoactiva_alcohol_cantidad").enable();
            }
            else {
                _this.PsicoactivasForm.get("sustancia_psicoactiva_alcohol_frecuencia").disable();
                _this.PsicoactivasForm.get("sustancia_psicoactiva_alcohol_cantidad").disable();
            }
        });
        this.PsicoactivasForm.get('sustancia_psicoactiva_tabaco').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.PsicoactivasForm.get("sustancia_psicoactiva_tabaco_frecuencia").enable();
                _this.PsicoactivasForm.get("sustancia_psicoactiva_tabaco_cantidad").enable();
            }
            else {
                _this.PsicoactivasForm.get("sustancia_psicoactiva_tabaco_frecuencia").disable();
                _this.PsicoactivasForm.get("sustancia_psicoactiva_tabaco_cantidad").disable();
            }
        });
        this.PsicoactivasForm.get('sustancia_psicoactiva_otra').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.PsicoactivasForm.get("sustancia_psicoactiva_otra_tipo").enable();
                _this.PsicoactivasForm.get("sustancia_psicoactiva_otra_ultimo_consumo").enable();
                _this.PsicoactivasForm.get("sustancia_psicoactiva_otra_frecuencia").enable();
            }
            else {
                _this.PsicoactivasForm.get("sustancia_psicoactiva_otra_tipo").disable();
                _this.PsicoactivasForm.get("sustancia_psicoactiva_otra_ultimo_consumo").disable();
                _this.PsicoactivasForm.get("sustancia_psicoactiva_otra_frecuencia").disable();
            }
        });
        if (this.bandSexo == 'M') {
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
        else {
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
        this.GinecoObstricoForm.get('ExamenProstata').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get("fecha_ultimo_Examen_Prostatico").enable();
                _this.GinecoObstricoForm.get("observaciones_ultimo_examen_prostatico").enable();
            }
            else {
                _this.GinecoObstricoForm.get("fecha_ultimo_Examen_Prostatico").disable();
                _this.GinecoObstricoForm.get("observaciones_ultimo_examen_prostatico").disable();
            }
        });
        this.GinecoObstricoForm.get('androgenico_metodo_anticonceptivo').valueChanges.subscribe(function (data) {
            if (data == 'Hormonal') {
                _this.GinecoObstricoForm.get('androgenico_metodo_anticonceptivo_hormonal').enable();
            }
            else {
                _this.GinecoObstricoForm.get('androgenico_metodo_anticonceptivo_hormonal').disable();
            }
        });
        this.GinecoObstricoForm.get('androgenico_metodo_anticonceptivo_hormonal').valueChanges.subscribe(function (data) {
            if (data == 'DIU') {
                _this.GinecoObstricoForm.get('androgenico_androgenico_pac_metodo_anticonceptivo_hormonal_diu').enable();
            }
            else {
                _this.GinecoObstricoForm.get('androgenico_pac_metodo_anticonceptivo_hormonal_diu').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_gestaciones').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('pac_cant_gestaciones').enable();
                _this.GinecoObstricoForm.get('pac_ultima_gestacion').enable();
                _this.GinecoObstricoForm.get('pac_ultima_gestacion_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('pac_cant_gestaciones').disable();
                _this.GinecoObstricoForm.get('pac_ultima_gestacion').disable();
                _this.GinecoObstricoForm.get('pac_ultima_gestacion_observacion').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_partos').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('pac_cant_partos').enable();
                _this.GinecoObstricoForm.get('pac_ultimo_parto').enable();
                _this.GinecoObstricoForm.get('pac_ultimo_parto_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('pac_cant_partos').disable();
                _this.GinecoObstricoForm.get('pac_ultimo_parto').disable();
                _this.GinecoObstricoForm.get('pac_ultimo_parto_observacion').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_abortos').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('pac_cant_abortos').enable();
                _this.GinecoObstricoForm.get('pac_ultimo_aborto').enable();
                _this.GinecoObstricoForm.get('pac_ultimo_aborto_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('pac_cant_abortos').disable();
                _this.GinecoObstricoForm.get('pac_ultimo_aborto').disable();
                _this.GinecoObstricoForm.get('pac_ultimo_aborto_observacion').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_cesareas').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('pac_cant_cesareas').enable();
                _this.GinecoObstricoForm.get('pac_ultima_cesarea').enable();
                _this.GinecoObstricoForm.get('pac_ultima_cesarea_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('pac_cant_cesareas').disable();
                _this.GinecoObstricoForm.get('pac_ultima_cesarea').disable();
                _this.GinecoObstricoForm.get('pac_ultima_cesarea_observacion').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_papanicolau').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('pac_papanicolau_fecha').enable();
                _this.GinecoObstricoForm.get('pac_papanicolau_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('pac_papanicolau_fecha').enable();
                _this.GinecoObstricoForm.get('pac_papanicolau_observacion').enable();
            }
        });
        this.GinecoObstricoForm.get('pac_tamis_mama').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('pac_tamis_fecha').enable();
                _this.GinecoObstricoForm.get('pac_tamis_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('pac_tamis_fecha').enable();
                _this.GinecoObstricoForm.get('pac_tamis_observacion').enable();
            }
        });
    };
    HistoriaClinicaComponent.prototype.submit = function () {
        this.guardaPatolgiasFam();
    };
    HistoriaClinicaComponent.prototype.guardaPatolgiasFam = function () {
        var _this = this;
        var model = {
            pac_antecedentes_data: {
                heredo_familiares: {
                    padre: this.heredoFamForm.value.padre.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; }),
                    madre: this.heredoFamForm.value.madre.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; }),
                    abuelosPaternos: this.heredoFamForm.value.abuelosPaternos.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; }),
                    abuelosMaternos: this.heredoFamForm.value.abuelosMaternos.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; }),
                    hermanos: this.heredoFamForm.value.hermanos.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; }),
                    otros: this.heredoFamForm.value.otros.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; })
                },
                No_Patolgicos: this.NoPatologicosForm.value,
                Patologicos: {
                    cronico_degenerativas: this.PatologiasForm.value.patologias.map(function (checked, index) { return checked ? _this.patologicas[index].id : null; }).filter(function (value) { return value !== null; }),
                    alergias: this.AlergiasForm.value,
                    Hospitalizaciones: this.HospitalizacionesForm.value,
                    quirurgicas: this.QuirurgicasForm.value,
                    traumaticos: this.TraumaticosForm.value,
                    transfusiones: this.TransfusionesForm.value,
                    sustancias_psicoactivas: this.PsicoactivasForm.value,
                    Medicamentos: this.PatologiasForm.value.Medicamento
                },
                GinecoObstrico: this.GinecoObstricoForm.value,
                Observaciones: {
                    observaciones_heredoFam: this.heredoFamForm.value.observaciones,
                    observaciones_NoPatologicos: this.NoPatologicosForm.value.observaciones,
                    observaciones_Patologias: this.PatologiasForm.value.observaciones
                }
            }
        };
        var post = model;
        post['id'] = this.idPaciente;
        post['pac_historia_clinica'] = true;
        if (this.editar) {
            this.alertEditado();
        }
        else {
            this.alertGuardado();
        }
        this.cerrarModal.emit(true);
    };
    HistoriaClinicaComponent.prototype.alertGuardado = function () {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Historia Clínica Completa',
            text: 'Se ha completado correctamente los antecedentes.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(function () {
            _this.heredoFamForm.reset();
            _this.AlergiasForm.reset();
            _this.GinecoObstricoForm.reset();
            _this.PatologiasForm.reset();
            _this.QuirurgicasForm.reset();
            _this.HospitalizacionesForm.reset();
            _this.NoPatologicosForm.reset();
            _this.TraumaticosForm.reset();
            _this.TransfusionesForm.reset();
            _this.router.navigate(['pacientes']);
            return false;
        });
    };
    HistoriaClinicaComponent.prototype.alertEditado = function () {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Historia Clínica Completa',
            text: 'Se ha editado correctamente los antecedentes.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(function () {
            _this.heredoFamForm.reset();
            _this.AlergiasForm.reset();
            _this.GinecoObstricoForm.reset();
            _this.PatologiasForm.reset();
            _this.QuirurgicasForm.reset();
            _this.HospitalizacionesForm.reset();
            _this.NoPatologicosForm.reset();
            _this.TraumaticosForm.reset();
            _this.TransfusionesForm.reset();
            _this.router.navigate(['pacientes']);
            return false;
        });
    };
    Object.defineProperty(HistoriaClinicaComponent.prototype, "act_fisicas", {
        get: function () {
            return this.NoPatologicosForm.controls["Actividades_Fisicas"];
        },
        enumerable: false,
        configurable: true
    });
    HistoriaClinicaComponent.prototype.addActividades = function () {
        var actividad = this.fb.group({
            pac_actividad_fisica: [''],
            pac_actividad_frec: ['']
        });
        this.act_fisicas.push(actividad);
    };
    HistoriaClinicaComponent.prototype.deleteActividad = function (actId) {
        this.act_fisicas.removeAt(actId);
    };
    Object.defineProperty(HistoriaClinicaComponent.prototype, "list_medicamentos", {
        get: function () {
            return this.PatologiasForm.controls["Medicamento"];
        },
        enumerable: false,
        configurable: true
    });
    HistoriaClinicaComponent.prototype.addMedicamento = function () {
        var med = this.fb.group({
            medicamento_nombre: ['', [forms_1.Validators.required]],
            medicamento_frecuencia_consumo: ['', [forms_1.Validators.required]],
            medicamento_inicio_de_consumo: ['', [forms_1.Validators.required]]
        });
        this.list_medicamentos.push(med);
    };
    HistoriaClinicaComponent.prototype.deleteMedicamento = function (medicamentoId) {
        return this.list_medicamentos.removeAt(medicamentoId);
    };
    HistoriaClinicaComponent.prototype.postHistoriaClinica = function () {
        var _this = this;
        var post = {};
        post['id_register'] = this.AuthService.currentUserId;
        post['idPaciente'] = this.idPaciente;
        this.HistoriaClinicaAPIService.postHistoriaClinica(post).subscribe(function (data) {
            console.log('HC', data);
            //this.postNoPatologico(data.idHistoriaClinica);
            //this.postPatologico(data.idHistoriaClinica);
            //this.postAndrogenicos(data.idHistoriaClinica);
            if (_this.pac_sexo == 'M') {
                _this.postAntecedenteProstatico(data.idHistoriaClinica);
            }
        });
    };
    HistoriaClinicaComponent.prototype.postNoPatologico = function (idHistoriaClinica) {
        var _this = this;
        console.log('idHistoriaClinica', idHistoriaClinica);
        var noPat = this.NoPatologicosForm.value;
        var actividadesFisicas = noPat['Actividades_Fisicas'];
        noPat['idHistoriaClinica'] = idHistoriaClinica;
        delete noPat['Actividades_Fisicas'];
        console.log('post', noPat);
        this.HistoriaClinicaAPIService.postNoPatologico(noPat).subscribe(function (data) {
            for (var i = 0; i < actividadesFisicas.length; i++) {
                var actividad = {};
                actividad['idAntecedenteNoPatologico'] = data.idAntecedenteNoPatologico;
                actividad['actividad_nombre'] = actividadesFisicas[i]['pac_actividad_fisica'];
                actividad['actividad_frecuencia'] = actividadesFisicas[i]['pac_actividad_frec'];
                actividad['estatusActividadFisica'] = true;
                console.log('actividad [', i, ']', actividad);
                _this.HistoriaClinicaAPIService.postActividadFisica(actividad).subscribe(function (data) {
                    console.log('data', data);
                });
            }
        });
    };
    HistoriaClinicaComponent.prototype.postPatologico = function (idHistoriaClinica) {
        var _this = this;
        var POST = {};
        POST['idHistoriaClinica'] = idHistoriaClinica;
        POST['antecedente_patologico_hospitalizacion'] = this.HospitalizacionesForm.value.hospitalizaciones;
        POST['antecedente_patologico_quirugicas'] = this.QuirurgicasForm.value.quirurgicas;
        POST['antecedente_patologico_trumatismo'] = this.TraumaticosForm.value.traumaticos;
        POST['antecedente_patologico_trasnfusion'] = this.TransfusionesForm.value.transfusiones;
        POST['antecedente_patologico_consumo_de_sustancia_psicoactiva'] = this.PsicoactivasForm.value.consumo_alguna_sustancia;
        POST['antecedente_patologico_alergias'] = this.AlergiasForm.value.alergias;
        this.HistoriaClinicaAPIService.postPatologico(POST).subscribe(function (data) {
            if (POST['antecedente_patologico_hospitalizacion'] == 'Si') {
                var hospitalizacion = _this.HospitalizacionesForm.value;
                hospitalizacion['idAntecedentePatologico'] = data.id;
                delete hospitalizacion['hospitalizaciones'];
                _this.HistoriaClinicaAPIService.postHospitalizacion(hospitalizacion).subscribe(function (hospitalizacion) {
                    console.log('hospitalizacion', hospitalizacion);
                });
            }
            if (POST['antecedente_patologico_alergias'] == 'Si') {
                var alergia = _this.AlergiasForm.value;
                delete alergia['hospitalizaciones'];
                alergia['idAntecedentePatologico'] = data.id;
                _this.HistoriaClinicaAPIService.postAlergia(alergia).subscribe(function (alergia) {
                    console.log('alergia', alergia);
                });
            }
            if (POST['antecedente_patologico_quirugicas'] == 'Si') {
                var quirurgica = _this.QuirurgicasForm.value;
                delete quirurgica['quirurgicas'];
                quirurgica['idAntecedentePatologico'] = data.id;
                _this.HistoriaClinicaAPIService.postQuirurgica(quirurgica).subscribe(function (quirurgica) {
                    console.log('quirurgica', quirurgica);
                });
            }
            if (POST['antecedente_patologico_trumatismo'] == 'Si') {
                var traumatismo = _this.TraumaticosForm.value;
                delete traumatismo['traumaticos'];
                traumatismo['idAntecedentePatologico'] = data.id;
                console.log('traumatismo', traumatismo);
                _this.HistoriaClinicaAPIService.postTraumatismo(traumatismo).subscribe(function (traumatismo) {
                    console.log('quirurgica', traumatismo);
                });
            }
            if (POST['antecedente_patologico_trasnfusion'] == 'Si') {
                var transfusion = _this.TransfusionesForm.value;
                delete transfusion['transfusiones'];
                transfusion['idAntecedentePatologico'] = data.id;
                console.log('transfusion', transfusion);
                _this.HistoriaClinicaAPIService.postTransfusion(transfusion).subscribe(function (transfusion) {
                    console.log('transfusion', transfusion);
                });
            }
            if (POST['antecedente_patologico_consumo_de_sustancia_psicoactiva'] == 'Si') {
                var sustancias = _this.PsicoactivasForm.value;
                sustancias['idAntecedentePatologico'] = data.id;
                console.log('sustancias', sustancias);
                _this.HistoriaClinicaAPIService.postSustanciasPsicoactivas(sustancias).subscribe(function (sustancias) {
                    console.log('sustancia_psicoactiva_otra', sustancias);
                });
            }
            var padecimientos = _this.PatologiasForm.value.patologias.map(function (checked, index) { return checked ? _this.patologicas[index].id : null; }).filter(function (value) { return value !== null; });
            for (var i = 0; i < padecimientos.length; i++) {
                var padecimiento = {};
                padecimiento['padecimiento'] = padecimientos[i];
                padecimiento['idAntecedentePatologico'] = data.id;
                padecimiento['padecimiento_estatus'] = true;
                _this.HistoriaClinicaAPIService.postPadecimiento(padecimiento).subscribe(function (padecimiento) {
                    console.log('padecimiento', padecimiento);
                });
            }
            console.log('Medicamentos', _this.PatologiasForm.value.Medicamento);
            var medicamentos = _this.PatologiasForm.value.Medicamento;
            if (medicamentos.length > 0) {
                var detalleMedicamento = {};
                detalleMedicamento['idAntecedentePatologico'] = data.id;
                _this.HistoriaClinicaAPIService.postDetalleMedicamento(detalleMedicamento).subscribe(function (detalle) {
                    console.log('detalleMedicamento', detalle);
                    for (var i = 0; i < medicamentos.length; i++) {
                        var medicamento = {};
                        medicamento = medicamentos[i];
                        medicamento['idDetalleMedicamento'] = detalle.id;
                        _this.HistoriaClinicaAPIService.postMedicamento(medicamento).subscribe(function (medicamento) {
                            console.log('medicamento', medicamento);
                        });
                    }
                });
            }
        });
    };
    HistoriaClinicaComponent.prototype.postAndrogenicos = function (idAntecedentePatologico) {
        var androgenico = {};
        androgenico['androgenico_vida_sexual_activa'] = this.GinecoObstricoForm.value.androgenico_vida_sexual_activa;
        androgenico['androgenico_inicio_vida_sexual'] = this.GinecoObstricoForm.value.androgenico_inicio_vida_sexual;
        androgenico['androgenico_no_comp_sexuales'] = this.GinecoObstricoForm.value.androgenico_no_comp_sexuales;
        androgenico['androgenico_metodo_anticonceptivo'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo;
        androgenico['androgenico_tipo_relaciones'] = this.GinecoObstricoForm.value.androgenico_tipo_relaciones;
        androgenico['androgenico_ets'] = this.GinecoObstricoForm.value.androgenico_ets;
        androgenico['androgenico_metodo_anticonceptivo_hormonal'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo_hormonal;
        androgenico['androgenico_metodo_anticonceptivo_hormonal'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo_hormonal;
        androgenico['idAntecedentePatologico'] = idAntecedentePatologico;
        this.HistoriaClinicaAPIService.postAndrogenicos(androgenico).subscribe(function (androgenico) {
            console.log('androgenico', androgenico);
        });
    };
    HistoriaClinicaComponent.prototype.postAntecedenteProstatico = function (idHistoriaClinica) {
        var _this = this;
        var prostatico = {};
        prostatico['idHistoriaClinica'] = idHistoriaClinica;
        prostatico['ExamenProstata'] = this.GinecoObstricoForm.value.ExamenProstata;
        this.HistoriaClinicaAPIService.postAntecedenteProstatico(prostatico).subscribe(function (prostatico) {
            if (prostatico['ExamenProstata'] == 'Si') {
                var examenProstata = {};
                examenProstata['fecha_ultimo_Examen_Prostatico'] = _this.GinecoObstricoForm.value.fecha_ultimo_Examen_Prostatico;
                examenProstata['observaciones_ultimo_examen_prostatico'] = _this.GinecoObstricoForm.value.observaciones_ultimo_examen_prostatico;
                examenProstata['idAntecedenteProstatico'] = prostatico.id;
                _this.HistoriaClinicaAPIService.postExamenProstatico(examenProstata).subscribe(function (examenProstata) {
                    console.log('examenProstata', examenProstata);
                });
            }
        });
    };
    __decorate([
        core_1.Input()
    ], HistoriaClinicaComponent.prototype, "pac_sexo");
    __decorate([
        core_1.Input()
    ], HistoriaClinicaComponent.prototype, "editar");
    __decorate([
        core_1.Input()
    ], HistoriaClinicaComponent.prototype, "idPaciente");
    __decorate([
        core_1.Output()
    ], HistoriaClinicaComponent.prototype, "cerrarModal");
    HistoriaClinicaComponent = __decorate([
        core_1.Component({
            selector: 'app-historia-clinica',
            templateUrl: './historia-clinica.component.html',
            styleUrls: ['./historia-clinica.component.scss']
        })
    ], HistoriaClinicaComponent);
    return HistoriaClinicaComponent;
}());
exports.HistoriaClinicaComponent = HistoriaClinicaComponent;

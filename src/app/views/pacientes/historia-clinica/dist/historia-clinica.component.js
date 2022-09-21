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
        this.infoHistoriaClinica = [];
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
                switch (_a.label) {
                    case 0:
                        console.log('sexo', this.pac_sexo);
                        if (!this.editar) return [3 /*break*/, 2];
                        this.constructorForms();
                        return [4 /*yield*/, this.getData()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.constructorForms();
                        _a.label = 3;
                    case 3:
                        console.log('id', this.idPaciente);
                        return [2 /*return*/];
                }
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
            menstruacion_fecha_Ultima: ['', forms_1.Validators.required],
            menstruacion_duracion: ['', forms_1.Validators.required],
            menstruacion_cantidad: ['', forms_1.Validators.required],
            menstruacion_frecuencia: ['', forms_1.Validators.required],
            menstruacion_presencia_De_Dolor: ['', forms_1.Validators.required],
            menstruacion_otras_secreciones: ['', forms_1.Validators.required],
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
            gestacion_cantidad: ['', forms_1.Validators.required],
            gestacion_ultima_fecha: ['', forms_1.Validators.required],
            gestacion_observacion: ['', forms_1.Validators.required],
            pac_partos: ['', forms_1.Validators.required],
            parto_cantidad: ['', forms_1.Validators.required],
            parto_ultima_fecha: ['', forms_1.Validators.required],
            parto_observacion: ['', forms_1.Validators.required],
            pac_abortos: ['', forms_1.Validators.required],
            aboto_cantidad: ['', forms_1.Validators.required],
            aborto_ultima_fecha: ['', forms_1.Validators.required],
            aborto_observacion: ['', forms_1.Validators.required],
            pac_cesareas: ['', forms_1.Validators.required],
            cesarea_cantidad: ['', forms_1.Validators.required],
            cesarea_ultima_fecha: ['', forms_1.Validators.required],
            cesarea_observacion: ['', forms_1.Validators.required],
            pac_papanicolau: ['', forms_1.Validators.required],
            papanicolau_fecha: ['', forms_1.Validators.required],
            papanicolau_observacion: ['', forms_1.Validators.required],
            pac_tamis_mama: ['', forms_1.Validators.required],
            tamis_fecha: ['', forms_1.Validators.required],
            tamis_observacion: ['', forms_1.Validators.required]
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
        else {
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
                _this.GinecoObstricoForm.get('gestacion_cantidad').enable();
                _this.GinecoObstricoForm.get('gestacion_ultima_fecha').enable();
                _this.GinecoObstricoForm.get('gestacion_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('gestacion_cantidad').disable();
                _this.GinecoObstricoForm.get('gestacion_ultima_fecha').disable();
                _this.GinecoObstricoForm.get('gestacion_observacion').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_partos').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('parto_cantidad').enable();
                _this.GinecoObstricoForm.get('parto_ultima_fecha').enable();
                _this.GinecoObstricoForm.get('parto_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('parto_cantidad').disable();
                _this.GinecoObstricoForm.get('parto_ultima_fecha').disable();
                _this.GinecoObstricoForm.get('parto_observacion').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_abortos').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('aboto_cantidad').enable();
                _this.GinecoObstricoForm.get('aborto_ultima_fecha').enable();
                _this.GinecoObstricoForm.get('aborto_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('aboto_cantidad').disable();
                _this.GinecoObstricoForm.get('aborto_ultima_fecha').disable();
                _this.GinecoObstricoForm.get('aborto_observacion').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_cesareas').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('cesarea_cantidad').enable();
                _this.GinecoObstricoForm.get('cesarea_ultima_fecha').enable();
                _this.GinecoObstricoForm.get('cesarea_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('cesarea_cantidad').disable();
                _this.GinecoObstricoForm.get('cesarea_ultima_fecha').disable();
                _this.GinecoObstricoForm.get('cesarea_observacion').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_papanicolau').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('papanicolau_fecha').enable();
                _this.GinecoObstricoForm.get('papanicolau_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('papanicolau_fecha').enable();
                _this.GinecoObstricoForm.get('papanicolau_observacion').enable();
            }
        });
        this.GinecoObstricoForm.get('pac_tamis_mama').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get('tamis_fecha').enable();
                _this.GinecoObstricoForm.get('tamis_observacion').enable();
            }
            else {
                _this.GinecoObstricoForm.get('tamis_fecha').enable();
                _this.GinecoObstricoForm.get('tamis_observacion').enable();
            }
        });
    };
    HistoriaClinicaComponent.prototype.submit = function () {
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
            _this.postNoPatologico(data.idHistoriaClinica);
            _this.postPatologico(data.idHistoriaClinica);
            _this.postAndrogenicos(data.idHistoriaClinica);
            if (_this.pac_sexo == 'M') {
                _this.postAntecedenteProstatico(data.idHistoriaClinica);
            }
            else {
                _this.postAntecedenteGinecobstetrico(data.idHistoriaClinica);
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
            _this.postHeredoFamiliares(data.id);
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
    HistoriaClinicaComponent.prototype.postAndrogenicos = function (idHistoriaClinica) {
        var androgenico = {};
        androgenico['androgenico_vida_sexual_activa'] = this.GinecoObstricoForm.value.androgenico_vida_sexual_activa;
        androgenico['androgenico_inicio_vida_sexual'] = this.GinecoObstricoForm.value.androgenico_inicio_vida_sexual;
        androgenico['androgenico_no_comp_sexuales'] = this.GinecoObstricoForm.value.androgenico_no_comp_sexuales;
        androgenico['androgenico_metodo_anticonceptivo'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo;
        androgenico['androgenico_tipo_relaciones'] = this.GinecoObstricoForm.value.androgenico_tipo_relaciones;
        androgenico['androgenico_ets'] = this.GinecoObstricoForm.value.androgenico_ets;
        androgenico['androgenico_metodo_anticonceptivo_hormonal'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo_hormonal;
        androgenico['androgenico_metodo_anticonceptivo_hormonal'] = this.GinecoObstricoForm.value.androgenico_metodo_anticonceptivo_hormonal;
        androgenico['idHistoriaClinica'] = idHistoriaClinica;
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
    HistoriaClinicaComponent.prototype.postAntecedenteGinecobstetrico = function (idHistoriaClinica) {
        var _this = this;
        var antecedente = {};
        antecedente['idHistoriaClinica'] = idHistoriaClinica;
        antecedente['menarquia'] = this.GinecoObstricoForm.value.pac_menarquia;
        antecedente['papanicolau'] = this.GinecoObstricoForm.value.pac_papanicolau;
        antecedente['tamisDeMama'] = this.GinecoObstricoForm.value.pac_tamis_mama;
        antecedente['aborto'] = this.GinecoObstricoForm.value.pac_abortos;
        antecedente['parto'] = this.GinecoObstricoForm.value.pac_partos;
        antecedente['cesarea'] = this.GinecoObstricoForm.value.pac_cesareas;
        antecedente['gestacion'] = this.GinecoObstricoForm.value.pac_gestaciones;
        this.HistoriaClinicaAPIService.postAntecedenteGinecobstetrico(antecedente).subscribe(function (antecedente) {
            console.log('antecedente', antecedente);
            _this.postGinecoObstetricos(antecedente.id, antecedente);
        });
    };
    HistoriaClinicaComponent.prototype.postGinecoObstetricos = function (idAntecedenteGO, data) {
        if (data['menarquia'] == 'Si') {
            var antecedente = {};
            antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
            antecedente['menstruacion_frecuencia'] = this.GinecoObstricoForm.value.menstruacion_frecuencia;
            antecedente['menstruacion_cantidad'] = this.GinecoObstricoForm.value.menstruacion_cantidad;
            antecedente['menstruacion_duracion'] = this.GinecoObstricoForm.value.menstruacion_duracion;
            antecedente['menstruacion_presencia_De_Dolor'] = this.GinecoObstricoForm.value.menstruacion_presencia_De_Dolor;
            antecedente['menstruacion_fecha_Ultima'] = this.GinecoObstricoForm.value.menstruacion_fecha_Ultima;
            antecedente['menstruacion_otras_secreciones'] = this.GinecoObstricoForm.value.menstruacion_otras_secreciones;
            this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoMenstruacion(antecedente).subscribe(function (antecedente) {
                console.log('antecedente', antecedente);
            });
        }
        if (data['gestacion'] == 'Si') {
            var antecedente = {};
            antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
            antecedente['gestacion_cantidad'] = this.GinecoObstricoForm.value.gestacion_cantidad;
            antecedente['gestacion_ultima_fecha'] = this.GinecoObstricoForm.value.gestacion_ultima_fecha;
            antecedente['gestacion_observacion'] = this.GinecoObstricoForm.value.gestacion_observacion;
            this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoGestacion(antecedente).subscribe(function (antecedente) {
                console.log('antecedente', antecedente);
            });
        }
        if (data['parto'] == 'Si') {
            var antecedente = {};
            antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
            antecedente['parto_cantidad'] = this.GinecoObstricoForm.value.parto_cantidad;
            antecedente['parto_ultima_fecha'] = this.GinecoObstricoForm.value.parto_ultima_fecha;
            antecedente['parto_observacion'] = this.GinecoObstricoForm.value.parto_observacion;
            this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoParto(antecedente).subscribe(function (antecedente) {
                console.log('antecedente', antecedente);
            });
        }
        if (data['aborto'] == 'Si') {
            var antecedente = {};
            antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
            antecedente['aboto_cantidad'] = this.GinecoObstricoForm.value.aboto_cantidad;
            antecedente['aborto_ultima_fecha'] = this.GinecoObstricoForm.value.aborto_ultima_fecha;
            antecedente['aborto_observacion'] = this.GinecoObstricoForm.value.aborto_observacion;
            this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoAborto(antecedente).subscribe(function (antecedente) {
                console.log('antecedente', antecedente);
            });
        }
        if (data['cesarea'] == 'Si') {
            var antecedente = {};
            antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
            antecedente['cesarea_cantidad'] = this.GinecoObstricoForm.value.cesarea_cantidad;
            antecedente['cesarea_ultima_fecha'] = this.GinecoObstricoForm.value.cesarea_ultima_fecha;
            antecedente['cesarea_observacion'] = this.GinecoObstricoForm.value.cesarea_observacion;
            this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoCesarea(antecedente).subscribe(function (antecedente) {
                console.log('antecedente', antecedente);
            });
        }
        if (data['tamisDeMama'] == 'Si') {
            var antecedente = {};
            antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
            antecedente['tamis_fecha'] = this.GinecoObstricoForm.value.tamis_fecha;
            antecedente['tamis_observacion'] = this.GinecoObstricoForm.value.tamis_observacion;
            this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoTamisDeMama(antecedente).subscribe(function (antecedente) {
                console.log('antecedente', antecedente);
            });
        }
        if (data['papanicolau'] == 'Si') {
            var antecedente = {};
            antecedente['idAntecedenteGinecobstetrico'] = idAntecedenteGO;
            antecedente['papanicolau_fecha'] = this.GinecoObstricoForm.value.papanicolau_fecha;
            antecedente['papanicolau_observacion'] = this.GinecoObstricoForm.value.papanicolau_observacion;
            this.HistoriaClinicaAPIService.postAntecedenteGinecobstetricoPapanicolau(antecedente).subscribe(function (antecedente) {
                console.log('antecedente', antecedente);
            });
        }
    };
    HistoriaClinicaComponent.prototype.postHeredoFamiliares = function (idAntecedentePatologico) {
        var _this = this;
        var padre = this.heredoFamForm.value.padre.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; });
        console.log('padre', padre);
        for (var i = 0; i < padre.length; i++) {
            var padecimiento = {};
            padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
            padecimiento['padecimiento_hf_parentesco'] = 'Padre';
            padecimiento['padecimiento'] = padre[i];
            this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(function (padecimiento) {
                console.log('padecimiento', padecimiento);
            });
        }
        var madre = this.heredoFamForm.value.madre.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; });
        console.log('madre', madre);
        for (var i = 0; i < madre.length; i++) {
            var padecimiento = {};
            padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
            padecimiento['padecimiento_hf_parentesco'] = 'Madre';
            padecimiento['padecimiento'] = madre[i];
            this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(function (padecimiento) {
                console.log('padecimiento', padecimiento);
            });
        }
        var abuelosPaternos = this.heredoFamForm.value.abuelosPaternos.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; });
        console.log('abuelosPaternos', abuelosPaternos);
        for (var i = 0; i < abuelosPaternos.length; i++) {
            var padecimiento = {};
            padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
            padecimiento['padecimiento_hf_parentesco'] = 'Abuelos Paternos';
            padecimiento['padecimiento'] = abuelosPaternos[i];
            this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(function (padecimiento) {
                console.log('padecimiento', padecimiento);
            });
        }
        var abuelosMaternos = this.heredoFamForm.value.abuelosMaternos.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; });
        console.log('abuelosMaternos', abuelosMaternos);
        for (var i = 0; i < abuelosMaternos.length; i++) {
            var padecimiento = {};
            padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
            padecimiento['padecimiento_hf_parentesco'] = 'Abuelos Maternos';
            padecimiento['padecimiento'] = abuelosMaternos[i];
            this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(function (padecimiento) {
                console.log('padecimiento', padecimiento);
            });
        }
        var hermanos = this.heredoFamForm.value.hermanos.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; });
        console.log('abuelosMaternos', hermanos);
        for (var i = 0; i < hermanos.length; i++) {
            var padecimiento = {};
            padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
            padecimiento['padecimiento_hf_parentesco'] = 'Hermanos';
            padecimiento['padecimiento'] = hermanos[i];
            this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(function (padecimiento) {
                console.log('padecimiento', padecimiento);
            });
        }
        var otros = this.heredoFamForm.value.otros.map(function (checked, index) { return checked ? _this.enfermedades[index].id : null; }).filter(function (value) { return value !== null; });
        console.log('otros', otros);
        for (var i = 0; i < otros.length; i++) {
            var padecimiento = {};
            padecimiento['idAntecedentePatologico'] = idAntecedentePatologico;
            padecimiento['padecimiento_hf_parentesco'] = 'Otros';
            padecimiento['padecimiento'] = otros[i];
            this.HistoriaClinicaAPIService.postPadecimientoHeredoFamiliar(padecimiento).subscribe(function (padecimiento) {
                console.log('padecimiento', padecimiento);
            });
        }
    };
    //#region LoadData
    HistoriaClinicaComponent.prototype.getData = function () {
        var _this = this;
        this.HistoriaClinicaAPIService.getHistoriaClinica(this.idPaciente).subscribe(function (data) {
            _this.HistoriaClinicaAPIService.getHistoriaAntecedentePatologico(data[0].idHistoriaClinica).subscribe(function (patologico) {
                console.log('patologico', patologico);
                _this.getPatologicos(patologico[0].idAntecedentePatologico);
                _this.HospitalizacionesForm = _this.fb.group({
                    hospitalizaciones: patologico[0].antecedente_patologico_hospitalizacion
                });
            });
            _this.HistoriaClinicaAPIService.getNoPatologico(data[0].idHistoriaClinica).subscribe(function (noPatologico) {
                console.log('noPatologico', noPatologico);
                _this.NoPatologicosForm = _this.fb.group({
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
                    Actividades_Fisicas: _this.fb.array([])
                });
            });
        });
        console.log('data', this.infoHistoriaClinica);
    };
    HistoriaClinicaComponent.prototype.getPatologicos = function (idAntecedentePatologico) {
        var _this = this;
        this.HistoriaClinicaAPIService.getPadecimientos(idAntecedentePatologico).subscribe(function (padecimientos) {
            for (var i = 0; i < padecimientos.length; i++) {
                _this.infoHistoriaClinica[2] = padecimientos[i];
            }
        });
        this.HistoriaClinicaAPIService.getPadecimientos_HF(idAntecedentePatologico).subscribe(function (padecimientos) {
            for (var i = 0; i < padecimientos.length; i++) {
                _this.infoHistoriaClinica[3] = padecimientos[i];
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

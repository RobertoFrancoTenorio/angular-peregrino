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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ModalInfoPacComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var operators_1 = require("rxjs/operators");
var ModalInfoPacComponent = /** @class */ (function () {
    function ModalInfoPacComponent(modalRef, fb, PacienteService, router, citaServ) {
        this.modalRef = modalRef;
        this.fb = fb;
        this.PacienteService = PacienteService;
        this.router = router;
        this.citaServ = citaServ;
        this.isLinear = true;
        this.currentPaciente = null;
        this.detallesBand = true;
        this.antecedentesBand = false;
        this.citasBand = false;
        this.verHistoria = false;
        this.id = null;
        this.ActividadesFisicasForm = this.fb.group({
            pac_actividad_fisica: ['', forms_1.Validators.required],
            pac_frecuencia_act_fisica: ['', forms_1.Validators.required]
        });
        this.MedicamentosForm = this.fb.group({
            pac_medicamento: ['', forms_1.Validators.required],
            pac_frecuencia_consumo: ['', forms_1.Validators.required],
            pac_inicio_consumo: ['', forms_1.Validators.required]
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
        this.constructorForms();
    }
    ModalInfoPacComponent.prototype.constructorForms = function () {
        this.heredoFamForm = this.fb.group({
            padre: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            madre: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            abuelosPaternos: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            abuelosMaternos: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            hermanos: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); })),
            otros: new forms_1.FormArray(this.enfermedades.map(function (control) { return new forms_1.FormControl(false); }))
        });
        this.PatologiasForm = this.fb.group({
            patologias: new forms_1.FormArray(this.patologicas.map(function (control) { return new forms_1.FormControl((false)); })),
            Medicamento: this.fb.array([])
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
            quirurgica_fecha: ['', forms_1.Validators.required],
            quirurgica_causa: ['', forms_1.Validators.required],
            quirurgica_secuela: ['', forms_1.Validators.required]
        });
        this.TraumaticosForm = this.fb.group({
            traumaticos: ['', forms_1.Validators.required],
            fecha_traumaticos: ['', forms_1.Validators.required],
            tipos_traumaticos: ['', forms_1.Validators.required],
            causas_traumaticos: ['', forms_1.Validators.required],
            secuelas_traumaticos: ['', forms_1.Validators.required]
        });
        this.TransfusionesForm = this.fb.group({
            transfusiones: ['', forms_1.Validators.required],
            transfusiones_fecha: ['', forms_1.Validators.required],
            transfusiones_causas: ['', forms_1.Validators.required]
        });
        this.PsicoactivasForm = this.fb.group({
            alcoholismo: ['', forms_1.Validators.required],
            alcoholismo_frecuencia: ['', forms_1.Validators.required],
            alcoholismo_cantidad: ['', forms_1.Validators.required],
            tabaquismo: ['', forms_1.Validators.required],
            tabaquismo_frecuencia: ['', forms_1.Validators.required],
            tabaquismo_cantidad: ['', forms_1.Validators.required],
            otras: ['', forms_1.Validators.required],
            otras_tipo: ['', forms_1.Validators.required],
            otras_ultimo_consumo: ['', forms_1.Validators.required],
            otras_frecuencia: ['', forms_1.Validators.required]
        });
        this.GinecoObstricoForm = this.fb.group({
            pac_menarquia: ['', forms_1.Validators.required],
            pac_carac_mens: ['', forms_1.Validators.required],
            pac_dias_mens: ['', forms_1.Validators.required],
            pac_cant_mens: ['', forms_1.Validators.required],
            pac_frec_mens: ['', forms_1.Validators.required],
            pac_precencia_dolor_mens: ['', forms_1.Validators.required],
            pac_otras_sec_mens: ['', forms_1.Validators.required],
            pac_vida_sexual_activa: ['', forms_1.Validators.required],
            pac_inicio_vida_sexual: ['', forms_1.Validators.required],
            pac_no_comp_sexuales: ['', forms_1.Validators.required],
            pac_metodo_anticonceptivo: ['', forms_1.Validators.required],
            pac_tipo_relaciones: ['', forms_1.Validators.required],
            pac_ets: ['', forms_1.Validators.required],
            pac_metodo_anticonceptivo_hormonal: ['', forms_1.Validators.required],
            pac_metodo_anticonceptivo_hormonal_diu: ['', forms_1.Validators.required],
            pac_exam_prostata: ['', forms_1.Validators.required],
            pac_exam_prostata_fecha: ['', forms_1.Validators.required],
            pac_exam_prostata_obs: ['', forms_1.Validators.required],
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
            pac_habitaciones: ['', forms_1.Validators.required],
            pac_habitantes: ['', forms_1.Validators.required],
            mascota: ['', forms_1.Validators.required],
            pac_mascota_tipo: ['', forms_1.Validators.required],
            pac_comidas_al_dia: ['', forms_1.Validators.required],
            pac_consumo_pan: ['', forms_1.Validators.required],
            pac_consumo_refresco: ['', forms_1.Validators.required],
            pac_consumo_sal: ['', forms_1.Validators.required],
            pac_gpos_alimenticios: ['', forms_1.Validators.required],
            pac_alimentos_capeados: ['', forms_1.Validators.required],
            Actividades_Fisicas: this.fb.array([])
        });
    };
    ModalInfoPacComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.currentPaciente['edad'] = this.calcularEdad(this.currentPaciente.pac_f_nacimiento);
                this.bandSexo = this.currentPaciente.pac_Sexo;
                console.log(this.bandSexo);
                console.log('Paciente', this.currentPaciente);
                this.pac_sexo = this.currentPaciente.pac_sexo;
                this.id = this.currentPaciente.id;
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
                this.citaServ.getCitasPaciente(this.currentPaciente.id, 'asignada').pipe(operators_1.take(1)).subscribe(function (dataCitasAsig) {
                    _this.dataCitasAll = __spreadArrays(_this.dataCitasAll, dataCitasAsig);
                });
                this.citaServ.getCitasPaciente(this.currentPaciente.id, 'aceptada').pipe(operators_1.take(1)).subscribe(function (dataCitasAsig) {
                    _this.dataCitasAll = __spreadArrays(_this.dataCitasAll, dataCitasAsig);
                });
                this.citaServ.getCitasPaciente(this.currentPaciente.id, 'rechazada').pipe(operators_1.take(1)).subscribe(function (dataCitasAsig) {
                    _this.dataCitasAll = __spreadArrays(_this.dataCitasAll, dataCitasAsig);
                });
                console.log(this.dataCitasAll);
                this.onChanges();
                return [2 /*return*/];
            });
        });
    };
    ModalInfoPacComponent.prototype.onSubmit = function () {
        return false;
    };
    ModalInfoPacComponent.prototype.onChanges = function () {
        var _this = this;
        this.NoPatologicosForm.get("mascota").valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.NoPatologicosForm.get("pac_mascota_tipo").enable();
            }
            else {
                _this.NoPatologicosForm.get("pac_mascota_tipo").disable();
            }
        });
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
                _this.QuirurgicasForm.get("quirurgica_fecha").enable();
                _this.QuirurgicasForm.get("quirurgica_causa").enable();
                _this.QuirurgicasForm.get("quirurgica_secuela").enable();
            }
            else {
                _this.QuirurgicasForm.get("quirurgica_fecha").disable();
                _this.QuirurgicasForm.get("quirurgica_causa").disable();
                _this.QuirurgicasForm.get("quirurgica_secuela").disable();
            }
        });
        this.TraumaticosForm.get('traumaticos').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.TraumaticosForm.get("fecha_traumaticos").enable();
                _this.TraumaticosForm.get("tipos_traumaticos").enable();
                _this.TraumaticosForm.get("causas_traumaticos").enable();
                _this.TraumaticosForm.get("secuelas_traumaticos").enable();
            }
            else {
                _this.TraumaticosForm.get("fecha_traumaticos").disable();
                _this.TraumaticosForm.get("tipos_traumaticos").disable();
                _this.TraumaticosForm.get("causas_traumaticos").disable();
                _this.TraumaticosForm.get("secuelas_traumaticos").disable();
            }
        });
        this.TransfusionesForm.get("transfusiones").valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.TransfusionesForm.get('transfusiones_fecha').enable();
                _this.TransfusionesForm.get('transfusiones_causas').enable();
            }
            else {
                _this.TransfusionesForm.get('transfusiones_fecha').disable();
                _this.TransfusionesForm.get('transfusiones_causas').disable();
            }
        });
        this.PsicoactivasForm.get('alcoholismo').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.PsicoactivasForm.get("alcoholismo_frecuencia").enable();
                _this.PsicoactivasForm.get("alcoholismo_cantidad").enable();
            }
            else {
                _this.PsicoactivasForm.get("alcoholismo_frecuencia").disable();
                _this.PsicoactivasForm.get("alcoholismo_cantidad").disable();
            }
        });
        this.PsicoactivasForm.get('tabaquismo').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.PsicoactivasForm.get("tabaquismo_frecuencia").enable();
                _this.PsicoactivasForm.get("tabaquismo_cantidad").enable();
            }
            else {
                _this.PsicoactivasForm.get("tabaquismo_frecuencia").disable();
                _this.PsicoactivasForm.get("tabaquismo_cantidad").disable();
            }
        });
        this.PsicoactivasForm.get('otras').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.PsicoactivasForm.get("otras_tipo").enable();
                _this.PsicoactivasForm.get("otras_ultimo_consumo").enable();
                _this.PsicoactivasForm.get("otras_frecuencia").enable();
            }
            else {
                _this.PsicoactivasForm.get("otras_tipo").disable();
                _this.PsicoactivasForm.get("otras_ultimo_consumo").disable();
                _this.PsicoactivasForm.get("otras_frecuencia").disable();
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
            this.GinecoObstricoForm.get("pac_exam_prostata").disable();
            this.GinecoObstricoForm.get("pac_exam_prostata_fecha").disable();
            this.GinecoObstricoForm.get("pac_exam_prostata_obs").disable();
        }
        this.GinecoObstricoForm.get('pac_exam_prostata').valueChanges.subscribe(function (data) {
            if (data == "Si") {
                _this.GinecoObstricoForm.get("pac_exam_prostata_fecha").enable();
                _this.GinecoObstricoForm.get("pac_exam_prostata_obs").enable();
            }
            else {
                _this.GinecoObstricoForm.get("pac_exam_prostata_fecha").disable();
                _this.GinecoObstricoForm.get("pac_exam_prostata_obs").disable();
            }
        });
        this.GinecoObstricoForm.get('pac_metodo_anticonceptivo').valueChanges.subscribe(function (data) {
            if (data == 'Hormonal') {
                _this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal').enable();
            }
            else {
                _this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal').disable();
            }
        });
        this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal').valueChanges.subscribe(function (data) {
            if (data == 'DIU') {
                _this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal_diu').enable();
            }
            else {
                _this.GinecoObstricoForm.get('pac_metodo_anticonceptivo_hormonal_diu').disable();
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
    ModalInfoPacComponent.prototype.submit = function () {
        // Filter out the unselected ids
        this.guardaPatolgiasFam();
    };
    ModalInfoPacComponent.prototype.guardaPatolgiasFam = function () {
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
                GinecoObstrico: this.GinecoObstricoForm.value
            }
        };
        console.log(model);
        var post = model;
        post['id'] = this.currentPaciente.id;
        post['pac_historia_clinica'] = true;
        this.PacienteService.updatePaciente(post);
        sweetalert2_1["default"].fire({
            title: 'Historia Clínica Completa',
            text: 'Se ha completado correctamente los antecedentes.',
            icon: 'success',
            confirmButtonText: 'OK'
        })
            /*Una vez ejecutado el Sweet alert limpia el formulario
            y redirige al componente de doctores*/
            .then(function () {
            _this.heredoFamForm.reset();
            _this.AlergiasForm.reset();
            _this.GinecoObstricoForm.reset();
            _this.PatologiasForm.reset();
            _this.QuirurgicasForm.reset();
            _this.HospitalizacionesForm.reset();
            _this.NoPatologicosForm.reset();
            _this.TraumaticosForm.reset();
            _this.TransfusionesForm.reset();
            _this.modalRef.hide();
            _this.router.navigate(['pacientes']);
            return false;
        });
    };
    Object.defineProperty(ModalInfoPacComponent.prototype, "act_fisicas", {
        get: function () {
            return this.NoPatologicosForm.controls["Actividades_Fisicas"];
        },
        enumerable: false,
        configurable: true
    });
    ModalInfoPacComponent.prototype.addActividades = function () {
        var actividad = this.fb.group({
            pac_actividad_fisica: [''],
            pac_actividad_frec: ['']
        });
        this.act_fisicas.push(actividad);
    };
    ModalInfoPacComponent.prototype.deleteActividad = function (actId) {
        this.act_fisicas.removeAt(actId);
    };
    Object.defineProperty(ModalInfoPacComponent.prototype, "list_medicamentos", {
        get: function () {
            return this.PatologiasForm.controls["Medicamento"];
        },
        enumerable: false,
        configurable: true
    });
    ModalInfoPacComponent.prototype.addMedicamento = function () {
        var med = this.fb.group({
            pac_medicamento: ['', [forms_1.Validators.required]],
            pac_frecuencia_consumo: ['', [forms_1.Validators.required]],
            pac_inicio_consumo: ['', [forms_1.Validators.required]]
        });
        this.list_medicamentos.push(med);
    };
    ModalInfoPacComponent.prototype.deleteMedicamento = function (medicamentoId) {
        return this.list_medicamentos.removeAt(medicamentoId);
    };
    ModalInfoPacComponent.prototype.calcularEdad = function (fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad;
    };
    ModalInfoPacComponent.prototype.activarAntecedentes = function () {
        this.citasBand = false;
        this.detallesBand = false;
        this.antecedentesBand = true;
    };
    ModalInfoPacComponent.prototype.activarDetalles = function () {
        this.citasBand = false;
        this.detallesBand = true;
        this.antecedentesBand = false;
    };
    ModalInfoPacComponent.prototype.activarCita = function () {
        this.citasBand = true;
        this.detallesBand = false;
        this.antecedentesBand = false;
    };
    ModalInfoPacComponent.prototype.activarVerHistoria = function () {
        this.citasBand = false;
        this.detallesBand = false;
        this.verHistoria = true;
    };
    ModalInfoPacComponent.prototype.cerrarModal = function () {
        this.modalRef.hide();
    };
    ModalInfoPacComponent.prototype.closeModal = function (event) {
        console.log('Event', event);
        if (event) {
            this.modalRef.hide();
        }
    };
    ModalInfoPacComponent.prototype.next = function () {
        this.stepper.next();
    };
    ModalInfoPacComponent.prototype.activarEditar = function () {
        this.citasBand = false;
        this.detallesBand = false;
        this.verHistoria = false;
        this.bandEditar = true;
    };
    ModalInfoPacComponent.prototype.citaSave = function (event) {
        if (event.citaSave) {
            console.log('Cita almacenada');
            this.activarDetalles();
        }
        else {
            console.log('Cancel Cita');
            this.activarDetalles();
        }
    };
    __decorate([
        core_1.Input()
    ], ModalInfoPacComponent.prototype, "currentPaciente");
    __decorate([
        core_1.Input()
    ], ModalInfoPacComponent.prototype, "detallesBand");
    __decorate([
        core_1.Input()
    ], ModalInfoPacComponent.prototype, "antecedentesBand");
    __decorate([
        core_1.Input()
    ], ModalInfoPacComponent.prototype, "citasBand");
    __decorate([
        core_1.Input()
    ], ModalInfoPacComponent.prototype, "verHistoria");
    ModalInfoPacComponent = __decorate([
        core_1.Component({
            selector: 'app-modal-info-pac',
            templateUrl: './modal-info-pac.component.html',
            styleUrls: ['./modal-info-pac.component.scss']
        })
    ], ModalInfoPacComponent);
    return ModalInfoPacComponent;
}());
exports.ModalInfoPacComponent = ModalInfoPacComponent;

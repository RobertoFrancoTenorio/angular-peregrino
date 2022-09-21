"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HistoriaClinicaAPIService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var HistoriaClinicaAPIService = /** @class */ (function () {
    function HistoriaClinicaAPIService(http) {
        this.http = http;
        this.url = 'http://127.0.0.1:8000';
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-type': 'application/json'
            })
        };
    }
    HistoriaClinicaAPIService.prototype.postHistoriaClinica = function (POST) {
        return this.http.post(this.url + '/api/postHistoriaClinica', POST, this.httpOptions);
    };
    //#region Metodos No Patologico
    HistoriaClinicaAPIService.prototype.postNoPatologico = function (POST) {
        return this.http.post(this.url + '/api/postNoPatologico', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postActividadFisica = function (POST) {
        return this.http.post(this.url + '/api/postActividadFisica', POST, this.httpOptions);
    };
    //#endregion
    //#region Patologicos
    HistoriaClinicaAPIService.prototype.postPatologico = function (POST) {
        return this.http.post(this.url + '/api/postPatologico', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postHospitalizacion = function (POST) {
        return this.http.post(this.url + '/api/postHospitalizacion', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAlergia = function (POST) {
        return this.http.post(this.url + '/api/postAlergia', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postQuirurgica = function (POST) {
        return this.http.post(this.url + '/api/postQuirurgica', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postTraumatismo = function (POST) {
        return this.http.post(this.url + '/api/postTraumatismo', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postTransfusion = function (POST) {
        return this.http.post(this.url + '/api/postTransfusion', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postSustanciasPsicoactivas = function (POST) {
        return this.http.post(this.url + '/api/postSustanciaPsicoactiva', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postPadecimiento = function (POST) {
        return this.http.post(this.url + '/api/postPadecimiento', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postPadecimientoHeredoFamiliar = function (POST) {
        return this.http.post(this.url + '/api/postPadecimientoHeredoFamiliar', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postDetalleMedicamento = function (POST) {
        return this.http.post(this.url + '/api/postDetalleMedicamento', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postMedicamento = function (POST) {
        return this.http.post(this.url + '/api/postMedicamento', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAndrogenicos = function (POST) {
        return this.http.post(this.url + '/api/postAndrogenicos', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAntecedenteProstatico = function (POST) {
        return this.http.post(this.url + '/api/postAntecedenteProstatico', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postExamenProstatico = function (POST) {
        return this.http.post(this.url + '/api/postExamenProstata', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAntecedenteGinecobstetrico = function (POST) {
        return this.http.post(this.url + '/api/postAntecedenteGinecobstetrico', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAntecedenteGinecobstetricoMenstruacion = function (POST) {
        return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoMenstruacion', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAntecedenteGinecobstetricoGestacion = function (POST) {
        return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoGestacion', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAntecedenteGinecobstetricoParto = function (POST) {
        return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoParto', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAntecedenteGinecobstetricoAborto = function (POST) {
        return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoAborto', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAntecedenteGinecobstetricoCesarea = function (POST) {
        return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoCesarea', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAntecedenteGinecobstetricoTamisDeMama = function (POST) {
        return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoTamisDeMama', POST, this.httpOptions);
    };
    HistoriaClinicaAPIService.prototype.postAntecedenteGinecobstetricoPapanicolau = function (POST) {
        return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoPapanicolau', POST, this.httpOptions);
    };
    //#endregion
    //#region Gets
    HistoriaClinicaAPIService.prototype.getHistoriaClinica = function (id) {
        return this.http.get(this.url + '/api/getHistoriaClinica/' + id);
    };
    HistoriaClinicaAPIService.prototype.getHistoriaAntecedentePatologico = function (id) {
        return this.http.get(this.url + '/api/getHistoriaClinica_Antecedente_Patologico/' + id);
    };
    HistoriaClinicaAPIService.prototype.getPadecimientos = function (id) {
        return this.http.get(this.url + '/api/getPadecimientos/' + id);
    };
    HistoriaClinicaAPIService.prototype.getPadecimientos_HF = function (id) {
        return this.http.get(this.url + '/api/getPadecimientos_HF/' + id);
    };
    HistoriaClinicaAPIService.prototype.getNoPatologico = function (id) {
        return this.http.get(this.url + '/api/getAntecedenteNoPatologico/' + id);
    };
    HistoriaClinicaAPIService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], HistoriaClinicaAPIService);
    return HistoriaClinicaAPIService;
}());
exports.HistoriaClinicaAPIService = HistoriaClinicaAPIService;

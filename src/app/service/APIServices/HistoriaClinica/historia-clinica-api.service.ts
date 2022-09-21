import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaAPIService {
  url = 'http://127.0.0.1:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  postHistoriaClinica(POST): Observable<any>{
    return this.http.post<any>(this.url + '/api/postHistoriaClinica', POST, this.httpOptions)
  }

  //#region Metodos No Patologico
  postNoPatologico(POST): Observable<any>{
    return this.http.post(this.url + '/api/postNoPatologico', POST, this.httpOptions);
  }

  postActividadFisica(POST): Observable<any>{
    return this.http.post(this.url + '/api/postActividadFisica', POST, this.httpOptions);
  }
  //#endregion


  //#region Patologicos
  postPatologico(POST): Observable<any>{
    return this.http.post(this.url + '/api/postPatologico', POST, this.httpOptions);
  }

  postHospitalizacion(POST): Observable<any>{
    return this.http.post(this.url + '/api/postHospitalizacion', POST, this.httpOptions);
  }

  postAlergia(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAlergia', POST, this.httpOptions);
  }

  postQuirurgica(POST): Observable<any>{
    return this.http.post(this.url + '/api/postQuirurgica', POST, this.httpOptions);
  }

  postTraumatismo(POST): Observable<any>{
    return this.http.post(this.url + '/api/postTraumatismo', POST, this.httpOptions);
  }

  postTransfusion(POST): Observable<any>{
    return this.http.post(this.url + '/api/postTransfusion', POST, this.httpOptions);
  }

  postSustanciasPsicoactivas(POST): Observable<any>{
    return this.http.post(this.url + '/api/postSustanciaPsicoactiva', POST, this.httpOptions);
  }

  postPadecimiento(POST): Observable<any>{
    return this.http.post(this.url + '/api/postPadecimiento', POST, this.httpOptions);
  }

  postPadecimientoHeredoFamiliar(POST): Observable<any>{
    return this.http.post(this.url + '/api/postPadecimientoHeredoFamiliar', POST, this.httpOptions);
  }

  postDetalleMedicamento(POST): Observable<any>{
    return this.http.post(this.url + '/api/postDetalleMedicamento', POST, this.httpOptions);
  }

  postMedicamento(POST): Observable<any>{
    return this.http.post(this.url + '/api/postMedicamento', POST, this.httpOptions);
  }

  postAndrogenicos(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAndrogenicos', POST, this.httpOptions);
  }

  postAntecedenteProstatico(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAntecedenteProstatico', POST, this.httpOptions);
  }

  postExamenProstatico(POST): Observable<any>{
    return this.http.post(this.url + '/api/postExamenProstata', POST, this.httpOptions);
  }

  postAntecedenteGinecobstetrico(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAntecedenteGinecobstetrico', POST, this.httpOptions);
  }

  postAntecedenteGinecobstetricoMenstruacion(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoMenstruacion', POST, this.httpOptions);
  }

  postAntecedenteGinecobstetricoGestacion(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoGestacion', POST, this.httpOptions);
  }

  postAntecedenteGinecobstetricoParto(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoParto', POST, this.httpOptions);
  }

  postAntecedenteGinecobstetricoAborto(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoAborto', POST, this.httpOptions);
  }

  postAntecedenteGinecobstetricoCesarea(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoCesarea', POST, this.httpOptions);
  }

  postAntecedenteGinecobstetricoTamisDeMama(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoTamisDeMama', POST, this.httpOptions);
  }

  postAntecedenteGinecobstetricoPapanicolau(POST): Observable<any>{
    return this.http.post(this.url + '/api/postAntecedenteGinecobstetricoPapanicolau', POST, this.httpOptions);
  }

  //#endregion

  //#region Gets
  getHistoriaClinica(id: any): Observable<any>{
    return this.http.get(this.url + '/api/getHistoriaClinica/' + id);
  }

  getHistoriaAntecedentePatologico(id: any): Observable<any>{
    return this.http.get(this.url + '/api/getHistoriaClinica_Antecedente_Patologico/' + id);
  }

  getPadecimientos(id: number): Observable<any> {
    return this.http.get(this.url + '/api/getPadecimientos/' + id);
  }

  getPadecimientos_HF(id: number): Observable<any> {
    return this.http.get(this.url + '/api/getPadecimientos_HF/' + id);
  }

  getNoPatologico(id: number): Observable<any> {
    return this.http.get(this.url + '/api/getAntecedenteNoPatologico/' + id)
  }
  //#endregion

}

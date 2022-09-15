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
  //#endregion

}

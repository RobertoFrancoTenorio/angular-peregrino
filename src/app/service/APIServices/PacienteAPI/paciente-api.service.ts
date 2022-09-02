import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PacienteAPIService {

  url = 'http://127.0.0.1:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getPacientesList(){
    return this.http.get(this.url + '/api/pacientes')
  }

  getPacienteData(id){
    return this.http.get(this.url + '/api/getPacienteData/' + id)
  }

  postPaciente(paciente): Observable<any>{
    return this.http.post<any>(this.url + '/api/guardaPaciente', paciente, this.httpOptions)
  }

  updatePaciente(paciente, id){
    return this.http.put(this.url + '/api/updatePaciente/' +id, paciente, this.httpOptions)
  }

  getAdicionalesList(id){
    return this.http.get(this.url + '/api/getAdicionales/' + id)
  }
}

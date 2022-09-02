import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorAPIService {
  url = 'http://127.0.0.1:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getDoctoresList(){
    return this.http.get(this.url + '/api/doctores')
  }

  postDoctor(doctor): Observable<any>{
    return this.http.post<any>(this.url + '/api/guardaDoctor', doctor, this.httpOptions)
  }

  updateDoctor(id, doctor): Observable<any>{
    return this.http.put<any>(this.url + '/api/updateDoctor/' + id, doctor, this.httpOptions)
  }

  getDoctor(id): Observable<any>{
    return this.http.get(this.url + '/api/getDoctor/'+ id);
  }
}

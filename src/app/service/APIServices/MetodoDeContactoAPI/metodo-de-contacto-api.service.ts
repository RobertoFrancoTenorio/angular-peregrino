import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoDeContactoAPIService {
  url = 'http://127.0.0.1:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  postMetodo(metodo): Observable<any>{
    return this.http.post<any>(this.url + '/api/guardaMetodoDeContacto', metodo, this.httpOptions)
  }

  getMetodos(id){
    return this.http.get<any>(this.url +'/api/getMetodosDeContactoDoctor/' + id, this.httpOptions);
  }

  updateMetodos(id, metodo){
    return this.http.put<any>(this.url +'/api/updateMetodoDeContacto/' + id, metodo, this.httpOptions)
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../service/auth/auth.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public DatePipe: DatePipe
    ) { }

  crearCita(post: any) {
    return new Promise<void>((resolve) => {
      const fecha = new Date()
      post['f_consulta'] = fecha;
      post['fecha_consulta'] = this.DatePipe.transform(fecha, 'yyyy-MM-dd');
      post['id'] = this.afs.createId();
      post['consulta_pac_nombre_completo'] = post['consulta_pac_nombre'] + ' ' + post['consulta_paciente_primer_apellido'] + ' ' + post['consulta_paciente_segundo_apellido']
      console.log("VALOR post");
      console.log(post);
      this.afs.doc('/SegMedico/peregrino/Consultas/' + post['id']).set(post).then(() => {
        resolve();
      })
    })
  }

  getConsultas(id: string) {
    return this.afs.collection('/SegMedico/peregrino/Consultas', ref =>
      ref.where('id_Doctor', '==', id)).valueChanges();
  }
}

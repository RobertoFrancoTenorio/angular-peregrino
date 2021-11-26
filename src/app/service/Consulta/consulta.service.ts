import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(
    private afs: AngularFirestore,
    public DatePipe: DatePipe
    ) { }

  crearCita(post: any) {
    console.log('PostConsulta', post.consulta_cita_idHorario)
    return new Promise<void>((resolve) => {
      const fecha = new Date()
      post['f_consulta'] = fecha;
      post['fecha_consulta'] = this.DatePipe.transform(fecha, 'yyyy-MM-dd');
      post['id'] = this.afs.createId();
      post['consulta_pac_nombre_completo'] = post['consulta_pac_nombre'] + ' ' + post['consulta_paciente_primer_apellido'] + ' ' + post['consulta_paciente_segundo_apellido']
      console.log('POST', post)
      this.afs.doc('/SegMedico/peregrino/Consultas/' + post['id']).set(post).then(() => {
        resolve();
      })
    })
  }

  getConsultas(id: string) {
    return this.afs.collection('/SegMedico/peregrino/Consultas/', ref =>
      ref.where('id_Doctor', '==', id).orderBy('f_consulta', 'asc')).valueChanges();
  }

  getConsultasPac(id: string) {
    return this.afs.collection('/SegMedico/peregrino/Consultas', ref =>
      ref
        .where('consulta_id_paciente', '==', id)
    ).valueChanges();
  }
}

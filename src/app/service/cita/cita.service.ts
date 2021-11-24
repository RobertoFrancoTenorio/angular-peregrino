import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
    public DatePipe: DatePipe
  ) { }

  crearCita(post: any) {
    return new Promise<void>((resolve) => {

      /*Almacena los datos de activo, fecha de registro, el usuario que lo registró
      el id y un idNumerico*/
      post['f_registro'] = new Date();
      post['user_reg'] = this.auth.currentUserId;
      /*Este id se genera automaticamente mediante un metodo de afs */
      post['id'] = this.afs.createId();

      console.log("VALOR post");
      console.log(post);
      /*En esta parte se envia el id del doctor que se acaba de crear y todos los datos capturados
      una vez agregados a la colección setea el valor del contador con el idNumerico del ultimo doctor que se agregó,
      este id siempre va incrementando*/
      this.afs.doc('/SegMedico/peregrino/citas/' + post['id']).set(post).then(() => {
        resolve();
      })
    })
  }

  getCitasDiaDoctor(idDoc: string, date_ini: any, date_fin: any) {
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref
        .where('idDoctor', '==', idDoc)
        .orderBy('f_cita', 'asc')
        .startAt(date_ini)
        .endAt(date_fin)
    ).valueChanges();
  }

  getCitasPaciente(idPac: string, estatus: string) {
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref
        .where('idPaciente', '==', idPac)
        .where('estatus', '==', estatus)
        .orderBy('f_cita', 'asc')
    ).valueChanges();
  }

  getCitasEstatus(estatus: string) {
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref
        .where('estatus', '==', estatus)
        .orderBy('f_cita', 'asc')
    ).valueChanges();
  }

  updateCita(post: any) {
    console.log('POST', post)
    return new Promise<void>((resolve) => {
      this.afs.doc('SegMedico/peregrino/citas/' + post['id']).update(post).then(() => {
        resolve()
      })
    })
  }

  getCitasAtendidas(id: string){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref.where('detDoctor.id', '==', id,).where('estatus', '==', 'terminada')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data()
          var fecha = data['f_cita']
          let evento = {};
          evento = {
            title: data['detPaciente'].nombre,
            start: this.DatePipe.transform(fecha.toDate(), 'yyyy-MM-dd' + 'T'),
          }
          return evento
        }))
      )
  }

  getAceptadas(id: string){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
        ref.where('detDoctor.id', '==', id,).where('estatus', '==', 'aceptada')).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data()
            var fecha = data['f_cita']
            let evento = {};
            evento = {
              title: data['detPaciente'].nombre,
              start: this.DatePipe.transform(fecha.toDate(), 'yyyy-MM-dd' + 'T'),
            }
            return evento
          }))
        )
  }

  getCitasAsignadasDoctor(id: string){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
        ref.where('detDoctor.id', '==', id,).where('estatus', '==', 'asignada')).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data()
            var fecha = data['f_cita']
            var horaInicio = data['cita_hora_fin']+'00'
            let evento = {};
            evento = {
              title: data['detPaciente'].nombre,
              start: fecha,
              hora: horaInicio
            }
            return evento
          }))
        )
  }

  getCitasDoctor(id: string){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref.where('detDoctor.id', '==', id)).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          var color = ' '
            var background = ' '
            const data = a.payload.doc.data()
            var start = data['f_cita']
            const ini = this.DatePipe.transform(start.toDate(), 'yyyy-MM-dd').toString()
            const horaInicio = data['cita_hora_ini']+':00'

            var end = data['f_cita']
            const fin = this.DatePipe.transform(end.toDate(), 'yyyy-MM-dd').toString()
            const horaFin = data['cita_hora_fin']+':00'
            let evento = {};
            switch(data['estatus']){
              case 'asignada':{
                color = 'blue'
                background = 'blue'
                break;
              }
              case 'aceptada': {
                color = 'green'
                background = 'green'
                break;
              }
              case 'atendida': {
                color = 'orange'
                background = 'orange'
                break;
              }
            }
            if(data['estatus'] != 'rechazada'){
              if(data['estatus'] != 'reagendar'){
                if(data['estatus'] != 'terminada'){
                  evento = {
                    title: data['detPaciente'].nombre,
                    start: ini+'T'+horaInicio,
                    end: fin+'T'+horaFin,
                    //textColor: background,
                    color: color,
                    estatus: data['estatus'],
                    f_cita: data['f_cita'],
                    extendedProps: {
                      tipoEvento: 'Cita',
                      currentCita: data,
                    }
                  };
                }
              }
            }
            return evento
        }))
      )
  }

  getRechazadas(id: string){
    return this.afs.collection('/SegMedico/peregrino/usuarios',ref=>
    ref.where('detDoctor.id', '==', 'id').where('estatus', '==', 'rechazada')).valueChanges();
  }


}

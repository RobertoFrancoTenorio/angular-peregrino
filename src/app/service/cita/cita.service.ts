import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public DatePipe: DatePipe
  ) { }

  crearCita(post: any) {

    return new Promise<void>((resolve) => {

      /*Almacena los datos de activo, fecha de registro, el usuario que lo registró
      el id y un idNumerico*/
      post['f_registro'] = new Date();
      post['user_reg'] = this.authService.currentUserId;
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

  getCitasAsignadas() {
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref.where('estatus', '==', 'asignada')
        .orderBy('f_registro')).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data()
            var fecha = data['f_cita']
            let evento = {};
            evento = {
              title: data['detPaciente'].nombre,
              start: this.DatePipe.transform(fecha.toDate(), 'yyyy-MM-dd'),
            }
            return evento
          }))
        )
  }

  getCitasPendientes() {
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref.where('estatus', '==', 'pendiente')
        .orderBy('f_registro')).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data()
            var fecha = data['f_cita']
            let evento = {};
            evento = {
              title: data['detPaciente'].nombre,
              start: this.DatePipe.transform(fecha.toDate(), 'yyyy-MM-dd'),
            }
            return evento
          }))
        )
  }

  getCitasTotales(){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref.orderBy('f_registro')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data()
            var start = data['f_cita']
            const ini = this.DatePipe.transform(start.toDate(), 'yyyy-MM-dd').toString()
            const horaInicio = data['cita_hora_ini']+':00'

            var end = data['f_cita']
            const fin = this.DatePipe.transform(end.toDate(), 'yyyy-MM-dd').toString()
            const horaFin = data['cita_hora_fin']+':00'
            let evento = {};
            evento = {
              title: data['detPaciente'].nombre,
              start: ini+'T'+horaInicio,
              end: fin+'T'+horaFin
            };
            return evento
        }))
      )
  }

  getAllCitas(){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data()
        var fecha = data['f_cita']
        let evento = {};
        evento = {
          title: data['detPaciente'].nombre,
          start: this.DatePipe.transform(fecha.toDate(), 'yyyy-MM-dd'),
        }
        return evento
      }))
    )
  }

  getCitasPendientesDoctor(id: string){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
        ref.where('detDoctor.id', '==', id,).where('estatus', '==', 'pendiente')).snapshotChanges().pipe(
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
        ref.where('detDoctor.id', '==', id,)).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data()
            var start = data['f_cita']
            const ini = this.DatePipe.transform(start.toDate(), 'yyyy-MM-dd').toString()
            const horaInicio = data['cita_hora_ini']+':00'

            var end = data['f_cita']
            const fin = this.DatePipe.transform(end.toDate(), 'yyyy-MM-dd').toString()
            const horaFin = data['cita_hora_fin']+':00'
            let evento = {};
            evento = {
              title: data['detPaciente'].nombre,
              start: ini+'T'+horaInicio,
              end: fin+'T'+horaFin
            };
            return evento
          }))
        )
  }

  async getCitasDiaDoctor(id: string) {
    console.log('1-Inicia metodo getcitasdoctor');
    var band;
    let evento = {};
    await new Promise<void>((resolve) => {
      console.log('2-Entra al await')
      console.log('ID', id)
      this.afs.collection('SegMedico').doc('peregrino').collection('citas').snapshotChanges().pipe(
          map(actions => actions.map(a => {
            console.log('3-Hizo la consulta')
            const data = a.payload.doc.data()
            var fecha = data['f_cita']

            evento = {
              title: data['detPaciente'].nombre,
              start: this.DatePipe.transform(fecha.toDate(), 'yyyy-MM-dd'),
            }
            console.log(evento)
            resolve()
          }))
        )

      }).then(() => {

    })

    /* await new Promise<void>((resolve) => {
      this.afs.collection('SegMedico').doc('peregrino').collection('usuarios',
        ref => ref.where('id', '==', id).where('is_Doctor', '==', 'Si')).valueChanges().subscribe(data => {
          console.log('2-resultado consulta', data);
          band = data[0].is_Doctor;
          console.log('3-valor bandera ', band);
          resolve();
        })
    }).then(() => {
      console.log('4-inicia then');
      console.log('5-valor de bandera', band)
      if(band == 'Si'){
        console.log('6-si es doctor');
        return band;
      }else{
        console.log('6-no es doctor');
        return band;
      }
    }) */

    /*console.log('Doctor? (3)', band)
        if(band == 'Si'){
          console.log('Si es un doctor')
          return this.afs.collection('/SegMedico/peregrino/citas', ref =>
          ref.where('detDoctor.id', '==', id,)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data()
              var fecha = data['f_cita']
              let evento = {};
              evento = {
                title: data['detPaciente'].nombre,
                start: this.DatePipe.transform(fecha.toDate(), 'yyyy-MM-dd, h:mm:ss a'),
              }
              return evento
            }))
          )
        }
        if(this.afs.collection('/SegMedico/peregrino/usuarios'+ id, ref =>
        ref.where('is_Doctor', '==', 'No'))){
          console.log('No es un doctor')
          return this.afs.collection('/SegMedico/peregrino/citas', ref =>
          ref.orderBy('f_registro', 'asc')).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data()
              var fecha = data['f_cita']
              let evento = {};
              evento = {
                title: data['detPaciente'].nombre,
                start: this.DatePipe.transform(fecha.toDate(), 'yyyy-MM-dd, h:mm:ss a'),
              }
              return evento
            }))
          );
        } */
  }



}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
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

}

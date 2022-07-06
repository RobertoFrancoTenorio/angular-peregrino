import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { FireSQL } from 'firesql';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
  ) { }

  getPacientes() {
    return this.afs.collection('/SegMedico/peregrino/Pacientes', ref =>
      ref
        .orderBy('idNumerico', 'asc')
        ).valueChanges();
  }

  getPacientesPaginados(inicio?, fin?) {
    /* return this.afs.collection('/SegMedico/peregrino/Pacientes', ref =>
      ref
        .orderBy('idNumerico', 'asc').startAt(inicio).endAt(fin)
        ).valueChanges(); */
        return this.afs.collection('/SegMedico/peregrino/Pacientes', ref =>
      ref
        .orderBy('idNumerico', 'asc').startAt(inicio).endAt(fin)
        ).valueChanges();
  }

  getPacientesPaginados2(inicio?, fin?) {
        return this.afs.collection('/SegMedico/peregrino/Pacientes', ref =>
      ref
        .orderBy('f_registro', 'asc')
        ).valueChanges().pipe(take(1));
  }

  getPacientesWithLimit(){
    return this.afs.collection('/SegMedico/peregrino/Pacientes', ref =>
      ref
        .orderBy('idNumerico', 'asc')
        ).valueChanges().pipe(take(1));
  }

  getPacientesNuevo(inicio?, fin?) {
    return this.afs.collection('/SegMedico/peregrino/Pacientes', ref =>
      ref.orderBy('idNumerico', 'asc')
    ).snapshotChanges();
  }

  getPacientesTipo(tipo) {
    return this.afs.collection('/SegMedico/peregrino/Pacientes', ref =>
      ref
        .orderBy('idNumerico', 'asc').where('pac_tipo', '==', tipo)
        ).valueChanges();
  }

  getPacienteData(id:string) {
    //return this.afs.doc('/SegMedico/peregrino/Pacientes/'+id).valueChanges();
    return this.afs.doc('/SegMedico/peregrino/Pacientes/'+id).valueChanges()
  }

  async creaPaciente(post: any) {
    return await new Promise((resolve) => {
      /*accede a la coleccion */
      this.afs.doc('/SegMedico/peregrino/Pacientes/counter').valueChanges().pipe(take(1)).subscribe(data => {
        //Incrementa el contador
        var idNum = data['counter'] + 1;

        /*Almacena los datos de activo, fecha de registro, el usuario que lo registró
        el id y un idNumerico*/
        post['f_registro'] = new Date();
        post['user_reg'] = this.authService.currentUserId;
        /*Este id se genera automaticamente mediante un metodo de afs */
        post['id'] = this.afs.createId();
        post['idNumerico'] = idNum;
        post['activo']=true;
        post['empresa'] = 'troquelados'

        console.log("vALOR post");
        console.log(post);
        /*En esta parte se envia el id del doctor que se acaba de crear y todos los datos capturados
        una vez agregados a la colección setea el valor del contador con el idNumerico del ultimo doctor que se agregó,
        este id siempre va incrementando*/
        this.afs.doc('/SegMedico/peregrino/Pacientes/' + post['id']).set(post).then(() => {
          this.afs.doc('/SegMedico/peregrino/Pacientes/counter').set({ counter: idNum }).then(() => {
            resolve({
              id: post['id'],
              nombre_completo: post['pac_nombre_completo'],
              parentesco: post['pac_parentesco']
            });
          })
        })
      })
    })
  }

  async updatePaciente(post: any) {
    console.log('POST', post)
    return await new Promise<void>(resolve => {
      this.afs.doc('SegMedico/peregrino/Pacientes/' + post['id']).update(post).then(() => {
        resolve()
      })
    })
  }

  getPacienteInfo(id:string) {
    return this.afs.collection('/SegMedico/peregrino/Pacientes',ref=>
    ref.where('id', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const data = a.payload.doc.data()
        console.log(data)
        let paciente = {}
        paciente = {
          infoPaciente: data
        }
        return paciente;
      }))
    )
  }

  //Es este de aqui
  getPacienteLike(param1){
    console.log('Param', param1)

    //Esta parte tiene toda la ruta, muchas personas la descomponen en collection().doc()...
    //create aqui una pequeña consulta a cualquier tabla de firebase
    return this.afs.collection('/SegMedico/peregrino/Pacientes', ref =>
      ref
        .orderBy('pac_nombre_completo', 'asc').startAt(param1).endAt(param1+'\uf8ff')).valueChanges();
  }


  buscador(apellido, parametro){
    console.log('Param', apellido)
    return this.afs.collection('/SegMedico/peregrino/Pacientes', ref =>
      ref.orderBy(parametro, 'asc').startAt(apellido).endAt(apellido+'\uf8ff')).valueChanges();
  }


  getIguales(nombre){
    return this.afs.collection('/SegMedico/peregrino/Pacientes',ref=>
    ref.where('pac_nombre_completo', '==', nombre)).valueChanges()
  }

}

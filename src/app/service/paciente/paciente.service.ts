import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
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
        .orderBy('idNumerico', 'asc')).valueChanges();
  }

  getPacienteData(id:string) {
    return this.afs.collection('/SegMedico/peregrino/Pacientes/'+id).valueChanges();
  }

  creaPaciente(post: any) {
    return new Promise((resolve) => {
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

  updatePaciente(post: any) {
    return new Promise<void>(resolve => {
      this.afs.doc('SegMedico/peregrino/Pacientes/' + post['id']).update(post).then(() => {
        resolve()
      })
    })
  }
}

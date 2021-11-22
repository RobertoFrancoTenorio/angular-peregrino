import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    private usuarioService: UsuarioService,
  ) { }

  /*Este metodo accede a la colección en con la variable afs y la pasa al
  componente doctores en el async OnInit() */
  getDoctorsList() {
    return this.afs.collection('/SegMedico/peregrino/Doctores', ref =>
      ref
        .orderBy('idNumerico', 'asc')
    ).valueChanges();
  }

  getDoctorsListActive() {
    return this.afs.collection('/SegMedico/peregrino/Doctores', ref =>
      ref
        .where('activo', '==', true)
        .orderBy('idNumerico', 'asc')
    ).valueChanges();
  }

  /*Este metodo recibe el doctor que se pasa en el componente add-doctor */
  crearDoctor(post: any, id?: string) {

    return new Promise<void>((resolve) => {
      /*accede a la coleccion */
      this.afs.doc('/SegMedico/peregrino/Doctores/counter').valueChanges().pipe(take(1)).subscribe(data => {
        //Incrementa el contador
        var idNum = data['counter'] + 1;

        /*Almacena los datos de activo, fecha de registro, el usuario que lo registró
        el id y un idNumerico*/
        post['f_registro'] = new Date();
        if(!id){
          /*Este id se genera automaticamente mediante un metodo de afs */
          post['id'] = this.afs.createId();
        }
        else{
          console.log('id', id)
          post['id'] = id;
        }
        post['user_reg'] = this.authService.currentUserId;
        post['idNumerico'] = idNum;
        /*En esta parte se envia el id del doctor que se acaba de crear y todos los datos capturados
        una vez agregados a la colección setea el valor del contador con el idNumerico del ultimo doctor que se agregó,
        este id siempre va incrementando*/
        this.afs.doc('/SegMedico/peregrino/Doctores/' + post['id']).set(post).then(() => {
          this.afs.doc('/SegMedico/peregrino/Doctores/counter').set({ counter: idNum }).then(() => {
            resolve();
            this.usuarioService.crearDoctorUsuario(post, id);
          })
        })
      })
    })
  }

  updateDoctor(post: any) {
    return new Promise<void>(resolve => {
      this.afs.doc('/SegMedico/peregrino/Doctores/' + post['id']).update(post).then(() => {
        resolve()
      })
    })
  }

  getDoctorName(post: any) {
    return this.afs.collection('/SegMedico/peregrino/Doctores', ref =>
      ref
        .where('id', '==', post)
    ).valueChanges();
  }

}

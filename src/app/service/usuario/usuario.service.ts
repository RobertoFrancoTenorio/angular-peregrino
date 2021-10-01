import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
  ) { }

  crearUsuario(post: any) {
    return new Promise<void>((resolve) => {
      this.afs.doc('/SegMedico/peregrino/usuarios/counter').valueChanges().pipe(take(1)).subscribe(data => {
        //console.log(data)
        var idNum = data['counter'] + 1;

        post['activo'] = true;
        post['f_registro'] = new Date();
        post['user_reg'] = this.auth.currentUserId;

        post['id'] = this.afs.createId();
        post['idNumerico'] = idNum;

        console.log(post);

        this.afs.doc('/SegMedico/peregrino/usuarios/' + post['id']).set(post).then(() => {
          this.afs.doc('/SegMedico/peregrino/usuarios/counter').set({ counter: idNum }).then(()=>{
            resolve();
          })
        })

      })
    })
  }

  updateUser(post:any) {
    return new Promise<void>((resolve) => {
      this.afs.doc('SegMedico/peregrino/usuarios/' + post['id']).update(post).then(() => {
        resolve()
      })
    })
  }

  getUserListAll(){
    return this.afs.collection('/SegMedico/peregrino/usuarios',ref=>
      ref
        .orderBy('idNumerico','asc')
    ).valueChanges();
  }



}

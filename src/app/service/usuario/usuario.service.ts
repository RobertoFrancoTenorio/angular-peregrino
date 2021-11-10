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

  crearUsuario(post: any, id ?: string) {
    return new Promise<void>((resolve) => {
      this.afs.doc('/SegMedico/peregrino/usuarios/counter').valueChanges().pipe(take(1)).subscribe(data => {
        //console.log(data)
        var idNum = data['counter'] + 1;

        post['activo'] = true;
        post['f_registro'] = new Date();
        post['user_reg'] = this.auth.currentUserId;
        post['id'] = this.afs.createId();
        post['idNumerico'] = idNum;

        this.afs.doc('/SegMedico/peregrino/usuarios/' + post['id']).set(post).then(() => {
          this.afs.doc('/SegMedico/peregrino/usuarios/counter').set({ counter: idNum }).then(()=>{
            resolve();
          })
        })

      })
    })
  }

  crearDoctorUsuario(post: any, id ?: string) {
    return new Promise<void>((resolve) => {
      this.afs.doc('/SegMedico/peregrino/usuarios/counter').valueChanges().pipe(take(1)).subscribe(data => {
        console.log(data)
        var idNum = data['counter'] + 1;
        var Model= {}
        Model['activo'] = true;
        Model['f_registro'] = new Date();
        Model['user_reg'] = this.auth.currentUserId;
        if(id){
          console.log('ID', id),
          Model['idNumerico']=idNum;
          Model['activo'] = true;
          Model['id'] = id;
          Model['email'] = post.doc_email;
          Model['user_nombre'] = post.doc_nombre;
          Model['user_primer_apellido'] = post.doc_primer_apellido
          Model['user_segundo_apellido'] = post.doc_segundo_apellido
          Model['user_nombre_completo'] = post.doc_nombre + ' ' + post.doc_primer_apellido + ' ' + post.doc_segundo_apellido;
          Model['userName'] = post.doc_nombre + ' ' + post.doc_primer_apellido + ' ' + post.doc_segundo_apellido;
          Model['permisos'] = {
            Catologos: {
              Doctores: "Crear"
            },
            Inicio: {},
            Salir: {},
            Utilidades: {
              Agenda: "Crear"
            }
          }
        }
        console.log('USUARIO', Model);

        this.afs.doc('/SegMedico/peregrino/usuarios/' + Model['id']).set(Model).then(() => {
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

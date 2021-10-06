import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { cibTheMovieDatabase } from '@coreui/icons';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
  ) { }

  /*Este metodo accede a la colección en con la variable afs y la pasa al
  componente doctores en el async OnInit() */
  getDoctorsList(){
    return this.afs.collection('/SegMedico/peregrino/Doctores', ref=>
    ref
      .orderBy('idNumerico','asc')
    ).valueChanges();
  }

  /*Este metodo recibe el doctor que se pasa en el componente add-doctor */
  crearDoctor(post: any){


    console.log("valor inicial post")
    console.log(post)


    return new Promise<void>((resolve)=>{
      /*accede a la coleccion */
      this.afs.doc('/SegMedico/peregrino/Doctores/counter').valueChanges().pipe(take(1)).subscribe(data => {
        //Incrementa el contador
        var idNum = data['counter'] + 1;

        /*Almacena los datos de activo, fecha de registro, el usuario que lo registró
        el id y un idNumerico*/
        post['f_registro'] = new Date();
        post['user_reg'] = this.authService.currentUserId;
        /*Este id se genera automaticamente mediante un metodo de afs */
        post['id'] = this.afs.createId();
        post['idNumerico'] = idNum;

        console.log("vALOR post");
        console.log(post);
        /*En esta parte se envia el id del doctor que se acaba de crear y todos los datos capturados
        una vez agregados a la colección setea el valor del contador con el idNumerico del ultimo doctor que se agregó,
        este id siempre va incrementando
        this.afs.doc('/SegMedico/peregrino/Doctores/' + post['id']).set(post).then(() => {
          this.afs.doc('/SegMedico/peregrino/Doctores/counter').set({ counter: idNum }).then(()=>{
            resolve();
          })
        })*/
      })
    })
  }

  updateDoctor(post: any) {
    return new Promise<void>(resolve => {
      this.afs.doc('/SegMedico/peregrino/Doctores/' + post['id']).update(post).then(()=>{
        resolve()
      })
    })
  }
}

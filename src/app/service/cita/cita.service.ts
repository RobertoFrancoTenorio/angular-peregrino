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
    public authService: AuthService,
  ) { }

  crearDoctor(post: any) {

    return new Promise<void>((resolve) => {
      /*accede a la coleccion */
      this.afs.doc('/SegMedico/peregrino/citas/counter').valueChanges().pipe(take(1)).subscribe(data => {
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
        este id siempre va incrementando*/
        this.afs.doc('/SegMedico/peregrino/citas/' + post['id']).set(post).then(() => {
          this.afs.doc('/SegMedico/peregrino/citas/counter').set({ counter: idNum }).then(() => {
            resolve();
          })
        })
      })
    })
  }

}

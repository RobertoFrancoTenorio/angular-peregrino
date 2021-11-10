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

  getCitasDiaDoctor(){
    
  }

}

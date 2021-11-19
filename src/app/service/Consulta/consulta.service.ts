import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private afs: AngularFirestore,
    public authService: AuthService) { }

    crearCita(post: any) {
      return new Promise<void>((resolve) => {
        post['f_consulta'] = new Date();
        post['id'] = this.afs.createId();
        console.log("VALOR post");
        console.log(post);
        this.afs.doc('/SegMedico/peregrino/Consultas/' + post['id']).set(post).then(() => {
          resolve();
        })
      })
    }
}

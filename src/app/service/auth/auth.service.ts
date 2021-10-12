import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null; // Save logged in user data
  user: any = null;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        console.log('authstate')
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
        //this.getUserAccount();
      } else {
        this.user=null;
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

  }

  SignIn(email, password) {

    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result)
          resolve(result);
          //this.SetUserData(result.user);
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
    })

  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  async getUserAccount() {
    console.log(this.currentUserId);
    return new Promise(resolve => {
      this.afs.collection('SegMedico').doc('peregrino').collection('usuarios').doc(this.currentUserId).valueChanges().subscribe(
        x => {
          this.userData = x;
          resolve(x);
        })
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', null);
      JSON.parse(localStorage.getItem('user'));
      this.userData=null;
      this.user=null;
      this.router.navigate(['login']);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  get currentUserId(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return this.isLoggedIn ? user.uid : '';
  }

}

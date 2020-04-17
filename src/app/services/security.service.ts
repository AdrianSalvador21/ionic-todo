import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(public authentication: AngularFireAuth) { }

  loginGoogle() {
    console.log('login');
    return this.authentication.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginEmail(user) {
    return this.authentication.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.authentication.signOut();
  }

  registerUser(user) {
    return this.authentication.createUserWithEmailAndPassword(user.email, user.password);
  }

}

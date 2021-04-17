import {Injectable, NgZone} from '@angular/core';
import {User} from "./user";
import firebase from 'firebase';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {Paths} from "../../app-routing.module";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      }
      JSON.parse(localStorage.getItem('user') || '')
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '');
    return (user !== null && user.emailVerified !== false);
  }

  SignIn = (email: string, password: string) =>
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: UserCredential) => {
        this.ngZone.run(() => {
          this.router.navigate([Paths.CANVAS]);
        });
        this.SetUserData(result.user);
      }).catch((error: Error) => {
      window.alert(error.message)
    });

  SignUp = (email: string, password: string) =>
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: UserCredential) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error: Error) => {
      window.alert(error.message)
    });

  SendVerificationMail = () =>
    this.afAuth.currentUser.then(u => u?.sendEmailVerification())
      .then(() => {
        this.router.navigate([Paths.VERIFY_EMAIL]);
      });

  ForgotPassword = (passwordResetEmail: string) =>
    this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error: Error) => {
      window.alert(error)
    });

  GoogleAuth = () => this.AuthLogin(new firebase.auth.GoogleAuthProvider());

  AuthLogin = (provider: any) =>
    this.afAuth.signInWithPopup(provider)
      .then((result: UserCredential) => {
        this.ngZone.run(() => {
          this.router.navigate([Paths.CANVAS]);
        })
        this.SetUserData(result.user);
      }).catch((error: Error) => {
      window.alert(error)
    });

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
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

  SignOut = () =>
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate([Paths.SIGN_IN]);
    });

}

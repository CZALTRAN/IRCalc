import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public static tokenKey: string = "userToken";
  public static userUidKey: string = "userUid";

  usuario: Observable<firebase.User>;



  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.usuario = afAuth.authState;
  }


  public googleLogin() {

    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      let credential = user.credential as firebase.auth.OAuthCredential;
      localStorage[LoginService.tokenKey] = credential.accessToken;
      localStorage[LoginService.userUidKey] = user.user.uid;
      this.router.navigate(['']);
    }).catch((error) => {
      this.router.navigate(['/login']);
    });
  }

  public logout() {
    localStorage.removeItem(LoginService.tokenKey);
    localStorage.removeItem(LoginService.userUidKey);
    return this.afAuth.signOut();

  }



}

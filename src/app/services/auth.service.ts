import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  createUser(user) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPhN6uP8gZPS6GgDxHNSJcl7IBQ6HuBWU',
      {
        email: user.inputEmail,
        password: user.InputPassword,
        returnSecureToken: true
      }
    );
  }


}

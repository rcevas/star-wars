import { User } from './../auth/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

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
    ).pipe(
      catchError(
        errorRes => {
          const defaultErrorMsg: string = 'An error has ocurred';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(defaultErrorMsg);
          }
          return throwError(errorRes);
        }
      ),
      tap(resData => {
        this.handdleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn,
        );
      })
    );
  }

  login(user) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPhN6uP8gZPS6GgDxHNSJcl7IBQ6HuBWU',
      {
        email: user.inputEmailLogin,
        password: user.InputPasswordLogin,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(
        errorRes => {
          return throwError(errorRes);
        }
      ),
      tap(resData => {
        this.handdleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn,
        );
      })
    );
  }

  private handdleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
      );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
      );
    this.user.next(user);
    //passing the initial expiration time to the autologout
    this.autoLogout(expiresIn * 1000);
    //to storage the user data so if the page reload still we have the user data, we don't lose the user data
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    //to clear the token timer if we logout manually
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  //if the page reload we can get the user data from localstore and login again
  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    //loading the user again
    if (loadedUser.token) {
      this.user.next(loadedUser);
      //checking the remaining time of the token when autologin and passing it to tokenExpirationTimer
      const currentExpirationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(currentExpirationTime);
    }
  }

  //to logout when the expired token time
  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
    console.log(expirationTime);
  }

}

import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  authError: string = null;
  isLoading: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  onRegister(f: NgForm) {
    if (!f.valid) {
      return;
    }
    this.isLoading = true;
    this.auth.createUser(f.value)
    .subscribe(
      resData => {
      console.log(resData);
      this.isLoading = false;
      },
      error => {
        const defaultErrorMsg: string = 'An error has ocurred';
        if (!error.error || !error.error.error) {
          return defaultErrorMsg;
        }
        this.authError = error.error.error.message;
        this.isLoading = false;
      });
    f.reset();
  }

}

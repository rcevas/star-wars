import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  successRegister: string = null;
  authError: string = null;
  isLoading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

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
        this.isLoading = false;
        this.successRegister = 'Successful user registration';
        setTimeout( () => {
          this.router.navigate(['/ships']);
        }, 2500);

      },
      error => {
        this.authError = error.error.error.message;
        this.isLoading = false;
      });
    f.reset();
  }

}

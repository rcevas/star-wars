import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authError: string = null;
  isLoading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    this.isLoading = true;
    this.auth.login(f.value)
      .subscribe(
        resData => {
        this.isLoading = false;
        this.router.navigate(['/ships']);
      },
      error => {
        if (error.status === 400) {
          this.authError = '"Wrong input email or password" /or/ "The user account has been disabled"';
        } else {
          this.authError = error.error.error.message;
        }
        this.isLoading = false;
      });
    f.reset();
  }

}

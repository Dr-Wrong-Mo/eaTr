import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
//import { HistoryService } from '../history.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService //private historyService: HistoryService
  ) {}

  public formError: string = '';

  public credentials = {
    _id: '',
    chefName: '',
    email: '',
    password: '',
    recipes: [],
  };

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    this.authenticationService
      .login(this.credentials)
      //delay page redirect until token is in storage
      .then(() => this.router.navigateByUrl('/'))
      .catch((message) => {
        this.formError = message;
      });
  }

  ngOnInit(): void {}
}

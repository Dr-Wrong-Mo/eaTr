import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formError: string = '';

  public credentials = {
    _id: '',
    chefName: '',
    email: '',
    password: '',
    password2: '',
    recipes: [],
  };

  public onRegisterSubmit(): void {
    this.formError = '';
    if (
      !this.credentials.chefName ||
      !this.credentials.email ||
      !this.credentials.password
    ) {
      this.formError = 'All fields are required, please try again';
    } else if (this.credentials.password !== this.credentials.password2) {
      this.formError = 'Passwords do not match, please try again';
    } else {
      this.doRegister();
    }
  }

  private doRegister(): void {
    this.authenticationService
      .register(this.credentials)
      .then(() =>
        this.router
          .navigateByUrl('/')
          .catch((message) => (this.formError = message))
      );
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EatrDataService } from '../eatr-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
})
export class PageHeaderComponent implements OnInit {
  constructor(
    private eatrDataService: EatrDataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.getChef();
    }
  }

  public message: string;

  public chefName = '';

  public getChef(): void {
    this.message = '';
    const chefId = this.authenticationService.getCurrentUser()._id;
    this.eatrDataService.getChef(chefId).then((foundChef) => {
      this.chefName = foundChef.chefName;
      this.message = chefId ? '' : 'No chef found';
    });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public doLogout(): void {
    this.chefName = '';
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

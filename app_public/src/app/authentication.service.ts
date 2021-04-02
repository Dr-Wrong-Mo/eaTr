import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chef } from './chef';
import { Authresponse } from './authresponse';
import { EatrDataService } from './eatr-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private eatrDataService: EatrDataService,
    private http: HttpClient
  ) {}

  public httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.storage.getItem('eatr-token')}`,
    }),
  };

  public getToken(): string {
    return this.storage.getItem('eatr-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('eatr-token', token);
  }

  public login(chef: Chef): Promise<any> {
    return this.eatrDataService
      .login(chef)
      .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getCurrentUser(): Chef {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { _id, email, chefName } = JSON.parse(atob(token.split('.')[1]));
      return { _id, email, chefName } as Chef;
    }
  }

  public logout(): void {
    this.storage.removeItem('eatr-token');
  }

  public register(chef: Chef): Promise<any> {
    return this.eatrDataService
      .register(chef)
      .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }
}

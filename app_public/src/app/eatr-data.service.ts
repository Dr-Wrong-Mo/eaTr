import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Recipe, Item, Chef } from './chef';
import { Authresponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root',
})
export class EatrDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = environment.apiBaseUrl;

  public httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.storage.getItem('eatr-token')}`,
    }),
  };

  //User Authentication Methods

  public login(chef: Chef): Promise<Authresponse> {
    return this.makeAuthApiCall('login', chef);
  }

  public register(chef: Chef): Promise<Authresponse> {
    return this.makeAuthApiCall('register', chef);
  }

  private makeAuthApiCall(urlPath: string, chef: Chef): Promise<Authresponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, chef)
      .toPromise()
      .then((response) => response as Authresponse)
      .catch(this.handleError);
  }

  //Chef Methods
  public getChef(chefId: string): Promise<Chef> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}`;
    return this.http
      .get(url, this.httpOptions)
      .toPromise()
      .then((response) => response as any)
      .catch(this.handleError);
  }

  //Recipes Methods
  public addRecipeByChefId(chefId: string, formData: Recipe): Promise<Recipe> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/recipes`;
    return this.http
      .post(url, formData, this.httpOptions)
      .toPromise()
      .then((response) => response as any)
      .catch(this.handleError);
  }

  public updateRecipeByChefId(
    chefId: string,
    formData: Recipe
  ): Promise<Recipe> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/recipes/${formData._id}`;
    return this.http
      .put(url, formData, this.httpOptions)
      .toPromise()
      .then((response) => response as any)
      .catch(this.handleError);
  }

  public getRecipes(chefId: string): Promise<Recipe[]> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/recipes`;
    return this.http
      .get(url, this.httpOptions)
      .toPromise()
      .then((response) => response as Recipe[])
      .catch(this.handleError);
  }

  public getRecipeById(recipeId: string, chefId: string) {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/recipes/${recipeId}`;
    return this.http
      .get(url, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  public recipeDeleteById(chefId: string, recipeId: string) {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/recipes/${recipeId}`;
    return this.http
      .delete(url, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  //Shopping List Methods
  public addItemByChefId(chefId: string, formData: Item): Promise<Item> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/shoppingList`;
    return this.http
      .post(url, formData, this.httpOptions)
      .toPromise()
      .then((response) => response as any)
      .catch(this.handleError);
  }

  public getItems(chefId: string): Promise<Item[]> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/shoppingList`;
    return this.http
      .get(url, this.httpOptions)
      .toPromise()
      .then((response) => response as Item[])
      .catch(this.handleError);
  }

  public updateItem(
    chefId: string,
    itemId: string,
    formData: Item
  ): Promise<Item[]> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/item/${itemId}`;
    formData.listItemComplete = !formData.listItemComplete;
    return this.http
      .put(url, formData, this.httpOptions)
      .toPromise()
      .then((response) => response as Item[])
      .catch(this.handleError);
  }

  public itemDeleteById(chefId: string, itemId: string) {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/item/${itemId}`;
    return this.http
      .delete(url, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}

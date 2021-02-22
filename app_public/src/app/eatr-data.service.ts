import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe, Item } from './chef';
import { environment, chefId } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EatrDataService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = environment.apiBaseUrl;

  //Recipes Methods
  public addRecipeByChefId(chefId: string, formData: Recipe): Promise<Recipe> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/recipes`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then((response) => response as any)
      .catch(this.handleError);
  }

  public getRecipes(): Promise<Recipe[]> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/recipes`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Recipe[])
      .catch(this.handleError);
  }

  public getRecipeById(recipeId: string) {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/recipes/${recipeId}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  public recipeDeleteById(chefId: string, recipeId: string) {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/recipes/${recipeId}`;
    return this.http
      .delete(url)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  //Shopping List Methods
  public addItemByChefId(chefId: string, formData: Item): Promise<Item> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/shoppingList`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then((response) => response as any)
      .catch(this.handleError);
  }
  public getItems(): Promise<Item[]> {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/shoppingList`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Item[])
      .catch(this.handleError);
  }

  public itemDeleteById(chefId: string, itemId: string) {
    const url: string = `${this.apiBaseUrl}/chef/${chefId}/item/${itemId}`;
    return this.http
      .delete(url)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}

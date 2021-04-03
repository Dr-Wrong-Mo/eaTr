import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EatrDataService } from '../eatr-data.service';
import { AuthenticationService } from '../authentication.service';

import { FrameworkComponent } from '../framework/framework.component';
import { Chef, Recipe, Item } from '../chef';

@Component({
  selector: 'app-menu-body',
  templateUrl: './menu-body.component.html',
  styleUrls: ['./menu-body.component.css'],
})
export class MenuBodyComponent implements OnInit {
  @Input() routerLink: string | any[];

  constructor(
    private eatrDataService: EatrDataService,
    private authenticationService: AuthenticationService,
    private frameworkComponent: FrameworkComponent,
    private router: Router
  ) {}

  public recipes: Recipe[];
  public items: Item;
  public chef: Chef;

  public message: string;

  public chefId = '';

  public getRecipes(): void {
    const { _id } = this.authenticationService.getCurrentUser();
    this.message = 'Searching for things to eat';
    this.eatrDataService.getRecipes(_id).then((foundRecipes) => {
      this.recipes = foundRecipes;
      this.message = foundRecipes.length > 0 ? '' : 'No recipes found';
    });
  }

  public addIngredientToShoppingList(recipeId: string): void {
    this.chefId = this.authenticationService.getCurrentUser()._id;
    let recipe: Recipe;
    this.eatrDataService
      .getRecipeById(recipeId, this.chefId)
      .then((foundrecipe) => {
        recipe = foundrecipe.recipe;
        this.message = !foundrecipe ? '' : 'No recipes found';
        let newItem: Item = {
          _id: recipe._id,
          listItem: recipe.ingredients,
          listItemComplete: false,
        };
        let listItemArray = newItem.listItem.split(',');

        listItemArray.forEach((arrayItem) => {
          newItem.listItem = arrayItem;
          console.log('arrayItem', newItem);
          this.eatrDataService.addItemByChefId(`${this.chefId}`, newItem);
        });
      });
  }

  ngOnInit() {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    } else {
      this.chefId = this.authenticationService.getCurrentUser()._id;
      this.getRecipes();
    }
  }
}

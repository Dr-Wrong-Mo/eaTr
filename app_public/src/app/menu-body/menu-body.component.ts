import { Component, OnInit, Input } from '@angular/core';
import { EatrDataService } from '../eatr-data.service';
import { chefId } from '../../environments/environment.local';
import { FrameworkComponent } from '../framework/framework.component';
import { Router } from '@angular/router';
import { Chef, Recipe, Item } from '../chef'; //commented out ingredients from recipe type

@Component({
  selector: 'app-menu-body',
  templateUrl: './menu-body.component.html',
  styleUrls: ['./menu-body.component.css'],
})
export class MenuBodyComponent implements OnInit {
  @Input() routerLink: string | any[];

  constructor(
    private eatrDataService: EatrDataService,
    private frameworkComponent: FrameworkComponent,
    private router: Router
  ) {}

  public recipes: Recipe[];
  public items: Item;
  public chef: Chef;

  public message: string;

  public getRecipes(): void {
    this.message = 'Searching for things to eat';
    this.eatrDataService.getRecipes().then((foundRecipes) => {
      this.recipes = foundRecipes;
      this.message = foundRecipes.length > 0 ? '' : 'No recipes found';
    });
  }

  public addIngredientToShoppingList(recipeId: string): void {
    let recipe: Recipe;
    this.eatrDataService.getRecipeById(recipeId).then((foundrecipe) => {
      recipe = foundrecipe.recipe;
      this.message = !foundrecipe ? '' : 'No recipes found';
      let newItem: Item = {
        _id: recipe._id,
        listItem: recipe.ingredients,
        listItemComplete: false,
      };
      this.eatrDataService
        .addItemByChefId(`${chefId}`, newItem)
        .then((item: Item) => {
          let recipes = this.chef.recipes.slice(0);
          recipes.unshift(item);
          this.chef.recipes = recipes;
        });
    });
  }

  ngOnInit() {
    this.getRecipes();
  }
}

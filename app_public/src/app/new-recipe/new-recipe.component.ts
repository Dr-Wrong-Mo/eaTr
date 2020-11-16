import { Component, OnInit, Input } from '@angular/core';
import { EatrDataService } from '../eatr-data.service';
import { Chef, Recipe } from '../chef';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  @Input() chef: Chef;

  public newRecipe: Recipe = { recipeName: '', instructions: '', ingredients: '' };

  public formError: string; 

  private formIsValid(): boolean {
    if (this.newRecipe.recipeName && this.newRecipe.instructions) {
      return true;
    } else {
      return false;
    }
  }

  private resetAndHideRecipeForm(): void {
    this.newRecipe.recipeName = '';
    this.newRecipe.instructions = '';
    this.newRecipe.ingredients = '';
  }

  public onRecipeSubmit(): void {
    this.formError = '';
    if (this.formIsValid()) {
      this.eatrDataService.addRecipeByChefId('5ec30d3a93f206389c58748c',
        this.newRecipe)
        .then((recipe: Recipe) => {
          let recipes = this.chef.recipes.slice(0);
          recipes.unshift(recipe);
          this.chef.recipes = recipes;
          this.resetAndHideRecipeForm();
        });
    } else {
      this.formError = 'All fields required, please try again';
    }
  }

  constructor(private eatrDataService: EatrDataService) { }

  ngOnInit(): void {
  }

}

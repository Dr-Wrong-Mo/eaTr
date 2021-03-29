import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EatrDataService } from '../eatr-data.service';
import { AuthenticationService } from '../authentication.service';

import { Chef, Recipe } from '../chef';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  constructor(
    private eatrDataService: EatrDataService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipe = new Recipe();
  }

  //@Input() chef: Chef;

  public chefId = this.authenticationService.getCurrentUser()._id;

  public recipe: Recipe;

  public message: string;

  public editRecipe: Recipe = {
    _id: '',
    recipeName: '',
    instructions: '',
    ingredients: '',
  };

  public formError: string;

  private formIsValid(): boolean {
    if (this.editRecipe.recipeName && this.editRecipe.instructions) {
      return true;
    } else {
      return false;
    }
  }

  private getRecipeById(recipeId: string): void {
    this.message = 'Searching for your recipe';
    this.eatrDataService
      .getRecipeById(recipeId, this.chefId)
      .then((foundrecipe) => {
        this.recipe = foundrecipe.recipe;
        this.message = !foundrecipe ? '' : 'No recipes found';
      });
  }

  public onRecipeUpdate(): void {
    this.formError = '';
    const recipeId = this.route.snapshot.paramMap.get('recipeId');
    this.editRecipe._id = recipeId;
    if (this.formIsValid()) {
      this.eatrDataService
        .updateRecipeByChefId(`${this.chefId}`, this.editRecipe)
        .then(() => {
          this.router.navigate([
            `/chef/${this.chefId}/recipes/${this.recipe._id}`,
          ]);
        });
    } else {
      this.formError = 'All fields required, please try again';
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('recipeId');
    this.getRecipeById(id);
  }
}

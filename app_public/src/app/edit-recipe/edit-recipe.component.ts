import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EatrDataService } from '../eatr-data.service';
import { chefId } from '../../environments/environment.local';
import { Chef, Recipe } from '../chef';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  constructor(
    private eatrDataService: EatrDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipe = new Recipe();
  }

  //@Input() chef: Chef;

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

  private resetAndHideRecipeForm(): void {
    this.editRecipe._id = '';
    this.editRecipe.recipeName = '';
    this.editRecipe.instructions = '';
    this.editRecipe.ingredients = '';
  }

  private getRecipeById(recipeId: string): void {
    this.message = 'Searching for your recipe';
    this.eatrDataService.getRecipeById(recipeId).then((foundrecipe) => {
      this.recipe = foundrecipe.recipe;
      this.message = !foundrecipe ? '' : 'No recipes found';
    });
  }

  public onRecipeUpdate(): void {
    this.formError = '';
    if (this.formIsValid()) {
      this.eatrDataService
        .addRecipeByChefId(`${chefId}`, this.editRecipe)
        .then((recipe: Recipe) => {
          this.resetAndHideRecipeForm();
          this.router.navigate(['']);
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

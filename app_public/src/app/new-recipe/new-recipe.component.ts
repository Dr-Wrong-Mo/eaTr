import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EatrDataService } from '../eatr-data.service';
import { AuthenticationService } from '../authentication.service';
import { Chef, Recipe } from '../chef';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  constructor(
    private eatrDataService: EatrDataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    } else {
      this.chefId = this.authenticationService.getCurrentUser()._id;
    }
  }

  public chefId = '';

  @Input() chef: Chef;

  public newRecipe: Recipe = {
    _id: '',
    recipeName: '',
    instructions: '',
    ingredients: '',
  };

  public formError: string;

  private formIsValid(): boolean {
    if (this.newRecipe.recipeName && this.newRecipe.instructions) {
      return true;
    } else {
      return false;
    }
  }

  private resetAndHideRecipeForm(): void {
    this.newRecipe._id = '';
    this.newRecipe.recipeName = '';
    this.newRecipe.instructions = '';
    this.newRecipe.ingredients = '';
  }

  public onRecipeSubmit(): void {
    this.formError = '';
    if (this.formIsValid()) {
      this.eatrDataService
        .addRecipeByChefId(this.chefId, this.newRecipe)
        .then((recipe: Recipe) => {
          this.resetAndHideRecipeForm();
          this.router.navigate(['']);
        });
    } else {
      this.formError = 'All fields required, please try again';
    }
  }
}

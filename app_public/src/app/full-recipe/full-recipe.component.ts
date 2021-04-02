import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EatrDataService } from '../eatr-data.service';
import { AuthenticationService } from '../authentication.service';
import { Recipe } from '../chef';

@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.component.html',
  styleUrls: ['./full-recipe.component.css'],
})
export class FullRecipeComponent implements OnInit {
  /* @Input() recipe: Recipe; */

  public recipe: Recipe;

  public message: string;

  constructor(
    private eatrDataService: EatrDataService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipe = new Recipe();
  }

  public chefId = '';

  private getRecipeById(recipeId: string, id: string): void {
    this.message = 'Searching for your recipe';
    this.eatrDataService.getRecipeById(recipeId, id).then((foundrecipe) => {
      this.recipe = foundrecipe.recipe;
      this.message = !foundrecipe ? '' : 'No recipes found';
    });
  }

  public recipeDeleteById(): void {
    if (window.confirm('Deleting Recipe')) {
      this.eatrDataService
        .recipeDeleteById(`${this.chefId}`, this.recipe._id)
        .then(() => {
          this.router.navigate(['']);
        });
    }
  }

  ngOnInit(): void {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    } else {
      this.chefId = this.authenticationService.getCurrentUser()._id;
      const id = this.route.snapshot.paramMap.get('recipeId');
      this.getRecipeById(id, this.chefId);
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EatrDataService } from '../eatr-data.service';
import { chefId } from '../../environments/environment';
import { FrameworkComponent } from '../framework/framework.component';
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
    private frameworkComponent: FrameworkComponent,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipe = new Recipe();
  }

  private getRecipeById(recipeId: string): void {
    this.message = 'Searching for your recipe';
    this.eatrDataService.getRecipeById(recipeId).then((foundrecipe) => {
      this.recipe = foundrecipe.recipe;
      this.message = !foundrecipe ? '' : 'No recipes found';
    });
  }

  public recipeDeleteById(): void {
    if (window.confirm('Deleting Recipe')) {
      this.eatrDataService
        .recipeDeleteById(`${chefId}`, this.recipe._id)
        .then(() => {
          this.router.navigate(['']);
        });
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('recipeId');
    this.getRecipeById(id);
  }
}

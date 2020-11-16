import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EatrDataService } from '../eatr-data.service';
import { FrameworkComponent } from '../framework/framework.component';
import { Recipe } from '../chef';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.component.html',
  styleUrls: ['./full-recipe.component.css']
})

export class FullRecipeComponent implements OnInit {

  /* @Input() recipe: Recipe; */

  public recipe: Recipe;

  public message: string;

  constructor(
    private eatrDataService: EatrDataService,
    private frameworkComponent: FrameworkComponent,
    private route: ActivatedRoute,
    ) { this.recipe = new Recipe(); }

  private getRecipeById(recipeId: string): void {
    this.message = 'Searching for your recipe';
    this.eatrDataService.getRecipeById(recipeId)
      .then(foundrecipe => {
        this.recipe = foundrecipe.recipe;
        this.message = !foundrecipe ? '' : 'No recipes found';
        console.log('test this console log', foundrecipe.recipe);
        console.log(foundrecipe);
      });
      /* console.log('give recipe name', this.recipe.recipeName); */
  }

ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('recipeId');
    console.log('id', id);
    this.getRecipeById(id);
  }

}

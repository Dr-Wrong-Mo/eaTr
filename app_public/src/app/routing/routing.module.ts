import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FullRecipeComponent } from '../full-recipe/full-recipe.component';
import { MenuBodyComponent } from '../menu-body/menu-body.component';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    component: MenuBodyComponent,
  },
  {
    path: 'newRecipe',
    component: NewRecipeComponent,
  },
  {
    path: 'shoppingList',
    component: ShoppingListComponent,
  },
  {
    path: 'newRecipe',
    component: NewRecipeComponent,
  },
  {
    path: 'chef/5fbe852aafa666c5232a9af6/recipes/:recipeId',
    component: FullRecipeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule {}

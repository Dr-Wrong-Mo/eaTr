import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { MenuBodyComponent } from '../menu-body/menu-body.component';
import { AboutComponent } from '../about/about.component';
import { FullRecipeComponent } from '../full-recipe/full-recipe.component';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    component: MenuBodyComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'newRecipe',
    component: NewRecipeComponent,
  },
  {
    path: 'chef/:chefId/recipes/:recipeId/edit',
    component: EditRecipeComponent,
  },
  {
    path: 'shoppingList',
    component: ShoppingListComponent,
  },

  {
    path: 'chef/:chefId/recipes/:recipeId',
    component: FullRecipeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule {}

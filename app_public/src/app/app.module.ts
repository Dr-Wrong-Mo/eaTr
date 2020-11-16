import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FrameworkComponent } from './framework/framework.component';
import { FullRecipeComponent } from './full-recipe/full-recipe.component';
import { MenuBodyComponent } from './menu-body/menu-body.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  declarations: [
    FrameworkComponent,
    FullRecipeComponent,
    MenuBodyComponent,
    TitleBarComponent,
    SidebarComponent,
    NewRecipeComponent,
    ShoppingListComponent,
    PageHeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component: MenuBodyComponent
      },
      {
        path:'newRecipe',
        component: NewRecipeComponent
      },
      {
        path:'shoppingList',
        component: ShoppingListComponent
      },
      {
        path:'newRecipe',
        component: NewRecipeComponent
      },
      {
        path: 'chef/5ec30d3a93f206389c58748c/recipes/:recipeId',
        component: FullRecipeComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }

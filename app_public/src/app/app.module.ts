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
<<<<<<< HEAD
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HtmlLineBreaksPipe } from './html-line-breaks.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './popup/popup.component';
=======
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageHeaderComponent } from './page-header/page-header.component';
>>>>>>> 5227baf729ca0da4c21e3cfbb230e73153686cfa

@NgModule({
  declarations: [
    FrameworkComponent,
    FullRecipeComponent,
    MenuBodyComponent,
    TitleBarComponent,
    SidebarComponent,
<<<<<<< HEAD
    ShoppingListComponent,
    HtmlLineBreaksPipe,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
=======
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
>>>>>>> 5227baf729ca0da4c21e3cfbb230e73153686cfa
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }

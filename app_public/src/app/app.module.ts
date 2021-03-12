import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FrameworkComponent } from './framework/framework.component';
import { FullRecipeComponent } from './full-recipe/full-recipe.component';
import { MenuBodyComponent } from './menu-body/menu-body.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { RoutingModule } from './routing/routing.module';
import { SortChecklistPipe } from './sort-checklist.pipe';
import { AboutComponent } from './about/about.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    FrameworkComponent,
    FullRecipeComponent,
    MenuBodyComponent,
    SidebarComponent,
    NewRecipeComponent,
    ShoppingListComponent,
    PageHeaderComponent,
    SortChecklistPipe,
    AboutComponent,
    EditRecipeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [FrameworkComponent],
})
export class AppModule {}

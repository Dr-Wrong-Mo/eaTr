import { Component, OnInit, Input } from '@angular/core';

import { EatrDataService } from '../eatr-data.service';
import { AuthenticationService } from '../authentication.service';
import { Item, Chef } from '../chef';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  @Input() chef: Chef;

  constructor(
    private eatrDataService: EatrDataService,
    private authenticationService: AuthenticationService
  ) {
    this.item = new Item();
  }

  public chefId = this.authenticationService.getCurrentUser()._id;

  public item: Item;
  public items: Item[];
  public newItem: Item = { _id: '', listItem: '', listItemComplete: false };
  shoppingListItems: any[] = [];

  public formError: string;
  public message: string;

  private formIsValid(): boolean {
    if (this.newItem.listItem) {
      return true;
    } else {
      return false;
    }
  }

  private resetItemForm(): void {
    this.newItem.listItem = 'Item added. Add more items.';
  }

  private getItems(id): void {
    this.message = 'Searching for things to eat';
    this.eatrDataService.getItems(id).then((foundItems) => {
      this.items = foundItems;
      this.message = foundItems.length > 0 ? '' : 'No recipes found';
    });
  }

  public onItemSubmit(): void {
    this.formError = '';
    if (this.formIsValid()) {
      this.eatrDataService
        .addItemByChefId(`${this.chefId}`, this.newItem)
        .then((item: Item) => {
          this.resetItemForm();
          this.getItems(this.chefId);
        });
    } else {
      this.formError = 'All fields required, please try again';
    }
  }

  public updateItem(i): void {
    this.eatrDataService
      .updateItem(`${this.chefId}`, this.items[i]._id, this.items[i])
      .then(() => {
        this.resetItemForm();
        this.getItems(this.chefId);
      });
  }

  public itemDeleteById(i): void {
    this.eatrDataService
      .itemDeleteById(`${this.chefId}`, this.items[i]._id)
      .then(() => {});
    this.getItems(this.chefId);
  }

  ngOnInit() {
    this.getItems(this.chefId);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { EatrDataService } from '../eatr-data.service';
import { chefId } from '../../environments/environment';
import { Item, Chef } from '../chef';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  @Input() chef: Chef;

  constructor(private eatrDataService: EatrDataService) {
    this.item = new Item();
  }

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

  private getItems(): void {
    this.message = 'Searching for things to eat';
    this.eatrDataService.getItems().then((foundItems) => {
      this.items = foundItems;
      this.message = foundItems.length > 0 ? '' : 'No recipes found';
    });
  }

  public onItemSubmit(): void {
    this.formError = '';
    if (this.formIsValid()) {
      this.eatrDataService
        .addItemByChefId(`${chefId}`, this.newItem)
        .then((item: Item) => {
          this.resetItemForm();
          this.getItems();
        });
    } else {
      this.formError = 'All fields required, please try again';
    }
  }

  public itemDeleteById(i): void {
    if (window.confirm('Deleting Item')) {
      this.eatrDataService
        .itemDeleteById(`${chefId}`, this.items[i]._id)
        .then(() => {});
      this.getItems();
    }
  }

  ngOnInit() {
    this.getItems();
  }
}

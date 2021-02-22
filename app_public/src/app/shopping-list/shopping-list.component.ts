import { Component, OnInit, Input } from '@angular/core';
import { EatrDataService } from '../eatr-data.service';
import { chefId } from '../../environments/environment';
import { FrameworkComponent } from '../framework/framework.component';
import { Item, Chef } from '../chef';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  @Input() chef: Chef;

  shoppingListItems: any[] = [];
  public newItem: Item = { listItem: '', listItemComplete: false };

  public formError: string;

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

  constructor(private eatrDataService: EatrDataService) {}

  public items: Item[];

  public message: string;

  private getItems(): void {
    this.message = 'Searching for things to eat';
    this.eatrDataService.getItems().then((foundItems) => {
      this.items = foundItems;
      this.message = foundItems.length > 0 ? '' : 'No recipes found';
    });
  }

  ngOnInit() {
    this.getItems();
  }
}

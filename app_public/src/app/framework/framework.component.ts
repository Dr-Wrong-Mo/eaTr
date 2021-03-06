import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { EatrDataService } from '../eatr-data.service';

export class Chef {
  _id: string;
  chef: string;
  recipes: any[];
}

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})

/*export class ShoppingList {
  item: {
    ingredient: string;
    quantity: number;
    unitOfMeasure: string;
    }
}*/

export class FrameworkComponent {

  bodySwitch = "menu";

  public menuVisible: boolean = false;
  public chef: Chef[];
  public message: string;

  constructor(private eatrDataService: EatrDataService) { }

  ngOnInit(): void {
    
  }

}
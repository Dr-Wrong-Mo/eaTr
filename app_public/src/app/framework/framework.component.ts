import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { NgModule } from '@angular/core';
import { EatrDataService } from '../eatr-data.service';

export class Chef {
  _id: string;
  chef: string;
  recipes: any[];
}
>>>>>>> 5227baf729ca0da4c21e3cfbb230e73153686cfa

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

<<<<<<< HEAD
  popUpOpen = false;

  openPopUp() {
    this.popUpOpen = true;
  }

  cancelOption() {
    this.popUpOpen = false;
=======
  constructor(private eatrDataService: EatrDataService) { }

  ngOnInit(): void {
    
>>>>>>> 5227baf729ca0da4c21e3cfbb230e73153686cfa
  }

}
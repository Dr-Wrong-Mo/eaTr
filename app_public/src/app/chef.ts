//Ingredients not in use.  Will reactivate when recipe.ingredients becomes an array of objects.

/* export class Ingredients {
  ingredient: string;
  quantity: number;
  unitOfMeasure: string;
} */

export class Recipe {
  recipeName: string;
  instructions: string;
  ingredients: string;
}

export class Item {
  listItem: string;
  listItemComplete;
}

export class Chef {
    _id: string;
    chefName: string;
    recipes: any[];
  }
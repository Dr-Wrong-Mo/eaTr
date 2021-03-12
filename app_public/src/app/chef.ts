//Ingredients not in use.  Will reactivate when recipe.ingredients becomes an array of objects.

/* export class Ingredients {
  ingredient: string;
  quantity: number;
  unitOfMeasure: string;
} */

export class Recipe {
  _id: string;
  recipeName: string;
  instructions: string;
  ingredients: string;
}

export class Item {
  _id: string;
  listItem: string;
  listItemComplete: boolean;
}

export class Chef {
  _id: string;
  chefName: string;
  recipes: any[];
}

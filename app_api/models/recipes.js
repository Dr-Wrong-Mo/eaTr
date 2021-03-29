const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

//Recipe Schemas

//removing ingredientsSchema until recipe.ingredients is an array of objects.

/* const ingredientsSchema = new mongoose.Schema({
    ingredient: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    unitOfMeasure: {
        type: String,
        required: false
    }
 }); */

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: false,
  },
  image: {
    img: { data: Buffer, contentType: String },
  },
});

//Shopping List Schema
const itemSchema = new mongoose.Schema({
  listItem: {
    type: String,
    required: true,
  },
  listQuantity: {
    type: Number,
    required: false,
  },
  listUnitOfMeasure: {
    type: String,
    required: false,
  },
  listItemComplete: {
    type: Boolean,
    required: true,
  },
});

const shoppingListNameSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: false,
  },
  item: [itemSchema],
});

//Chef Schema
const chefSchema = new mongoose.Schema({
  chefName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  recipe: [recipeSchema],
  //shoppingList: [shoppingListNameSchema]
  item: [itemSchema], //put this here until multiple shopping lists are enabled.
  hash: String,
  salt: String,
});

chefSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

chefSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

chefSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000, 10),
    },
    process.env.JWT_SECRET
  );
};

//mongoose.model('ingredients', ingredientsSchema);
mongoose.model('Recipes', recipeSchema, 'recipe');
mongoose.model('ShoppingLists', shoppingListNameSchema, 'shoppingList');
mongoose.model('Items', itemSchema, 'item');
mongoose.model('Chefs', chefSchema, 'chef');

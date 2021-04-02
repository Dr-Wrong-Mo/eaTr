const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  algorithms: ['HS256'],
});

const ctrlChef = require('../controllers/chef.js');
const ctrlRecipes = require('../controllers/recipes.js');
const ctrlShoppingList = require('../controllers/shoppingList.js');
const ctrlAuth = require('../controllers/authentication');

// chef
router.route('/chef').get(ctrlChef.chefGetAll).post(ctrlChef.chefCreate);

router
  .route('/chef/:chefid')
  .get(auth, ctrlChef.chefReadOne)
  .put(auth, ctrlChef.chefUpdateOne)
  .delete(auth, ctrlChef.chefDeleteOne);

// recipes
router
  .route('/chef/:chefid/recipes')
  .get(auth, ctrlRecipes.recipesReadList)
  .post(auth, ctrlRecipes.recipesCreate);

router
  .route('/chef/:chefid/recipes/:recipeid')
  .get(auth, ctrlRecipes.recipesReadOne)
  .put(auth, ctrlRecipes.recipesUpdateOne)
  .delete(auth, ctrlRecipes.recipesDeleteOne);

// shopping list
router
  .route('/chef/:chefid/shoppingList')
  .get(auth, ctrlShoppingList.shoppingListReadList)
  .post(auth, ctrlShoppingList.shoppingListAddItem);

//Future use. Plan for users to have multiple shopping lists
/* router
  .route('/chef/:chefid/shoppingList/:shoppingListid')
  .put(auth, ctrlShoppingList.shoppingListUpdateList)
  .delete(auth, ctrlShoppingList.shoppingListDeleteList); */

//I believe this is redundant.  The method is handled in Angular.
// shopping list items
/* router
  .route(`/chef/:chefid/item`)
  .post(ctrlShoppingList.shoppingListAddFullRecipe); */

router
  .route(`/chef/:chefid/item/:itemid`)
  .get(auth, ctrlShoppingList.shoppingListReadOne)
  .put(auth, ctrlShoppingList.shoppingListUpdateOne)
  .delete(auth, ctrlShoppingList.shoppingListDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;

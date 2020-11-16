const express = require('express');
const router = express.Router();
const ctrlChef = require('../controllers/chef.js');
const ctrlRecipes = require('../controllers/recipes.js');
const ctrlShoppingList = require('../controllers/shoppingList.js');

// chef
router
    .route('/chef')
    .get(ctrlChef.chefGetAll)
    .post(ctrlChef.chefCreate);

router
    .route('/chef/:chefid')
    .get(ctrlChef.chefReadOne)
    .put(ctrlChef.chefUpdateOne)
    .delete(ctrlChef.chefDeleteOne);

// recipes
router
    .route('/chef/:chefid/recipes')
    .get(ctrlRecipes.recipesReadList)
    .post(ctrlRecipes.recipesCreate);

router
    .route('/chef/:chefid/recipes/:recipeid')
    .get(ctrlRecipes.recipesReadOne)
    .put(ctrlRecipes.recipesUpdateOne)
    .delete(ctrlRecipes.recipesDeleteOne);

// shopping list
router
    .route('/chef/:chefid/shoppingList')
    .get(ctrlShoppingList.shoppingListReadList)
    .post(ctrlShoppingList.shoppingListCreateList);

router
    .route('/chef/:chefid/shoppingList/:shoppingListid')
    .put(ctrlShoppingList.shoppingListUpdateList)
    .delete(ctrlShoppingList.shoppingListDeleteList);

    // shopping list items
router
    .route('/chef/:chefid/shoppingList/5eb7bb14689a7813d445ac2f/item')
    .post(ctrlShoppingList.shoppingListAddFullRecipe);

router
    .route('/chef/:chefid/shoppingList/5eb7bb14689a7813d445ac2f/item/:itemid')
    .get(ctrlShoppingList.shoppingListReadOne)
    .put(ctrlShoppingList.shoppingListUpdateOne)
    .delete(ctrlShoppingList.shoppingListDeleteOne);

    module.exports = router;
const mongoose = require('mongoose');

//Recipe Schemas
const ingredientsSchema = new mongoose.Schema({
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
 });

 const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    ingredients: [ingredientsSchema],
    instructions: {
        type: String,
        required: false
    },
    image: ({
        img: { data: Buffer, contentType: String }
    })
});

//Shopping List Schema
const itemSchema = new mongoose.Schema({
    listItem: {
        type: String,
        required: false
    },
    listQuantity: {
        type: Number,
        required: false
    },
    listUnitOfMeasure: {
        type: String,
        required: false
    },
    listItemComplete: {
        type: Boolean,
        required: true
    }
})

const shoppingListNameSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: true
    },
    item: [itemSchema]
});

//Chef Schema
const chefSchema = new mongoose.Schema({
    chefName: {
    type: String,
    required: true
    },
    recipe: [recipeSchema],
    //shoppingList: [shoppingListNameSchema]
    item: [itemSchema] //put this here until multiple shopping lists are enabled.
});

mongoose.model('ingredients', ingredientsSchema);
mongoose.model('recipe', recipeSchema);
mongoose.model('shoppingList', shoppingListNameSchema);
mongoose.model('item', itemSchema);
mongoose.model('chef', chefSchema);
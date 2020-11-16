const mongoose = require('mongoose');
const Rec = mongoose.model('recipe');
const Chf = mongoose.model('chef');

//Create
const doAddRecipe = (req, res, chef) => {
    console.log('doAddRecipe method being used');
    if (!chef) {
        res
            .status(404)
            .json({ "message": "Chef not found" });
    } else {
        const { 
            recipeName, 
            instructions, 
            ingredients,
        } = req.body;
        chef.recipe.push({
            recipeName,
            instructions,
            ingredients,
        });
        chef.save((err, chef) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                const thisRecipe = chef.recipe.slice(-1).pop();
                res
                    .status(201)
                    .json(thisRecipe);
            }
        });
    }
};

const recipesCreate = (req, res) => {
    console.log('recipesCreate method being used');
    const chefId = req.params.chefid;
    if (chefId) {
        Chf
            .findById(chefId)
            .select('recipe')
            .exec((err, chef) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    doAddRecipe(req, res, chef); 
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "Chef not found" });
    }
};

//Read
const recipesReadList = (req, res) => {
    console.log('fetching API method recipesReadList');
    Chf
        .findById(req.params.chefid)
        .select('recipe')
        .exec((err, chef) => {
            if (!chef) {
                return res
                    .status(404)
                    .json({
                        "message": "chef not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            if (chef.recipe && chef.recipe.length > 0) {
                if (!chef.recipe) {
                    return res
                        .status(404)
                        .json({
                            "message": "recipes not found"
                        });
                } else {
                    return res
                        .status(200)
                        .json(chef.recipe);
                }
            } else {
                return res
                    .status(404)
                    .json({
                        "message": "No recipes found"
                    });
            }
        }
        );
};

const recipesReadOne = (req, res) => {
    console.log('fetching API method recipesReadOne');
    Chf
        .findById(req.params.chefid)
        .select('recipe')
        .exec((err, chef) => {
            if (!chef) {
                return res
                    .status(404)
                    .json({
                        "message": "chef not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }

            if (chef.recipe && chef.recipe.length > 0) {
                const recipe = chef.recipe.id(req.params.recipeid);

                if (!recipe) {
                    return res
                        .status(404)
                        .json({
                            "message": "recipe not found"
                        });
                } else {
                    const response = {
                        chef : {
                            name : chef.name,
                            id : req.params.chefid
                        },
                        recipe
                    };

                    return res
                        .status(200)
                        .json(response);
                }
            } else {
                return res
                    .status(404)
                    .json({
                        "message": "No recipe found"
                    });
            }
        }
        );
};

const recipesList = (req, res) => {
    try {
        const recipes = results(result => {
            return {
                id: result._id,
                recipesName: result.recipesName
            }
            });
            res
                .status(200)
                .json(recipes);
    } catch (err) {
        res
            .status(404)
            .json(err);
    }
};

//Update
const recipesUpdateOne = (req, res) => {
    if (!req.params.recipeid) {
        return res
            .status(404)
            .json({
                "message": "Not found, recipeid is required"
            });
    }
    Rec
        .findById(req.params.recipeid)
        .select('recipes')
        .exec((err, recipe) => {
        if (!recipe) {
            return res
            .status(404)
            .json({
                "message": "recipeid not found"
            });
        } else if (err) {
            return res
            .status(400)
            .json(err);
        }
        recipe.recipeName = req.body.recipeName;
        recipe.instructions = req.body.instructions;
        recipe.image = req.body.image;
        recipe.ingredients = req.body.ingredients;
        recipe.save((err, Rec) => {
            if (err) {
            res
                .status(404)
                .json(err);
            } else {
            res
                .status(200)
                .json(Rec);
            }
        });
    }
  );
};

//Delete
const recipesDeleteOne = (req, res) => {
    const {recipeid} = req.params;
    if (recipeid) {
        Rec
        .findByIdAndRemove(recipeid)
        .exec((err, recipe) => {
            if (err) {
                return res
                .status(404)
                .json(err);
            }
            res
                .status(204)
                .json(null);
            }
        );
  } else {
    res
      .status(404)
      .json({
        "message": "No Item Found"
      });
  }
 };

module.exports ={
    recipesList,
    recipesReadList,
    doAddRecipe,
    recipesCreate,
    recipesReadOne,
    recipesUpdateOne,
    recipesDeleteOne
};

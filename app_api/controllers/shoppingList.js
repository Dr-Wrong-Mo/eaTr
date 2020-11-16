const mongoose = require('mongoose');
const SpL = mongoose.model('shoppingList');
const Itm = mongoose.model('item');
const Chf = mongoose.model('chef');

//Create

const doAddshoppingList = (req, res, chef) => {
    console.log('create item using API method doAddshoppingList');
    if (!chef) {
        res
            .status(404)
            .json({ "message": "Chef not found" });
    } else {
        const { listItem, listItemComplete } = req.body;
        chef.item.push({
            listItem,
            listItemComplete,
        });
        chef.save((err, chef) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                const thisshoppingList = chef.item.slice(-1).pop();
                res
                    .status(201)
                    .json(thisshoppingList);
            }
        });
    }
};  

const shoppingListCreateList = (req, res) => {
    const chefId = req.params.chefid;
    if (chefId) {
        Chf
            .findById(chefId)
            .select('item')
            .exec((err, chef) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    doAddshoppingList(req, res, chef); 
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "Chef not found" });
    }
};

 const shoppingListAddFullRecipe = (req, res) => { }; //Need to create this controller

//Read

 const shoppingListReadList = (req, res) => {
    console.log('fetching API method shoppingListReadList');
    Chf
        .findById(req.params.chefid)
        .select('item')
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
            if (chef.item && chef.item.length > 0) {
                if (!chef.item) {
                    return res
                        .status(404)
                        .json({
                            "message": "items not found"
                        });
                } else {
                    return res
                        .status(200)
                        .json(chef.item);
                }
            } else {
                return res
                    .status(404)
                    .json({
                        "message": "No items found"
                    });
            }
        }
        );
};

const shoppingListReadOne = (req, res) => { 
    Itm
      .findById(req.params.itemid)
      .exec((err, item) => {
        if (!item) {
          return res
            .status(404)
            .json({
              "message": "Item not found"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        } else {
          return res
            .status(200)
            .json(item);
        }
      });
 };

//Update

const shoppingListUpdateList = (req, res) => { 
    if (!req.params.shoppingListid) {
        return res
            .status(404)
            .json({
                "message": "Not found, shoppingListid is required"
            });
    }
    SpL
        .findById(req.params.shoppingListid)
        .select('shoppingList')
        .exec((err, shoppingList) => {
        if (!shoppingList) {
            return res
            .status(404)
            .json({
                "message": "shoppingListid not found"
            });
        } else if (err) {
            return res
            .status(400)
            .json(err);
        }
        shoppingList.listName = req.body.listName;
        shoppingList.save((err, SpL) => {
            if (err) {
            res
                .status(404)
                .json(err);
            } else {
            res
                .status(200)
                .json(SpL);
            }
        });
        }
  );
 };

const shoppingListUpdateOne = (req, res) => {  
    if (!req.params.itemid) {
        return res
            .status(404)
            .json({
                "message": "Not found, itemid is required"
            });
    }
    Itm
        .findById(req.params.itemid)
        .select('item')
        .exec((err, item) => {
        if (!item) {
            return res
            .status(404)
            .json({
                "message": "itemid not found"
            });
        } else if (err) {
            return res
            .status(400)
            .json(err);
        }
        item.listItem = req.body.listItem;
        item.listQuantity = req.body.listQuantity;
        item.listUnitOfMeasure = req.body.listUnitOfMeasure;
        item.listItemComplete = req.body.listItemComplete;
        item.save((err, Itm) => {
            if (err) {
            res
                .status(404)
                .json(err);
            } else {
            res
                .status(200)
                .json(Itm);
            }
        });
        }
  );
};

//Delete
const shoppingListDeleteList = (req, res) => {  
    const {shoppingListid} = req.params;
    if (shoppingListid) {
        SpL
        .findByIdAndRemove(shoppingListid)
        .exec((err, shoppingList) => {
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

const shoppingListDeleteOne = (req, res) => { 
    const {itemid} = req.params;
    if (itemid) {
        Itm
        .findByIdAndRemove(itemid)
        .exec((err, item) => {
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

module.exports = {
    doAddshoppingList,
    shoppingListCreateList,
    //shoppingListCreateItem,
    shoppingListAddFullRecipe,
    shoppingListReadList,
    shoppingListReadOne,
    shoppingListUpdateList,
    shoppingListUpdateOne,
    shoppingListDeleteList,
    shoppingListDeleteOne
};
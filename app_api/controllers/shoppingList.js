const mongoose = require('mongoose');
const SpL = mongoose.model('ShoppingLists');
const Itm = mongoose.model('Items');
const Chf = mongoose.model('Chefs');

//Create

const doAddshoppingList = (req, res, chef) => {
  console.log('create item using API method doAddshoppingList');
  if (!chef) {
    res.status(404).json({ message: 'Chef not found' });
  } else {
    const { listItem, listItemComplete } = req.body;
    chef.item.push({
      listItem,
      listItemComplete,
    });
    chef.save((err, chef) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const thisshoppingList = chef.item.slice(-1).pop();
        res.status(201).json(thisshoppingList);
      }
    });
  }
};

const shoppingListCreateList = (req, res) => {
  const chefId = req.params.chefid;
  if (chefId) {
    Chf.findById(chefId)
      .select('item')
      .exec((err, chef) => {
        if (err) {
          res.status(400).json(err);
        } else {
          doAddshoppingList(req, res, chef);
        }
      });
  } else {
    res.status(404).json({ message: 'Chef not found' });
  }
};

//Read

const shoppingListReadList = (req, res) => {
  console.log('fetching API method shoppingListReadList');
  Chf.findById(req.params.chefid)
    .select('item')
    .exec((err, chef) => {
      if (!chef) {
        return res.status(404).json({
          message: 'chef not found',
        });
      } else if (err) {
        return res.status(400).json(err);
      }
      if (chef.item && chef.item.length > 0) {
        if (!chef.item) {
          return res.status(404).json({
            message: 'items not found',
          });
        } else {
          return res.status(200).json(chef.item);
        }
      } else {
        return res.status(404).json({
          message: 'No items found',
        });
      }
    });
};

const shoppingListReadOne = (req, res) => {
  Chf.findById(req.params.chefid).exec((err, chef) => {
    if (!chef) {
      return res.status(404).json({
        message: 'Item not found',
      });
    } else if (err) {
      return res.status(404).json(err);
    } else {
      return res
        .status(200)
        .json(chef.item.find(({ id }) => id === req.params.itemid));
    }
  });
};

//Update

const shoppingListUpdateList = (req, res) => {
  if (!req.params.shoppingListid) {
    return res.status(404).json({
      message: 'Not found, shoppingListid is required',
    });
  }
  SpL.findById(req.params.shoppingListid)
    .select('shoppingList')
    .exec((err, shoppingList) => {
      if (!shoppingList) {
        return res.status(404).json({
          message: 'shoppingListid not found',
        });
      } else if (err) {
        return res.status(400).json(err);
      }
      shoppingList.listName = req.body.listName;
      shoppingList.save((err, SpL) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(SpL);
        }
      });
    });
};

const shoppingListUpdateOne = (req, res) => {
  if (!req.params.itemid) {
    return res.status(404).json({
      message: 'Not found, itemid is required',
    });
  }
  Chf.findById(req.params.chefid)
    .select('item')
    .exec((err, chef) => {
      let item = chef.item.find(({ id }) => id === req.params.itemid);
      if (!item) {
        return res.status(404).json({
          message: 'itemid not found',
        });
      } else if (err) {
        return res.status(400).json(err);
      }
      item.listItem = req.body.listItem;
      item.listItemComplete = req.body.listItemComplete;
      chef.save((err, Itm) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(Itm);
        }
      });
    });
};

//Delete
const shoppingListDeleteList = (req, res) => {
  const { shoppingListid } = req.params;
  if (shoppingListid) {
    SpL.findByIdAndRemove(shoppingListid).exec((err, shoppingList) => {
      if (err) {
        return res.status(404).json(err);
      }
      res.status(204).json(null);
    });
  } else {
    res.status(404).json({
      message: 'No Item Found',
    });
  }
};

const shoppingListDeleteOne = (req, res) => {
  const { chefid, itemid } = req.params;
  if (!chefid || !itemid) {
    return res
      .status(404)
      .json({ message: 'Not found, chefid and itemid are both required' });
  }
  Chf.findById(chefid)
    .select('item')
    .exec((err, chef) => {
      if (!chef) {
        return res.status(404).json({
          message: 'Chef not found',
        });
      } else if (err) {
        return res.status(400).json(err);
      } else {
        if (chef.item && chef.item.length > 0) {
          if (!chef.item.id(itemid)) {
            return res.status(404).json({ message: 'Item not found' });
          } else {
            chef.item.id(itemid).remove();
            chef.save((err) => {
              if (err) {
                return res.status(404).json(err);
              } else {
                res.status(204).json(null);
              }
            });
          }
        } else {
          res.status(404).json({ message: 'No item to delete' });
        }
      }
    });
};

module.exports = {
  doAddshoppingList,
  shoppingListCreateList,
  shoppingListReadList,
  shoppingListReadOne,
  shoppingListUpdateList,
  shoppingListUpdateOne,
  shoppingListDeleteList,
  shoppingListDeleteOne,
};

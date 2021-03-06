const mongoose = require('mongoose');
const Chf = mongoose.model('Chefs');
const getChefModule = require('./getChef');

const getChef = getChefModule.getChef;

//Create

const chefCreate = (req, res) => {
  Chf.create(
    {
      chefName: req.body.chefName,
      email: req.body.email,
    },
    (err, chef) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(chef);
      }
    }
  );
};

//Read

const chefGetAll = (req, res) => {
  Chf.find({}).exec((err, chef) => {
    if (!chef) {
      return res.status(404).json({
        message: 'Chef not found',
      });
    } else if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(chef);
    }
  });
};

const chefReadOne = (req, res) => {
  getChef(req, res, (req, res, chefName) => {
    Chf.findById(req.params.chefid).exec((err, chef) => {
      if (!chef) {
        return res.status(404).json({
          message: 'Chef not found',
        });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(chef);
      }
    });
  });
};

//Update

const chefUpdateOne = (req, res) => {
  getChef(req, res, (req, res, chefName) => {
    if (!req.params.chefid) {
      return res.status(404).json({
        message: 'Not found, chefid is required',
      });
    }
    Chf.findById(req.params.chefid)
      .select('chef')
      .exec((err, chef) => {
        if (!chef) {
          return res.status(404).json({
            message: 'chefid not found',
          });
        } else if (err) {
          return res.status(400).json(err);
        }
        chef.chefName = req.body.chefName;
        chef.email = req.body.email;
        chef.save((err, Chf) => {
          if (err) {
            res.status(404).json(err);
          } else {
            res.status(200).json(Chf);
          }
        });
      });
  });
};

//Delete
const chefDeleteOne = (req, res) => {
  getChef(req, res, (req, res, chefName) => {
    const { chefid } = req.params;
    if (chefid) {
      Chf.findByIdAndRemove(chefid).exec((err, chef) => {
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
  });
};

module.exports = {
  chefCreate,
  chefGetAll,
  chefReadOne,
  chefUpdateOne,
  chefDeleteOne,
};

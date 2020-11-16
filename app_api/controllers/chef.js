const mongoose = require('mongoose');
const Chf = mongoose.model('chef');

//Create

const chefCreate = (req, res) => {  
    Chf.create({
        chefName: req.body.chefName
    },
    (err, chef) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(chef);
            }
    });
};

//Read

const chefGetAll = (req, res) => {
  console.log('fetching API method chefGetAll');
    Chf.find({})
    .exec((err, chef) => {
      if (!chef) {
        return res
          .status(404)
          .json({
            "message": "Chef not found"
          });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {
          console.log('chef test', chef)
        return res
          .status(200)
          .json(chef);
      }
    });
};

const chefReadOne = (req, res) => {
  console.log('fetching API method chefReadOne');
    Chf
      .findById(req.params.chefid)
      .exec((err, chef) => {
        if (!chef) {
          return res
            .status(404)
            .json({
              "message": "Chef not found"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        } else {
          console.log('API Method chefReadOne: fetching chef', chef);
          return res
            .status(200)
            .json(chef);
        }
      });
 };

//Update

const chefUpdateOne = (req, res) => { 
    if (!req.params.chefid) {
        return res
            .status(404)
            .json({
                "message": "Not found, chefid is required"
            });
    }
    Chf
        .findById(req.params.chefid)
        .select('chef')
        .exec((err, chef) => {
        if (!chef) {
            return res
            .status(404)
            .json({
                "message": "chefid not found"
            });
        } else if (err) {
            return res
            .status(400)
            .json(err);
        }
        chef.chefName = req.body.chefName;
        chef.save((err, Chf) => {
            if (err) {
            res
                .status(404)
                .json(err);
            } else {
            res
                .status(200)
                .json(Chf);
            }
        });
        }
  );
 };

//Delete
const chefDeleteOne = (req, res) => {  
    const {chefid} = req.params;
    if (chefid) {
        Chf
        .findByIdAndRemove(chefid)
        .exec((err, chef) => {
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
    chefCreate,
    chefGetAll,
    chefReadOne,
    chefUpdateOne,
    chefDeleteOne
};
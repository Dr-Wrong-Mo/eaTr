const mongoose = require('mongoose');
const Chf = mongoose.model('Chefs');

const getChef = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    Chf.findOne({ email: req.payload.email }).exec((err, chef) => {
      if (!chef) {
        return res.status(404).json({ message: 'Chef not found' });
      } else if (err) {
        console.log(err);
        return res.status(404).json(err);
      }
      callback(req, res, chef.chefName);
    });
  } else {
    return res.status(404).json({ message: 'Chef not found' });
  }
};

module.exports = { getChef };

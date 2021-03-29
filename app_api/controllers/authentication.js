const passport = require('passport');
const mongoose = require('mongoose');
const Chef = mongoose.model('Chefs');

const register = (req, res) => {
  if (!req.body.chefName || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields requred' });
  }
  const chef = new Chef();
  chef.chefName = req.body.chefName;
  chef.email = req.body.email;
  chef.setPassword(req.body.password);
  chef.save((err) => {
    if (err) {
      res.status(404).json(err);
    } else {
      const token = chef.generateJwt();
      res.status(200).json({ token });
    }
  });
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  passport.authenticate('local', (err, chef, info) => {
    let token;
    if (err) {
      return res.status(404).json(err);
    }
    if (chef) {
      token = chef.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login,
};

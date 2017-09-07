const { Users } = require('../models/models');

exports.getUserByUsername = (req, res) => {
  Users.findOne({ username: req.params.username })
    .then((user) => {
      if (user.length === 0) res.status(404).json({ message: 'no articles ah ah ah!' });
      res.status(200).json({
        user,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

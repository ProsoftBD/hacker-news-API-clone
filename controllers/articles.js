const { Articles } = require('../models/models');

exports.getArticles = (req, res) => {
  Articles.find()
    .then((articles) => {
      if (articles.length === 0) res.status(404).json({ message: 'no articles ah ah ah!' });
      res.json({
        articles,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

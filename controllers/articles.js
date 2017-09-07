const { Articles, Comments } = require('../models/models');

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

exports.getArticleComments = (req, res) => {
  Comments.find({ belongs_to: req.params.article_id })
    .then((comments) => {
      if (comments.length === 0) res.status(404).json({ message: 'no comments ah ah ah!' });
      res.status(200).json({
        comments,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

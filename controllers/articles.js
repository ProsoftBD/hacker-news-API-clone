/* eslint-disable comma-dangle */
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

exports.putAlterVotes = (req, res) => {
  let voteValue = -1;
  if (req.query.vote === 'up') voteValue = 1;

  Articles.findOneAndUpdate(
    { _id: req.params.article_id },
    { $inc: { votes: `${voteValue}` } },
    { new: true }
  )
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

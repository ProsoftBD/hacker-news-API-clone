const { Topics, Articles } = require('../models/models');

exports.getTopics = (req, res) => {
  Topics.find()
    .then((topics) => {
      if (topics.length === 0) {
        res.status(404).json({ message: "Sorry, couldn't find any topics :(" });
      }
      res.json({ topics });
    })
    .catch((rej) => {
      rej.status(500);
    });
};

exports.getArticlesByTopic = (req, res) => {
  Articles.find()
    .then(articles => articles.filter(elem => elem.belongs_to === req.params.topic_id))
    .then((articles) => {
      if (articles.length === 0) res.status(404).json({ message: 'no articles ah ah ah!' });
      res.json({
        articles,
      });
    })
    .catch((err) => {
      err.status(500);
    });
};

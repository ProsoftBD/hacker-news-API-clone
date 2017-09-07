const routes = require('express').Router();
const { Topics, Articles } = require('../controllers/');

const Base = (req, res) => {
  res.status(200).send('<h1>Routes available:</h1>');
};

routes.get('/', Base);
routes.get('/topics', Topics.getTopics);
routes.get('/topics/:topic_id/articles', Topics.getArticlesByTopic);
routes.get('/articles', Articles.getArticles);

module.exports = routes;

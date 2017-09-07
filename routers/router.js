const routes = require('express').Router();
const { Topics, Articles, Users, Comments } = require('../controllers/');

const Base = (req, res) => {
  res.status(200).send('<h1>Routes available:</h1>');
};

routes.get('/', Base);
routes.get('/topics', Topics.getTopics);
routes.get('/topics/:topic_id/articles', Topics.getArticlesByTopic);
routes.get('/articles', Articles.getArticles);
routes.get('/articles/:article_id/comments', Articles.getArticleComments);
routes.get('/users/:username', Users.getUserByUsername);
routes.put('/articles/:article_id', Articles.putAlterVotes);
routes.put('/comments/:comment_id', Comments.putAlterVotes);

module.exports = routes;

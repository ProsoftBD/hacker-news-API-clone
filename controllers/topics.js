const { Topics } = require('../models/models');

exports.getTopics = (req, res) => {
  Topics.find()
    .then((topics) => {
      if (!topics.length) {
        return res.status(404).json({ message: "Sorry, couldn't find any topics :(" });
      }
      return res.json({
        topics,
      });
    })
    .catch((rej) => {
      rej.status(500);
    });
};

/* eslint-disable comma-dangle */

const { Comments } = require('../models/models');

exports.putAlterVotes = (req, res) => {
  let voteValue = -1;
  if (req.query.vote === 'up') voteValue = 1;

  Comments.findOneAndUpdate(
    { _id: req.params.comment_id },
    { $inc: { votes: `${voteValue}` } },
    { new: true }
  )
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

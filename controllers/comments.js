/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */

const { Comments } = require('../models/models');

exports.putAlterVotes = (req, res) => {
  let voteValue = 0;
  if (req.query.vote === 'up') voteValue = 1;
  if (req.query.vote === 'down') voteValue = -1;

  Comments.findOneAndUpdate(
    { _id: req.params.comment_id },
    { $inc: { votes: voteValue } },
    { new: true }
  )
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.deleteComment = (req, res) => {
  if (req.query.user === 'northcoder') {
    Comments.findByIdAndRemove({ _id: req.params.comment_id })
      .then((comment) => {
        res.status(200).json({
          message: `The comment with id: ${comment._id} has been removed`,
          deletedComment: comment,
        });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  } else {
    res.status(403).json('Invalid username!');
  }
};

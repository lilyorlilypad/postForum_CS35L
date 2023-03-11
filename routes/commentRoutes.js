const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');

// Route for getting all comments
router.get('/post/:postId/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments', { comments: comments });
    }
  });
});

// Route for adding new comment
router.post('/post/:postId/comments', (req, res) => {
  const newComment = new Comment({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    postId: req.params.postId
  });

  newComment.save((err, comment) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Comment Saved');
      res.redirect('/post/${req.params.postId');
    }
  });
});

module.exports = router;

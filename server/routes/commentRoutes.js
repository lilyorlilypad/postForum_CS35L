const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/commentModel');

// Route for getting all comments
router.get('/post/:pId', async (req, res) => {
  //Comment.find({}, (err, comments) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('An error occurred while retrieving comments');
//     } else {
//       res.render('comments', { comments: comments });
//     }
//   });
    try{
        const comments = await Comment.find({postId: req.params.postId});
        res.status(200).json(comments);
    } catch (error){
        console.log(error);
        res.status(500).send('An error occured while retrieving comments')
    }
});

// Route for adding new comment
router.post('/post/:pId', async (req, res) => {
  const newComment = new Comment({
    commenter: req.body.commenter,
    message: req.body.description,
    postId: req.params.postId,
  });

  try{
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while saving the comment');
  }
//   newComment.save((err, comment) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Comment Saved');
//       res.redirect('/post/${req.params.postId');
//     }
//   });
});

module.exports = router;

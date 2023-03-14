const mongoose = require('mongoose');

//define a schema for the comments
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'A comment must have text'],
        maxlength: [1000, 'A comment text must have less or equal then 1000 characters'],
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: true
      }
  });
  
  //Create a mongoose model for the comments
  const Comment = mongoose.model('Comment', commentSchema);

  module.exports = Comment;
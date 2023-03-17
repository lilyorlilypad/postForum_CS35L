const path = require('path');
const multer = require('multer');
post = require('./../models/postModel');
const postController = require('./postController');


exports.base = (req, res) => {
    res.sendFile(path.resolve('./resources/index.html'));
};

exports.search = async(req, res) => {
    console.log("Search route called");
    data = req.body;
    console.log("Here is the data: " + data);
    try
    {
      response = await post.find().exec();
      const formatted_response = JSON.stringify(response, null, 2);
      res.send(formatted_response);
    }

    catch(err)
    {
      res.status(500).send(err);
    }
    
}

exports.searchPage = (req, res) => {
  res.sendFile(path.resolve("./public/overview.html"));
}

exports.post = (req, res) => {
    res.sendFile(path.resolve("./resources/post.html"));
}

exports.suggestion_page = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
        });
};

exports.query_page = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
        });
};

//create a new post
exports.createPost = async (req, res, next) => {
    const data = req.body;
    console.log(req.body);
    const newPost = new post({

      title: data.name,
      summary: data.summary,
      price: data.price,
      userEmail: data.userEmail,
      numberOfLikes: 0,
    })
  
    try
    {
      const savedPost = await newPost.save();
      res.send("Post saved");
    }
  
    catch(err)
    {
      res.status(500).send(err);
    }
  }

  //receive, save, and associate received images
  exports.receiveImg = async(req, res, next) => {
    try{
      console.log(req.file);
      const document = await post.findOne().sort({_id:-1}).exec();
      if (!post) {
        return res.status(404).send('No posts found');
      }
      document.images.push({ data: req.file.buffer, contentType: req.file.mimetype });
      const updatedPost = await document.save();
      console.log(updatedPost);
      res.json(updatedPost);
    } catch (err){
      console.error(err);
      res.status(500).send('Server error');
    }
  }

  exports.receiveComment = async(req, res, next) => {
    try{
      console.log(req.body);
      let id = req.body.id;
      let comment_string = req.body.comment;
      const document = await post.findOne({_id: id}).exec();
      if (!post) {
        return res.status(404).send('No posts found.');
      }
      document.comments.push(comment_string);
      const updatedPost = await document.save();
      console.log(updatedPost);
      res.json(updatedPost);
    } catch (err){
      console.error(err);
      res.status(500).send('Server error. Comment not pushed.');
    }
  }

  exports.addLike = async(req, res, next) => {
    try{
      console.log(req.body);
      let id = req.body.id;
      const document = await post.findOne({_id: id}).exec();
      if (!post) {
        return res.status(404).send('No posts found.');
      }
      document.numberOfLikes = document.numberOfLikes+1;
      const updatedPost = await document.save();
      console.log(updatedPost);
      res.json(updatedPost);
    } catch (err){
      console.error(err);
      res.status(500).send('Server error. Comment not pushed.');
    }
  }

  exports.minusLike = async(req, res, next) => {
    try{
      console.log(req.body);
      let id = req.body.id;
      const document = await post.findOne({_id: id}).exec();
      if (!post) {
        return res.status(404).send('No posts found.');
      }
      document.numberOfLikes = document.numberOfLikes-1;
      const updatedPost = await document.save();
      console.log(updatedPost);
      res.json(updatedPost);
    } catch (err){
      console.error(err);
      res.status(500).send('Server error. Comment not pushed.');
    }
  }
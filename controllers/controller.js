const path = require('path');
post = require('./../models/postModel');
const postController = require('./postController');


exports.base = (req, res) => {
    //serve static index HTML file
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
    const newPost = new post({
      name: data.name,
      summary: data.summary,
      description: data.description,
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
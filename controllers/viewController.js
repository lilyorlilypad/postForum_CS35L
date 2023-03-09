/* view controller is expected to be used to fetch HTML
templates from server */

const path = require('path');
const postController = require('./postController');


exports.base = (req, res) => {
    //serve static index HTML file
    res.sendFile(path.resolve('./resources/index.html'));

};

exports.search = (req, res) => {
    //res.send("Calling search route.");
    res.send(req);
    res.send(postController.getAllposts(req,res));
}

exports.post = (req, res) => {
    //res.send("Calling search route.");
    res.sendFile(path.resolve("./resources/post.html"));
    //res.send(postController.getAllposts(req,res));
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
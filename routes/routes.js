const express = require('express');
const router = express.Router();
const path = require('path');

//link controllers
const userController = require('../controllers/userController.js');
const viewController = require('../controllers/viewController.js');
const postController = require('../controllers/postController.js');


router
  .route('/')
  .get(viewController.base);
  //.get(userController.getAllUsers)
  //.post(userController.createUser);


router
  .route('/search')
  .post(viewController.search);

router
  .route('/post')
  .get(viewController.post);

router
  .route('/createPost')
  .post(postController.createPost);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

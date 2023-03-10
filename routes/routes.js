const express = require('express');
const router = express.Router();
const path = require('path');

//link controllers
const userController = require('../controllers/userController.js');
const controller = require('../controllers/controller.js');
const postController = require('../controllers/postController.js');


router
  .route('/')
  .get(controller.base);
  //.get(userController.getAllUsers)
  //.post(userController.createUser);


router
  .route('/search')
  .get(controller.searchPage);

router
  .route('/query')
  .get(controller.search);

router
  .route('/post')
  .get(controller.post);

router
  .route('/createPost')
  .post(controller.createPost);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

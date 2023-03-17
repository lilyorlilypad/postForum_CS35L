const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

//link controllers
const userController = require('../controllers/userController.js');
const controller = require('../controllers/controller.js');
const postController = require('../controllers/postController.js');

upload = multer();


router
  .route('/')
  .get(controller.base);
  //.get(userController.getAllUsers)
  //.post(userController.createUser);


router
  .post('/api/upload', upload.single('file'), controller.receiveImg)

router
  .post('/api/newComment', controller.receiveComment);

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

router
  .route('/api/addLike')
  .post(controller.addLike);

router
  .route('/api/minusLike')
  .post(controller.minusLike);

module.exports = router;

const express = require('express');
const postController = require('../controllers/postController');
const authController = require('./../controllers/authController');
const router = express.Router();



router
  .route('/top-5-cheap')
  .get(postController.aliasTopposts, postController.getAllposts);

router.route('/post-stats').get(postController.getpostStats);

router.route('/monthly-plan/:year').get(postController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, postController.getAllposts);
  //.post(postController.createpost);

router
  .route('/:id')  
  .get(postController.getpost)
  .patch(postController.updatepost)
  .delete(postController.deletepost);

module.exports = router;

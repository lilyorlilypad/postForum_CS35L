const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// router.param('id', postController.checkID);

router
  .route('/top-5-cheap')
  .get(postController.aliasTopposts, postController.getAllposts);

router.route('/post-stats').get(postController.getpostStats);
router.route('/monthly-plan/:year').get(postController.getMonthlyPlan);

router
  .route('/')
  .get(postController.getAllposts)
  .post(postController.createpost);

router
  .route('/:id')
  .get(postController.getpost)
  .patch(postController.updatepost)
  .delete(postController.deletepost);

module.exports = router;

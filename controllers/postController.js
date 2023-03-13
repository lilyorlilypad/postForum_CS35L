const post = require('./../models/postModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.aliasTopposts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllposts = catchAsync(async (req, res, next) => {
  
  const features = new APIFeatures(post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  const posts = await features.query;
  // SEND RESPONSE

  post.find()

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts
    }
  });
});

exports.getpost = catchAsync(async(req, res, next) => {

    const post = await post.findById(req.params.id);

    if (!post) {
      return next(new AppError('No tour found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post
      }
  });
});


exports.updatepost = catchAsync(async (req, res, next) => {
    const post = await post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!post){
      return next(new AppError('No Post Found with id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });

});

exports.deletepost = catchAsync(async (req, res) => {
  const post = await post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError('No Post Found with id', 404));
  };

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getpostStats = catchAsync(async (req, res, next) => {
  const stats = await post.aggregate([
    {
     $match: { ratingsAverage: { $gte: 4.5 } }
    },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numposts: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; // 2021

    const plan = await post.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numpostStarts: { $sum: 1 },
          posts: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numpostStarts: -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
});

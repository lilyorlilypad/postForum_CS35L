const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const cors = require('cors');

const bodyParser = require('body-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController.js');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const router = require('./routes/routes');
const session = require('express-session');


const app = express();

//specify folder with static resources
app.use(express.static('resources/'));

// 1) Global MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: false }
}));


const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
})
app.use('/api',limiter);



app.use(cors());

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/posts', postRouter);
app.use('/', router);
app.use('/search', router);
app.use('/post', router);
app.use('/createPost', router);
app.use('/query', router);
app.use('/api/v1/users', userRouter);

app.use('/api/upload', router);
app.use('/api/newComment', router);

app.use('/api/addLike', router);


/*
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalurl} on this server`
  // });
  const err = new Error(`Can't find ${req.originalurl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});
*/

//middleware -> error handling
//app.use(globalErrorHandler);

//comment feature
app.use(express.static(path.join(__dirname, 'public')));


// Error Handler for 404 Pages
app.use(function(req, res, next) {
  var error404 = new Error('Route Not Found');
  error404.status = 404;
  next(error404);
});



//to connect with frontend
//addEventListener.get
module.exports = app;


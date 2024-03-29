const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const session = require('express-session');
//const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};


const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    path: '/',
    secure: false
  };
  //if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  console.log('the produced token is: ', token)
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};


exports.signup = catchAsync(async (req, res, next) => {
  try{
  const newUser = await User.create({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role
  });
    await new Promise(resolve => req.session.save(resolve));
    //console.log ("req.session", req.session)
    createSendToken(newUser,201,res);

  console.log('the stored cookie token is: ')
  console.log(res.getHeaders()['set-cookie'])
  
} catch (err){
  console.log(err)
  res.status(400).json({
    status:'fail',
    message: err.message
  })
}

});






  exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      //return next(new AppError('Please provide email and password!', 400));
      res.status(400).json({
        status:'failure',
      });
    };

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      //return next(new AppError('Incorrect email or password', 401));
      res.status(40 ).json({
        status:'failure',
      });
    }
  
    // 3) If everything ok, send token to client
  //if ok, send token to client
  await new Promise(resolve => req.session.save(resolve));
  //console.log ("req.session for user login is ", req.session);
  //console.log ("req.session useName is ", req.session.userName);
  const token = signToken(user._id);
  console.log('the produced token is: ', token)

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    path: '/',
    secure: false
  };

  res.cookie('jwt', token, cookieOptions)

console.log('the stored cookie token is: ')
console.log(res.getHeaders()['set-cookie'])
  res.status(200).json({
    status:'success',
    token
  });
});


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
 

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin']
    //req.user.role-> role of the current user
    if (!roles.includes(req.user.role)) {
      console.log('roles: ',roles)
      console.log('role: ',req.user.role)
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};




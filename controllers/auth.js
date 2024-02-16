const jwt  = require('jsonwebtoken');
const User = require('../models/userModel');



const requestAccess = async (req, res, next) => {
  try {
    // 1) Get token from the header
    const token = req.headers.authorization.split(' ')[1];
    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.'
      });
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'fail',
        message: 'User recently changed password! Please log in again.'
      });
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    console.log('error', error);
    res.status(401).json({
      status: 'fail',
      message: 'Not authorized to access this route'
    });
  }
};




module.exports = requestAccess;
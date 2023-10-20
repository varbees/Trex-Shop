import jwt from 'jsonwebtoken';
import asyncHanlder from './asyncHandler.js';
import User from '../models/userModel.js';
import { __secret__ } from '../config/constants.js';

const protect = asyncHanlder(async (req, res, next) => {
  let token;
  //get token from cookie named jwt in auth controller
  token = req.cookies.jwt;
  if (token) {
    try {
      const { userId } = jwt.verify(token, __secret__);
      req.user = await User.findById(userId).select('-password');
      next();
    } catch (err) {
      res.status(401);
      throw new Error(`Not Authorized - Token Failed`);
    }
  } else {
    res.status(401);
    throw new Error(`Not Authorized - No Token`);
  }
});

//admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error(`Not Authorized As Admin`);
  }
};

export { protect, admin };

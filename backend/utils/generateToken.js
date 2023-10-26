import jwt from 'jsonwebtoken';
import { __secret__, __prod__ } from '../config/constants.js';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, __secret__, {
    expiresIn: __prod__ ? '1d' : '30d',
  });

  //Set JWT as HTTP-Only Cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: __prod__,
    sameSite: 'strict',
    maxAge: __prod__ ? 1 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;

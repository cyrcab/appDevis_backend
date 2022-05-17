const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  const { id, mail, password } = user;
  const token = jwt.sign({ id, mail, password }, secret, { expiresIn: '15m' });
  return token;
};

const auth = expressJWT({ secret, algorithms: ['HS256'] });

module.exports = { generateToken, auth };

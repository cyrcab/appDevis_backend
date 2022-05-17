const jwt = require('jsonwebtoken');
var { expressjwt } = require('express-jwt');

const secret = process.env.JWT_SECRET;

const auth = expressjwt({ secret, algorithms: ['HS256'] });

const generateToken = (user) => {
  const { id, mail, password } = user;
  const token = jwt.sign({ id, mail, password }, secret, { expiresIn: '15m' });
  return token;
};

module.exports = { generateToken, auth };

import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';

const secret = process.env.JWT_SECRET;

const auth = expressjwt({ secret, algorithms: ['HS256'] });

const generateToken = (user) => {
  const { id, mail, password } = user;
  const token = jwt.sign({ id, mail, password }, secret, { expiresIn: '15m' });
  return token;
};

export { generateToken, auth };

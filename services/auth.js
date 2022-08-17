import jwt from 'jsonwebtoken';
import { hashPassword, verifyPassword } from '../services/hashPassword.js';
import formatDate from '../helpers/formatDate.js';
import prisma from '../helpers/prismaClient.js';
const secret = process.env.JWT_SECRET;

export const newToken = (user, expiresIn) => {
  return jwt.sign({ id: user.id, mail: user.mail, password: user.password }, secret, {
    expiresIn: `${expiresIn}`,
  });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

export const signup = async (req, res, next) => {
  if (!req.body.mail || !req.body.password) {
    return res.status(400).send({ message: 'email and password required' });
  }

  const newDate = formatDate(new Date());
  try {
    const password = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        ...req.body,
        mail: req.body.mail,
        password: password,
        created_at: newDate,
      },
    });
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (error) {
    if (error.meta.target === 'mail_UNIQUE') {
      return res.status(409).send({ message: 'Cet utilisateur existe déjà' });
    }
    next(error);
    return res.status(500).end();
  }
};

export const signin = async (req, res, next) => {
  if (!req.body.mail || !req.body.password) {
    return res.status(400).send({ message: 'email and password required' });
  }

  const invalid = { message: 'Invalid email and passoword combination' };

  try {
    const user = await prisma.user.findUnique({
      where: {
        mail: req.body.mail,
      },
    });

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await verifyPassword(req.body.password, user.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const accessToken = newToken(user, '30s');
    const refreshToken = newToken(user, '30d');

    const storedRefreshToken = await prisma.refreshToken.upsert({
      create: {
        token: refreshToken,
        user: {
          connect: { id: user.id },
        },
      },
      update: {
        token: refreshToken,
      },
      where: { user_id: user.id },
    });

    if (!storedRefreshToken) {
      return res.status(500).end();
    }

    const lastLogin = formatDate(new Date());
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        last_login: lastLogin,
      },
    });

    delete user.password;

    return res.status(201).json({ user: user, accessToken, refreshToken });
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (error) {
    next(error);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    return res.status(401).end();
  }

  delete user.password;

  req.user = user;
  next();
};

export const checkUserRole = (req, res, next) => {
  if (req.user.role_id !== 1 && req.user.role_id !== 2) {
    return res.status(401).send({ message: "Vous n'avez pas l'autorisation" });
  }
  next();
};

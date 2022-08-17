import prisma from '../helpers/prismaClient.js';
import { newToken } from '../services/auth.js';

export async function refreshToken(req, res, next) {
  const { refreshToken } = req.body;

  try {
    const token = await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!token) {
      return res.status(401).json({ message: 'invalid token' });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: token.user_id,
      },
    });

    if (!existingUser) {
      return res.status(401).json({
        message: 'invalid token',
      });
    }

    const newAcessToken = newToken(existingUser, '15m');

    return res.status(200).json({ accessToken: newAcessToken });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Raffraichissement du token impossible' });
  }
}

export async function revokeToken(req, res, next) {
  const { refreshToken } = req.body;

  try {
    const token = await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!token) {
      return res.status(401).json({ message: 'invalid token' });
    }

    const tokenToRevoque = await prisma.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });

    if (!tokenToRevoque) return res.status(401).end();

    return res.status(200).send('Déconnexion réussie');
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

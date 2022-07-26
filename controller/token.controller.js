import prisma from '../helpers/prismaClient.js';
import { newToken, verifyToken } from '../services/auth.js';

export async function refreshToken(req, res, next) {
  const { refreshToken } = req.body;

  try {
    const user = await prisma.token.findUnique({
      where: {
        refreshToken: refreshToken,
      },
      select: {
        user_id: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'invalid token',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.user_id,
      },
    });

    if (!existingUser) {
      return res.status(401).json({
        message: 'invalid token',
      });
    }

    const payload = await verifyToken(refreshToken);

    if (new Date(payload.exp * 1000) < new Date(Date.now())) {
      return res.status(403).json({ message: 'Merci de vous reconnecter' });
    }

    const token = newToken(existingUser);
    return res.status(200).json({ accessToken: token, userId: existingUser.id });
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

export async function deleteToken(req, res, next) {
  const refreshToken = req.params.token;

  try {
    const existingToken = await prisma.token.findUnique({
      where: {
        refreshToken: refreshToken,
      },
    });

    if (!existingToken) {
      return res.status(400).end();
    }

    const deletedToken = await prisma.token.delete({
      where: {
        id: existingToken.id,
      },
    });

    if (!deletedToken) {
      return res.status(400).end();
    }

    return res.status(200).json({ deleted: true });
  } catch (error) {
    next(error);
    console.error(error);
    return res.status(500).end();
  }
}

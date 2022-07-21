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
      console.log('Date dépassée');
      return res.status(403).json({ message: 'Merci de vous reconnecter' });
    }

    const token = newToken(existingUser);
    return res.status(200).json({ accessToken: token });
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

import prisma from '../helpers/prismaClient';
import formatDate from '../helpers/formatDate';

export async function createFile(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const fileToCreate = await prisma.file.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
    });
    if (!fileToCreate) {
      return res.status(400).end();
    }
    return res.status(201).json({ data: fileToCreate });
  } catch (e) {
    next(e);
    return res.status(500).end();
  }
}

export async function getManyFile(req, res, next) {
  try {
    const list = await prisma.file.findMany({
      take: 10,
    });
    if (list.length >= 0) {
      return res.status(200).json({ data: list });
    } else {
      return res.status(400).end();
    }
  } catch (e) {
    next(e);
    return res.status(500).end();
  }
}

export async function deleteFile(req, res, next) {
  try {
    const { id } = req.params;
    const file = await prisma.file.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (file) {
      const file = await prisma.estimate.delete({
        where: {
          id: parseInt(id),
        },
      });
      if (file) {
        return res.status(200).json({ data: file });
      } else {
        return res.status(400).end();
      }
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    next(e);
    return res.status(500).end();
  }
}

export async function updateFile(req, res, next) {
  try {
    const { id } = req.params;
    const file = await prisma.file.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (file) {
      const fileUpdated = await prisma.file.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...req.body,
        },
      });
      if (fileUpdated) {
        return res.status(200).json({ data: fileUpdated });
      } else {
        return res.status(400).end();
      }
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    next(e);
    return res.status(500).end();
  }
}

import prisma from '../helpers/prismaClient.js';
import formatDate from '../helpers/formatDate';

async function handleCreatePack(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.user_id,
      },
    });
    const userName = user.firstName + ' ' + user.lastName;
    const packToCreate = await prisma.pack.create({
      data: {
        ...req.body,
        created_at: dateCreation,
        created_by: userName,
      },
    });

    if (packToCreate) {
      res.status(201).json(packToCreate);
    } else {
      res.status(404).json({ message: 'error when creating pack' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
    next(error);
  }
}

async function handleGetAllPacks(req, res, next) {
  try {
    const listOfPack = await prisma.pack.findMany();
    res.status(200).json(listOfPack);
  } catch (error) {
    res.status(500).json({ error: error });
    console.error(error);
    next(error);
  }
}

async function handleGetUniquePack(req, res, next) {
  try {
    const { id } = req.params;
    const pack = await prisma.pack.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (pack) {
      res.status(200).json(pack);
    } else {
      res.status(404).json({ message: `no pack found with id : ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
    next(error);
  }
}

async function handleDeletePack(req, res, next) {
  try {
    const { id } = req.params;
    const pack = await prisma.pack.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (pack) {
      await prisma.pack.delete({
        where: { id: pack.id },
      });
      res.status(200).json({
        message: `pack with id : ${id} correctly deleted`,
      });
    } else {
      res.status(404).json({
        message: `pack with id : ${id} does not exist`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
    next(error);
  }
}

async function handleUpdatePack(req, res, next) {
  try {
    const updateDate = formatDate(new Date());
    const { id } = req.params;
    const dataToUpdate = req.body;
    const pack = await prisma.pack.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.user_id,
      },
    });
    const userName = user.firstName + ' ' + user.lastName;
    if (pack) {
      const updatedPack = await prisma.pack.update({
        where: { id: pack.id },
        data: {
          ...dataToUpdate,
          updated_at: updateDate,
          updated_by: userName,
        },
      });
      res.status(200).json({ message: 'pack updated', pack: { ...pack, ...updatedPack } });
    } else {
      res.status(404).json({
        message: `pack with id : ${id} does not exist`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.error(error);
    next(error);
  }
}

export {
  handleGetAllPacks,
  handleCreatePack,
  handleGetUniquePack,
  handleDeletePack,
  handleUpdatePack,
};

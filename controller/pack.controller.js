import prisma from '../helpers/prismaClient.js';
import formatDate from '../helpers/formatDate';
import calculPriceAndUpdate from '../services/priceCalcul';

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
      include: {
        file: {
          include: {
            pack: true,
          },
        },
      },
    });

    if (!packToCreate) {
      return res.status(404).json({ message: 'error when creating pack' });
    }

    if (packToCreate.file_id) {
      const priceUpdated = await calculPriceAndUpdate(
        packToCreate.file_id,
        packToCreate.file.pack,
        packToCreate.file.reduction
      );

      if (!priceUpdated) {
        return res.status(400).json({ message: 'An error occurred while updating file price' });
      }
    }

    return res.status(201).json({ data: packToCreate });
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

async function handleGetAllPacks(req, res, next) {
  try {
    const listOfPack = await prisma.pack.findMany();
    return res.status(200).json({ data: listOfPack });
  } catch (error) {
    next(error);
    return res.status(500).end();
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
    if (!pack) {
      return res.status(404).json({ message: `no pack found with id : ${id}` });
    }
    return res.status(200).json(pack);
  } catch (error) {
    next(error);
    return res.status(500).json({ error: error });
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

    if (!pack) {
      res.status(404).json({
        message: `pack with id : ${id} does not exist`,
      });
    }

    const packToDelete = await prisma.pack.delete({
      where: { id: pack.id },
    });
    if (!packToDelete) {
      return res.status(400).end();
    }
    return res.status(200).json({
      message: `pack with id : ${id} correctly deleted`,
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: error });
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

    if (!pack) {
      return res.status(404).json({
        message: `pack with id : ${id} does not exist`,
      });
    }
    const updatedPack = await prisma.pack.update({
      where: { id: pack.id },
      data: {
        ...dataToUpdate,
        updated_at: updateDate,
        updated_by: userName,
      },
    });

    if (!updatedPack) {
      return res.status(400).end();
    }
    return res.status(200).json({ data: { ...pack, ...updatedPack } });
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

export {
  handleGetAllPacks,
  handleCreatePack,
  handleGetUniquePack,
  handleDeletePack,
  handleUpdatePack,
};

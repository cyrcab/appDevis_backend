import prisma from '../helpers/prismaClient.js';
import formatDate from '../helpers/formatDate.js';
import {
  getBillIdentificationNumber,
  getEstimateIdentificationNumber,
} from '../helpers/getIdentificationNumber.js';
import calculPriceAndUpdate from '../services/priceCalcul.js';

export async function createFile(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const billIdentificationNumber = await getBillIdentificationNumber(dateCreation);
    const estimateIdentificationNumber = await getEstimateIdentificationNumber(dateCreation);
    let fileToCreate;

    const { user_id } = req.body;
    // search the user who is creating this file
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    const userName = user.firstName + ' ' + user.lastName;

    fileToCreate = await prisma.file.create({
      data: {
        ...req.body,
        created_at: dateCreation,
        created_by: userName,
        identification_number:
          req.body.type === 'bill' ? billIdentificationNumber : estimateIdentificationNumber,
      },
      include: {
        pack: true,
      },
    });
    if (!fileToCreate) {
      return res.status(400).end();
    }

    // on regarde si la liste que l'on créé contient des pack lors de la création
    // pour mettre à jour le prix total du fichier
    if (fileToCreate.pack[0]) {
      const priceUpdated = await calculPriceAndUpdate(
        fileToCreate.id,
        fileToCreate.pack,
        fileToCreate.reduction
      );
      if (!priceUpdated) {
        return res.status(400).end();
      }
    }

    return res.status(201).json(fileToCreate);
  } catch (e) {
    next(e);
    return res.status(500).end();
  }
}

export async function getUniqFile(req, res, next) {
  try {
    const { id } = req.params;
    const file = await prisma.file.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        pack: true,
      },
    });
    if (!file) {
      return res.status(404).end();
    }
    return res.status(200).json(file);
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

export async function getManyFile(req, res, next) {
  try {
    const list = await prisma.file.findMany({
      take: 10,
      include: {
        customer: true,
        pack: true,
      },
    });
    if (list.length >= 0) {
      return res.status(200).json(list);
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
      const fileToDelete = await prisma.file.delete({
        where: {
          id: parseInt(id),
        },
      });
      if (fileToDelete) {
        return res.status(200).json(file);
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
      include: {
        pack: true,
      },
    });
    if (file) {
      const fileUpdated = await prisma.file.update({
        where: {
          id: parseInt(id),
        },
        include: {
          pack: true,
        },
        data: {
          ...req.body,
        },
      });

      if (!fileUpdated) {
        return res.status(400).end();
      }

      let priceUpdated = await calculPriceAndUpdate(
        fileUpdated.id,
        fileUpdated.pack,
        fileUpdated.reduction
      );

      if (!priceUpdated) {
        return res.status(400).end();
      }

      return res.status(200).json(fileUpdated);
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    next(e);
    return res.status(500).end();
  }
}

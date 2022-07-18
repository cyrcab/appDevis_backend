import prisma from '../helpers/prismaClient';
import formatDate from '../helpers/formatDate';
import {
  getBillIdentificationNumber,
  getEstimateIdentificationNumber,
} from '../helpers/getIdentificationNumber';

export async function createFile(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const billIdentificationNumber = await getBillIdentificationNumber(dateCreation);
    const estimateIdentificationNumber = await getEstimateIdentificationNumber(dateCreation);
    let fileToCreate;
    fileToCreate = await prisma.file.create({
      data: {
        ...req.body,
        created_at: dateCreation,
        identification_number:
          req.body.type === 'bill' ? billIdentificationNumber : estimateIdentificationNumber,
      },
      include: {
        pack: true,
      },
    });

    let priceHt = 0;
    let priceTtc = 0;
    if (fileToCreate.pack[0]) {
      priceHt = fileToCreate.pack.reduce((acc, cur) => acc + cur.price_ht, 0);
      priceTtc = priceHt + priceHt * 0.2 - fileToCreate.reduction;
    }
    if (priceHt !== 0 && priceTtc !== 0) {
      fileToCreate = await prisma.file.update({
        where: {
          id: fileToCreate.id,
        },
        data: {
          price_ht: priceHt,
          price_ttc: priceTtc,
        },
      });
    }
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
      const file = await prisma.file.delete({
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

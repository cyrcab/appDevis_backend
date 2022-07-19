import prisma from '../helpers/prismaClient';
import calculPriceAndUpdate from './priceCalcul';

export const addPackPriceAndUpdate = async (pack, option) => {
  const packUpdated = await prisma.pack.update({
    where: {
      id: pack.id,
    },
    data: {
      price_ht: pack.price_ht + option.price_ht,
      price_ttc: pack.price_ttc + option.price_ttc,
    },
    include: {
      file: {
        select: {
          pack: true,
          reduction: true,
        },
      },
    },
  });

  if (!packUpdated) {
    return false;
  }

  if (packUpdated.file_id) {
    const fileUpdated = calculPriceAndUpdate(
      packUpdated.file_id,
      packUpdated.file.pack,
      packUpdated.file.reduction
    );

    if (!fileUpdated) {
      return false;
    }
  }

  return true;
};

export const substractPriceAndUpdate = async (pack, option) => {
  const packUpdated = await prisma.pack.update({
    where: {
      id: pack.id,
    },
    data: {
      price_ht: pack.price_ht - option.price_ht,
      price_ttc: pack.price_ttc - option.price_ttc,
    },
    include: {
      file: {
        select: {
          pack: true,
          reduction: true,
        },
      },
    },
  });

  if (!packUpdated) {
    return false;
  }

  if (packUpdated.file_id) {
    const fileUpdated = calculPriceAndUpdate(
      packUpdated.file_id,
      packUpdated.file.pack,
      packUpdated.file.reduction
    );

    if (!fileUpdated) {
      return false;
    }
  }

  return true;
};

export const updatePackPriceAndUpdate = async (pack) => {
  const packUpdated = await prisma.pack.update({
    where: {
      id: pack.id,
    },
    data: {
      price_ht: pack.option.reduce((acc, cur) => acc + cur.price_ht, 0),
      price_ttc: pack.option.reduce((acc, cur) => acc + cur.price_ttc, 0),
    },
    include: {
      file: {
        select: {
          pack: true,
          reduction: true,
        },
      },
    },
  });

  if (!packUpdated) {
    return false;
  }

  if (packUpdated.file_id) {
    const fileUpdated = calculPriceAndUpdate(
      packUpdated.file_id,
      packUpdated.file.pack,
      packUpdated.file.reduction
    );

    if (!fileUpdated) {
      return false;
    }
  }

  return true;
};

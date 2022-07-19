import prisma from '../helpers/prismaClient';
import calculPriceAndUpdate from './priceCalcul';

const updateFilePrice = async (pack, option) => {

  const packUpdated = await prisma.pack.update({
    where: {
      id: pack.id,
    },
    data: {
      price_ht: pack.price_ht + option.price_ht,
      price_ttc: pack.price_ttc + (option.price_ht + option.price_ht * 0.2),
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

export default updateFilePrice;

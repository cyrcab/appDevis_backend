import prisma from '../helpers/prismaClient';

const calculPriceAndUpdate = async (fileId, packs, reduction, packIdToDelete) => {
  let priceHt = 0;
  let priceTtc = 0;
  let fileToUpdate;

  if (packs[0]) {
    priceHt = packIdToDelete
      ? packs.filter((el) => el.id !== packIdToDelete).reduce((acc, cur) => acc + cur.price_ht, 0)
      : packs.reduce((acc, cur) => acc + cur.price_ht, 0);
    priceTtc = packIdToDelete
      ? packs
          .filter((el) => el.id !== packIdToDelete)
          .reduce((acc, cur) => acc + cur.price_ttc, 0) - reduction
      : packs.reduce((acc, cur) => acc + cur.price_ttc, 0) - reduction;
  }
  fileToUpdate = await prisma.file.update({
    where: {
      id: fileId,
    },
    data: {
      price_ht: priceHt,
      price_ttc: priceTtc,
    },
  });

  return fileToUpdate;
};

export default calculPriceAndUpdate;

import prisma from '../helpers/prismaClient';

const calculPriceAndUpdate = async (id, packs, reduction) => {
  let priceHt = 0;
  let priceTtc = 0;
  let fileToUpdate;

  if (packs[0]) {
    priceHt = packs.reduce((acc, cur) => acc + cur.price_ht, 0);
    priceTtc = priceHt + priceHt * 0.2 - reduction;
  }
  fileToUpdate = await prisma.file.update({
    where: {
      id: id,
    },
    data: {
      price_ht: priceHt,
      price_ttc: priceTtc,
    },
  });

  return fileToUpdate;
};

export default calculPriceAndUpdate;

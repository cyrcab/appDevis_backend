import prisma from '../helpers/prismaClient';

const calculPriceAndUpdate = async (id, pack, reduction) => {
  let priceHt = 0;
  let priceTtc = 0;
  let fileToUpdate;

  if (pack[0]) {
    priceHt = pack.reduce((acc, cur) => acc + cur.price_ht, 0);
    priceTtc = priceHt + priceHt * 0.2 - reduction;
  }
  if (priceHt !== 0 && priceTtc !== 0) {
    fileToUpdate = await prisma.file.update({
      where: {
        id: id,
      },
      data: {
        price_ht: priceHt,
        price_ttc: priceTtc,
      },
    });
  }

  return fileToUpdate;
};

export default calculPriceAndUpdate;

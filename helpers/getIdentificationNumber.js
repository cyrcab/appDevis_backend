import prisma from './prismaClient';

const getIdentificationNumber = async (dateCreation) => {
  const dateMonth =
    new Date(dateCreation).getMonth() + 1 <= 9
      ? `0${new Date(dateCreation).getMonth() + 1}`
      : `${new Date(dateCreation).getMonth() + 1}`;
  const dateYear = new Date(dateCreation).getFullYear().toString().slice(2, 4);
  let newIdentificationNumber;

  const lastBill = await prisma.file
    .findFirst({
      where: {
        type: 'bill',
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    .then((res) => res)
    .catch((e) => console.error(e));

  if (!lastBill || Number(lastBill.identification_number.split('-')[0]) !== Number(dateMonth)) {
    newIdentificationNumber = `${dateMonth}-${dateYear}-0${1}`;
    return newIdentificationNumber;
  }

  const billNumber = Number(lastBill.identification_number.split('-')[2]) + 1;
  newIdentificationNumber =
    billNumber <= 9
      ? `${dateMonth}-${dateYear}-0${billNumber}`
      : `${dateMonth}-${dateYear}-${billNumber}`;

  return newIdentificationNumber;
};

export default getIdentificationNumber;

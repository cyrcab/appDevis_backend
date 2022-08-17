import prisma from './prismaClient.js';

export const getBillIdentificationNumber = async (dateCreation) => {
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

export const getEstimateIdentificationNumber = async (dateCreation) => {
  const dateMonth =
    new Date(dateCreation).getMonth() + 1 <= 9
      ? `0${new Date(dateCreation).getMonth() + 1}`
      : `${new Date(dateCreation).getMonth() + 1}`;
  const dateYear = new Date(dateCreation).getFullYear().toString().slice(2, 4);
  let newIdentificationNumber;

  const lastEstimate = await prisma.file
    .findFirst({
      where: {
        type: 'estimate',
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    .then((res) => res)
    .catch((e) => console.error(e));

  if (!lastEstimate || Number(lastEstimate.identification_number.split('-')[0]) !== Number(dateMonth)) {
    newIdentificationNumber = `${dateMonth}-${dateYear}-0${1}`;
    return newIdentificationNumber;
  }

  const estimateNumber = Number(lastEstimate.identification_number.split('-')[2]) + 1;
  newIdentificationNumber =
  estimateNumber <= 9
      ? `${dateMonth}-${dateYear}-0${estimateNumber}`
      : `${dateMonth}-${dateYear}-${estimateNumber}`;

  return newIdentificationNumber;
};

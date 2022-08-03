import prisma from '../helpers/prismaClient';
import formatDate from '../helpers/formatDate';

export async function handleCreateCustomer(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const customerToCreate = await prisma.customer.upsert({
      where: {
        mail: req.body.mail,
      },
      create: {
        ...req.body,
        created_at: dateCreation,
      },
      update: {
        ...req.body,
      },
    });

    if (!customerToCreate) {
      return res.status(400).end();
    }

    return res.status(201).json(customerToCreate);
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

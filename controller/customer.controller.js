import prisma from '../helpers/prismaClient';
import formatDate from '../helpers/formatDate';

export async function handleCreateCustomer(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const customerToCreate = await prisma.customer.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
    });

    if (!customerToCreate) {
      return res.status(400).end();
    }

    return res.status(201).json({ data: customerToCreate });
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

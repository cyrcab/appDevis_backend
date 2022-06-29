const prisma = require('../helpers/prismaClient');
const formatDate = require('../helpers/formatDate');

async function handleCreateCustomer(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const customerToCreate = await prisma.customer.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
    });
    res.status(201).json(customerToCreate);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  handleCreateCustomer,
};

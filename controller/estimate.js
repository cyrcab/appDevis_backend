const prisma = require('../helpers/prismaClient');
const formatDate = require('../helpers/formatDate');

async function handleCreateEstimate(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    console.log(req.body);
    const estimateToCreate = await prisma.estimate.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
    });
    res.status(201).json(estimateToCreate);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { handleCreateEstimate };

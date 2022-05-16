const prisma = require('../helpers/prismaClient');
const formatDate = require('../helpers/formatDate');

async function handleCreateCategory(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const categoryToCreate = await prisma.category.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
    });
    res.json(categoryToCreate).status(201);
  } catch (error) {
    console.error(error);
    if (error) {
      res.status(404).json({ message: 'error when creating category', isCreated: false });
    }
  }
}

module.exports = { handleCreateCategory };

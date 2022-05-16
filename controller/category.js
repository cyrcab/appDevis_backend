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
    res
      .status(201)
      .json({ categoryToCreate, message: 'category created with succes', isCreated: true });
  } catch (error) {
    console.error(error);
    if (error) {
      res.status(404).json({ message: 'error when creating category', isCreated: false });
    }
    next(error);
  }
}

async function handleGetAllCategories(req, res, next) {
  try {
    const listOfCategories = await prisma.category.findMany({
      include: {
        Category_has_Question: true,
        Estimate: true,
        User: {
          select: {
            FirstName: true,
            LastName: true,
            mail: true,
            Role_id: true,
          },
        },
      },
    });
    res.status(200).json(listOfCategories);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { handleCreateCategory, handleGetAllCategories };

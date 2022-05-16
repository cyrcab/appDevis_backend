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
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        name: true,
        modified_by: true,
        Category_has_Question: true,
        Estimate: true,
        User: {
          select: {
            FirstName: true,
            LastName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
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

async function handleGetUniqueCategory(req, res, next) {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        name: true,
        modified_by: true,
        Category_has_Question: true,
        Estimate: true,
        User: {
          select: {
            FirstName: true,
            LastName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
      },
    });
    if (category) {
      res.status(200).json({ category, message: 'category found', isFounded: true });
    } else {
      res.status(404).json({ message: `no category found with id : ${id}`, isFounded: false });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleDeleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        name: true,
        modified_by: true,
        Category_has_Question: true,
        Estimate: true,
        User: {
          select: {
            FirstName: true,
            LastName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
      },
    });

    if (category) {
      await prisma.category.delete({
        where: { id: category.id },
      });
      res.status(200).json({
        message: `category with id : ${id} correctly deleted`,
        category: { ...category },
        isDeleted: true,
      });
    } else {
      res.status(404).json({
        message: `category with id : ${id} does not exist`,
        isDeleted: false,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleUpdateCategory(req, res, next) {
  try {
    const updateDate = formatDate(new Date());
    const { id } = req.params;
    const dataToUpdate = req.body;
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        name: true,
        modified_by: true,
        Category_has_Question: true,
        Estimate: true,
        User: {
          select: {
            FirstName: true,
            LastName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
      },
    });

    if (category) {
      const updatedCategory = await prisma.category.update({
        where: { id: category.id },
        data: {
          ...dataToUpdate,
          updated_at: updateDate,
        },
        select: {
          User_id: false,
          id: true,
          created_at: true,
          updated_at: true,
          name: true,
          modified_by: true,
          Category_has_Question: true,
          Estimate: true,
          User: {
            select: {
              FirstName: true,
              LastName: true,
              mail: true,
              Role: {
                select: {
                  Name: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json({
        message: `category with id : ${id} correctly updated`,
        isUpdated: true,
        categoryBeforeUpdate: { ...category },
        datasUpdated: { ...dataToUpdate, updated_at: updateDate },
        categoryAfterUpdate: {
          ...updatedCategory,
        },
      });
    } else {
      res.status(404).json({
        message: `category with id : ${id} does not exist`,
        isUpdated: false,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetUniqueCategory,
  handleDeleteCategory,
  handleUpdateCategory,
};

import prisma from '../helpers/prismaClient.js';
import formatDate from '../helpers/formatDate';

async function handleCreateCategory(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.user_id,
      },
    });
    const userName = user.firstName + ' ' + user.lastName;
    const categoryToCreate = await prisma.category.create({
      data: {
        ...req.body,
        created_at: dateCreation,
        created_by: userName,
      },
    });

    if (categoryToCreate) {
      res.status(201).json(categoryToCreate);
    } else {
      res.status(404).json({ message: 'error when creating category' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
    next(error);
  }
}

async function handleGetAllPacks(req, res, next) {
  try {
    const listOfCategories = await prisma.pack.findMany();
    res.status(200).json(listOfCategories);
  } catch (error) {
    res.status(500).json({ error: error });
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
        ...defaultSelectOption,
        User: {
          ...userInfo,
        },
      },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: `no category found with id : ${id}`, isFound: false });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleGetAllQuestionsByCategory(req, res, next) {
  try {
    const { id } = req.params;
    const listOfQuestions = await prisma.question.findMany({
      where: {
        category_id: parseInt(id),
      },
      select: {
        user_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        content: true,
        is_public: true,
        indication: true,
        Answer: true,
        User: {
          ...userInfo,
        },
      },
    });
    res.status(200).json(listOfQuestions);
  } catch (error) {
    console.error(next);
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
        ...defaultSelectOption,
        User: {
          ...userInfo,
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
        ...defaultSelectOption,
        User: {
          ...userInfo,
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
          ...defaultSelectOption,
          User: {
            ...userInfo,
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

export { handleGetAllPacks };

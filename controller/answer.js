const prisma = require('../helpers/prismaClient');
const formatDate = require('../helpers/formatDate');

async function handleCreateAnswer(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const answerToCreate = await prisma.answer.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
      select: {
        id: true,
        user_id: false,
        created_at: true,
        content: true,
        price: true,
      },
    });
    res
      .status(201)
      .json({ answerToCreate, message: 'answer created with succes', isCreated: true });
  } catch (error) {
    console.error(error);
    if (error) {
      res.status(404).json({ message: 'error when creating answer', isCreated: false });
    }
    next(error);
  }
}

async function handleGetAllAnswers(req, res, next) {
  try {
    const listOfAnswers = await prisma.answer.findMany({
      select: {
        id: true,
        user_id: false,
        created_at: true,
        content: true,
        price: true,
        updated_at: true,
        modified_by: true,
        User: {
          select: {
            lastName: true,
            firstName: true,
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
    res.status(200).json(listOfAnswers);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleGetUniqueAnswer(req, res, next) {
  try {
    const { id } = req.params;
    const answer = await prisma.answer.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        user_id: false,
        created_at: true,
        content: true,
        price: true,
        updated_at: true,
        modified_by: true,
        User: {
          select: {
            lastName: true,
            firstName: true,
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
    if (answer) {
      res.status(200).json({ answer, message: 'answer found', isFound: true });
    } else {
      res.status(404).json({ message: `no answer found with id : ${id}`, isFound: false });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleDeleteAnswer(req, res, next) {
  try {
    const { id } = req.params;
    const answer = await prisma.answer.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        user_id: false,
        created_at: true,
        content: true,
        price: true,
        updated_at: true,
        modified_by: true,
        User: {
          select: {
            lastName: true,
            firstName: true,
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
    if (answer) {
      await prisma.answer.delete({
        where: { id: answer.id },
      });
      res.status(200).json({
        message: `answer with id : ${id} correctly deleted`,
        answer: { ...answer },
        isDeleted: true,
      });
    } else {
      res.status(404).json({
        message: `answer with id : ${id} does not exist`,
        isDeleted: false,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleUpdateAnswer(req, res, next) {
  try {
    const updateDate = formatDate(new Date());
    const { id } = req.params;
    const dataToUpdate = req.body;
    const answer = await prisma.answer.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        user_id: false,
        created_at: true,
        content: true,
        price: true,
        updated_at: true,
        modified_by: true,
        User: {
          select: {
            lastName: true,
            firstName: true,
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

    if (answer) {
      const updatedAnswer = await prisma.answer.update({
        where: { id: answer.id },
        data: {
          ...dataToUpdate,
          updated_at: updateDate,
        },
        select: {
          id: true,
          user_id: false,
          created_at: true,
          content: true,
          price: true,
          updated_at: true,
          modified_by: true,
          User: {
            select: {
              lastName: true,
              firstName: true,
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
        message: `answer with id : ${id} correctly updated`,
        isUpdated: true,
        answerBeforeUpdate: { ...answer },
        datasUpdated: { ...dataToUpdate, updated_at: updateDate },
        answerAfterUpdate: {
          ...updatedAnswer,
        },
      });
    } else {
      res.status(404).json({
        message: `answer with id : ${id} does not exist`,
        isUpdated: false,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  handleCreateAnswer,
  handleGetAllAnswers,
  handleGetUniqueAnswer,
  handleDeleteAnswer,
  handleUpdateAnswer,
};

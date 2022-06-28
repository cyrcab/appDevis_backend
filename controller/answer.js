const prisma = require('../helpers/prismaClient');
const formatDate = require('../helpers/formatDate');

const defaultSelectOption = {
  id: true,
  created_at: true,
  content: true,
  price: true,
};
const userInfo = {
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
};

async function handleCreateAnswer(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const answerList = [...req.body];
    console.log([...answerList]);
    const answerToCreate =
      req.body.constructor === Object
        ? await prisma.answer.create({
            data: {
              ...req.body,
              created_at: dateCreation,
            },
            select: {
              ...defaultSelectOption,
            },
          })
        : await prisma.answer.createMany({
            data: answerList.map((answer) => ({
              ...answer,
              created_at: dateCreation,
            })),
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
        ...defaultSelectOption,
        updated_at: true,
        modified_by: true,
        User: { ...userInfo },
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
        ...defaultSelectOption,
        updated_at: true,
        modified_by: true,
        User: { ...userInfo },
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
        ...defaultSelectOption,
        updated_at: true,
        modified_by: true,
        User: { ...userInfo },
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
        ...defaultSelectOption,
        updated_at: true,
        modified_by: true,
        User: { ...userInfo },
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
          ...defaultSelectOption,
          updated_at: true,
          modified_by: true,
          User: { ...userInfo },
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

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
    const { answerToCreate } = req.body;
    const { newEstimateId } = req.body;
    const answerCreated = await prisma.answer.create({
      data: {
        ...answerToCreate,
        created_at: dateCreation,
      },
      select: {
        ...defaultSelectOption,
      },
    });
    if (newEstimateId) {
      link = await prisma.estimate_has_Answer.create({
        data: {
          answer_id: answerCreated.id,
          estimate_id: parseInt(newEstimateId),
        },
      });
    }
    res.status(201).json(answerToCreate);
  } catch (error) {
    console.error(error);
    if (error) {
      res.status(404).json({ message: 'error when creating answer', isCreated: false });
    }
    next(error);
  }
}

async function handleCreateAnswerByEstimate(req, res, next) {
  try {
    const { estimateId, answerIdList } = req.body;
    const estimateIsCreated = await prisma.estimate_has_Answer.createMany({
      data: answerIdList.map((answerId) => ({
        answer_id: parseInt(answerId),
        estimate_id: parseInt(estimateId),
      })),
    });
    if (estimateIsCreated) {
      res.status(201).json(estimateIsCreated);
    } else {
      res.status(404).json({ message: 'error when creating answer by estimate', isCreated: false });
    }
  } catch (error) {
    console.error(error);
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
async function handleGetAllAnswersOrderedByDate(req, res, next) {
  try {
    const { number } = req.params;
    const listOfAnswers = await prisma.answer.findMany({
      select: {
        ...defaultSelectOption,
        updated_at: true,
        modified_by: true,
        User: { ...userInfo },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: parseInt(number),
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
  handleGetAllAnswersOrderedByDate,
  handleCreateAnswerByEstimate,
};

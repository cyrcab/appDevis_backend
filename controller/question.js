const prisma = require('../helpers/prismaClient');
const formatDate = require('../helpers/formatDate');

async function handleCreateQuestion(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const questionToCreate = await prisma.question.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
    });
    res
      .status(201)
      .json({ questionToCreate, message: 'question created with succes', isCreated: true });
  } catch (error) {
    console.error(next);
    if (error) {
      res.status(404).json({ message: 'error when creating question', isCreated: false });
    }
    next(error);
  }
}
async function handleGetAllQuestions(req, res, next) {
  try {
    const listOfQuestions = await prisma.question.findMany({
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        content: true,
        is_public: true,
        has_multiple_choice: true,
        indication: true,
        User: {
          select: {
            LastName: true,
            FirstName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
        Question_has_Response: true,
      },
    });
    res.status(200).json(listOfQuestions);
  } catch (error) {
    console.error(next);
    next(error);
  }
}
async function handleGetUniqueQuestion(req, res, next) {
  try {
    const { id } = req.params;
    const question = await prisma.question.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        content: true,
        is_public: true,
        has_multiple_choice: true,
        indication: true,
        User: {
          select: {
            LastName: true,
            FirstName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
        Question_has_Response: true,
      },
    });
    if (question) {
      res.status(200).json({ question, message: 'question found', isFounded: true });
    } else {
      res.status(404).json({ message: `no question found with id : ${id}`, isFounded: false });
    }
  } catch (error) {
    console.error(next);
    next(error);
  }
}
async function handleDeleteQuestion(req, res, next) {
  try {
    const { id } = req.params;
    const question = await prisma.question.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        content: true,
        is_public: true,
        has_multiple_choice: true,
        indication: true,
        User: {
          select: {
            LastName: true,
            FirstName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
        Question_has_Response: true,
      },
    });
    if (question) {
      await prisma.question.delete({
        where: { id: question.id },
      });
      res.status(200).json({
        message: `question with id : ${id} correctly deleted`,
        question: { ...question },
        isDeleted: true,
      });
    } else {
      res.status(404).json({
        message: `question with id : ${id} does not exist`,
        isDeleted: false,
      });
    }
  } catch (error) {
    console.error(next);
    next(error);
  }
}
async function handleUpdateQuestion(req, res, next) {
  try {
    const updateDate = formatDate(new Date());
    const { id } = req.params;
    const dataToUpdate = req.body;
    const question = await prisma.question.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        content: true,
        is_public: true,
        has_multiple_choice: true,
        indication: true,
        User: {
          select: {
            LastName: true,
            FirstName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
        Question_has_Response: true,
      },
    });
    if (question) {
      const updatedQuestion = await prisma.question.update({
        where: {
          id: question.id,
        },
        data: {
          ...dataToUpdate,
          updated_at: updateDate,
        },
        select: {
          User_id: false,
          id: true,
          created_at: true,
          updated_at: true,
          content: true,
          is_public: true,
          has_multiple_choice: true,
          indication: true,
          User: {
            select: {
              LastName: true,
              FirstName: true,
              mail: true,
              Role: {
                select: {
                  Name: true,
                },
              },
            },
          },
          Question_has_Response: true,
        },
      });
      res.status(200).json({
        message: `question with id : ${id} correctly updated`,
        isUpdated: true,
        questionBeforeUpdate: { ...question },
        datasUpdated: { ...dataToUpdate, updated_at: updateDate },
        questionAfterUpdate: {
          ...updatedQuestion,
        },
      });
    } else {
      res.status(404).json({
        message: `question with id : ${id} does not exist`,
        isUpdated: false,
      });
    }
  } catch (error) {
    console.error(next);
    next(error);
  }
}

module.exports = {
  handleCreateQuestion,
  handleGetAllQuestions,
  handleGetUniqueQuestion,
  handleDeleteQuestion,
  handleUpdateQuestion,
};

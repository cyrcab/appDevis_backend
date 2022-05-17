const prisma = require('../helpers/prismaClient');
const formatDate = require('../helpers/formatDate');
const { category_has_Question } = require('../helpers/prismaClient');

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
        Category_has_Question: true,
        Estimate_has_Question: true,
        Question_has_Response: true,
      },
    });
    res.status(200).json(listOfQuestions);
  } catch (error) {
    console.error(next);
    next(error);
  }
}
// async function handleGetUniqueQuestion(req, res, next) {
//   try {
//   } catch (error) {
//     console.error(next);
//     next(error);
//   }
// }
// async function handleDeleteQuestion(req, res, next) {
//   try {
//   } catch (error) {
//     console.error(next);
//     next(error);
//   }
// }
// async function handleUpdateQuestion(req, res, next) {
//   try {
//   } catch (error) {
//     console.error(next);
//     next(error);
//   }
// }

module.exports = {
  handleCreateQuestion,
  handleGetAllQuestions,
  // handleGetUniqueQuestion,
  // handleDeleteQuestion,
  // handleUpdateQuestion,
};

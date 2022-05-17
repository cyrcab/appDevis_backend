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
// async function handleGetAllQuestions(req, res, next) {
//   try {
//   } catch (error) {
//     console.error(next);
//     next(error);
//   }
// }
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
  // handleGetAllQuestions,
  // handleGetUniqueQuestion,
  // handleDeleteQuestion,
  // handleUpdateQuestion,
};

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
        User_id: false,
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
        User_id: false,
        created_at: true,
        content: true,
        price: true,
        updated_at: true,
        modified_by: true,
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
        User_id: false,
        created_at: true,
        content: true,
        price: true,
        updated_at: true,
        modified_by: true,
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

// async function handleDeleteAnswer(req, res, next) {
//   try {
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }
// async function handleUpdateAnswer(req, res, next) {
//   try {
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

module.exports = {
  handleCreateAnswer,
  handleGetAllAnswers,
  handleGetUniqueAnswer,
  // handleDeleteAnswer,
  // handleUpdateAnswer,
};
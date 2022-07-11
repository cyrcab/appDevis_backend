import prisma from '../helpers/prismaClient';
import formatDate from '../helpers/formatDate';

async function handleCreateOption(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const answerCreated = await prisma.options.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
    });
    res.status(201).json(answerCreated);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleGetAllOptions(req, res, next) {
  try {
    const listOfAnswers = await prisma.options.findMany();
    res.status(200).json(listOfAnswers);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// async function handleGetUniqueOption(req, res, next) {
//   try {
//     const { id } = req.params;
//     const answer = await prisma.answer.findUnique({
//       where: {
//         id: parseInt(id),
//       },
//       select: {
//         ...defaultSelectOption,
//         updated_at: true,
//         modified_by: true,
//         User: { ...userInfo },
//       },
//     });
//     if (answer) {
//       res.status(200).json(answer);
//     } else {
//       res.status(404).json({ message: `no answer found with id : ${id}`, isFound: false });
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// async function handleDeleteOption(req, res, next) {
//   try {
//     const { id } = req.params;
//     const answer = await prisma.answer.findUnique({
//       where: {
//         id: parseInt(id),
//       },
//       select: {
//         ...defaultSelectOption,
//         updated_at: true,
//         modified_by: true,
//         User: { ...userInfo },
//       },
//     });
//     if (answer) {
//       await prisma.answer.delete({
//         where: { id: answer.id },
//       });
//       res.status(200).json({
//         message: 'answer deleted',
//         answer: answer,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// async function handleUpdateOption(req, res, next) {
//   try {
//     const updateDate = formatDate(new Date());
//     const { id } = req.params;
//     const dataToUpdate = req.body;
//     const answer = await prisma.answer.findUnique({
//       where: {
//         id: parseInt(id),
//       },
//       select: {
//         ...defaultSelectOption,
//         updated_at: true,
//         modified_by: true,
//         User: { ...userInfo },
//       },
//     });

//     if (answer) {
//       const updatedAnswer = await prisma.answer.update({
//         where: { id: answer.id },
//         data: {
//           ...dataToUpdate,
//           updated_at: updateDate,
//         },
//         select: {
//           ...defaultSelectOption,
//           updated_at: true,
//           modified_by: true,
//           User: { ...userInfo },
//         },
//       });
//       res.status(200).json({ message: 'answer updated', answer: updatedAnswer });
//     } else {
//       res.status(404).json({
//         message: `answer with id : ${id} does not exist`,
//         isUpdated: false,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

export { handleCreateOption, handleGetAllOptions };

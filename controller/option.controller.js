import prisma from '../helpers/prismaClient';
import formatDate from '../helpers/formatDate';

async function handleCreateOption(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const { price_ht } = req.body;
    console.log(price_ht);
    const answerCreated = await prisma.option.create({
      data: {
        ...req.body,
        created_at: dateCreation,
        price_ttc: price_ht + price_ht * 0.2,
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
    const listOfAnswers = await prisma.option.findMany();
    res.status(200).json(listOfAnswers);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleGetUniqueOption(req, res, next) {
  try {
    const { id } = req.params;
    const option = await prisma.option.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        creator: {
          select: {
            password: false,
            id: true,
            firstName: true,
            lastName: true,
            mail: true,
            role_id: true,
          },
        },
      },
    });
    if (option) {
      res.status(200).json(option);
    } else {
      res.status(404).json({ message: `no option found with id : ${id}`, isFound: false });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleDeleteOption(req, res, next) {
  try {
    const { id } = req.params;
    const answer = await prisma.option.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (answer) {
      await prisma.option.delete({
        where: { id: answer.id },
      });
      res.status(200).json({
        message: 'answer deleted',
        answer: answer,
      });
    } else {
      res.status(404).json({ message: 'an error occured whend delting option' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

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

export { handleCreateOption, handleGetAllOptions, handleGetUniqueOption, handleDeleteOption };

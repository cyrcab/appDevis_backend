import prisma from '../helpers/prismaClient';
import formatDate from '../helpers/formatDate';

async function handleCreateOption(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const { price_ht } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.user_id,
      },
    });
    const userName = user.firstName + ' ' + user.lastName;
    const answerCreated = await prisma.option.create({
      data: {
        ...req.body,
        created_by: userName,
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
    const option = await prisma.option.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (option) {
      await prisma.option.delete({
        where: { id: option.id },
      });
      res.status(200).json({
        message: 'option deleted',
        option: option,
      });
    } else {
      res.status(404).json({ message: 'no option with this id' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleUpdateOption(req, res, next) {
  try {
    const updateDate = formatDate(new Date());
    const { id } = req.params;
    const dataToUpdate = req.body;
    const answer = await prisma.answer.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (answer) {
      const updatedAnswer = await prisma.answer.update({
        where: { id: answer.id },
        data: {
          ...dataToUpdate,
          updated_at: updateDate,
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
      res.status(200).json({ message: 'answer updated', answer: updatedAnswer });
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

export {
  handleCreateOption,
  handleGetAllOptions,
  handleGetUniqueOption,
  handleDeleteOption,
  handleUpdateOption,
};

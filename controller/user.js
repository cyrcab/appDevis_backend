const prisma = require('../helpers/prismaClient.js');
const formatDate = require('../helpers/formatDate');

async function handleGetAllUsers(req, res, next) {
  try {
    const listOfUsers = await prisma.user.findMany();
    res.json(listOfUsers).status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function handleGetUniqueUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: 'user found', status: 'OK', user: { ...user } });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function handleCreateUser(req, res, next) {
  try {
    const created_at = formatDate(new Date());
    const userToCreate = await prisma.user.create({
      data: {
        ...req.body,
        created_at: created_at,
      },
    });
    res.json(userToCreate).status(201);
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(400).json({ message: 'error when creating user' });
    }
    next(err);
  }
}
async function handleDeleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (user) {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      res
        .status(200)
        .json({ message: 'user correctly deleted', user: { ...user }, isDeleted: true });
    } else {
      res.status(404).json({
        message: 'user not found, did you enter the correct id ?',
        idSearched: `${id}`,
        isDeleted: false,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function handleUpdateUser(req, res, next) {
  try {
    const updateDate = formatDate(new Date());
    const { id } = req.params;
    const dataToUpdate = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...dataToUpdate,
          updated_at: updateDate,
        },
      });
      res.status(200).json({
        message: 'user updated with success',
        isModified: true,
        lastDatas: { ...user },
        dataUpdated: { ...dataToUpdate, updated_at: updateDate },
        newDatas: { ...updatedUser },
      });
    } else {
      res.status(404).json({
        message: 'user not found, did you enter the correct id ?',
        idSearched: `${id}`,
        isModified: false,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUniqueUser,
  handleDeleteUser,
  handleUpdateUser,
};

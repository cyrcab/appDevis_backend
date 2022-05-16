const prisma = require('../helpers/prismaClient.js');

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
    const created_at = new Date('December 17, 1995 03:24:00');
    const updated_at = new Date('December 17, 1995 03:24:00');
    const userToCreate = await prisma.user.create({
      data: {
        ...req.body,
        created_at: created_at,
        updated_at: updated_at,
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
// async function handleDeleteUser(req, res, next) {
//   try {

//   } catch (error) {

//   }
// }

module.exports = {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUniqueUser,
};

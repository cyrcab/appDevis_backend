const prisma = require('../helpers/prismaClient.js');

async function handleGetAllUsers(req, res, next) {
  try {
    const listOfUsers = await prisma.user.findMany();
    res.json(listOfUsers).status(200);
  } catch (err) {
    console.log(err);
    next(err);
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
  } catch (err) {
    console.log(err);
    if (err) {
      res.status(400).json({ message: 'error when creating user' });
    }
    next(err);
  }
}


module.exports = {
  handleCreateUser,
  handleGetAllUsers,
};

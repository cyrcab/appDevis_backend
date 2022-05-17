const prisma = require('../helpers/prismaClient.js');
const formatDate = require('../helpers/formatDate');
const generateToken = require('../services/auth');
const { hashPassword, verifyPassword } = require('../services/hashPassword');

async function getAllUsers(req, res, next) {
  try {
    const listOfUsers = await prisma.user.findMany({
      select: {
        password: false,
        id: true,
        FirstName: true,
        LastName: true,
        Role_id: true,
        created_at: true,
        updated_at: true,
        mail: true,
        Role: {
          select: {
            Name: true,
          },
        },
        modified_by: true,
      },
    });
    res.json(listOfUsers).status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getUniqueUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        password: false,
        id: true,
        FirstName: true,
        LastName: true,
        Role_id: true,
        created_at: true,
        updated_at: true,
        mail: true,
        Role: {
          select: {
            Name: true,
          },
        },
        modified_by: true,
      },
    });
    if (user) {
      res.status(200).json({ user, message: 'user found', isFound: true });
    } else {
      res.status(404).json({ message: `no user found with id : ${id}`, isFound: false });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { mail, password } = req.body;
    const dateCreation = formatDate(new Date());
    const userExist = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
    });

    if (userExist) {
      res.status(409).json({ message: 'User already exist', isCreated: false });
    } else {
      const hashedPassword = await hashPassword(password);
      const userToCreate = await prisma.user.create({
        data: {
          ...req.body,
          created_at: dateCreation,
          password: hashedPassword,
        },
        select: {
          password: false,
          id: true,
          FirstName: true,
          LastName: true,
          Role_id: true,
          created_at: true,
          mail: true,
          Role: {
            select: {
              Name: true,
            },
          },
        },
      });
      res.status(201).json({ userToCreate, message: 'user created with succes', isCreated: true });
    }
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(400).json({ message: 'error when creating user', isCreated: false });
    }
    next(err);
  }
}
async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        password: false,
        id: true,
        FirstName: true,
        LastName: true,
        Role_id: true,
        created_at: true,
        updated_at: true,
        mail: true,
        Role: {
          select: {
            Name: true,
          },
        },
        modified_by: true,
      },
    });

    if (user) {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      res.status(200).json({
        message: `user with id ${id} correctly deleted`,
        user: { ...user },
        isDeleted: true,
      });
    } else {
      res.status(404).json({
        message: `user with id : ${id} does not exist`,
        isDeleted: false,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function updateUser(req, res, next) {
  try {
    const updateDate = formatDate(new Date());
    const { id } = req.params;
    const dataToUpdate = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        password: false,
        id: true,
        FirstName: true,
        LastName: true,
        Role_id: true,
        created_at: true,
        updated_at: true,
        mail: true,
        Role: {
          select: {
            Name: true,
          },
        },
        modified_by: true,
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
        select: {
          password: false,
          id: true,
          FirstName: true,
          LastName: true,
          Role_id: true,
          created_at: true,
          updated_at: true,
          mail: true,
          Role: {
            select: {
              Name: true,
            },
          },
          modified_by: true,
        },
      });
      res.status(200).json({
        message: `user with id : ${id} correctly updated`,
        isUpdated: true,
        userBeforeUpdate: { ...user },
        datasUpdated: { ...dataToUpdate, updated_at: updateDate },
        userAfterUpdate: { ...updatedUser },
      });
    } else {
      res.status(404).json({
        message: `user with id : ${id} does not exist`,
        isModified: false,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUniqueUser,
  deleteUser,
  updateUser,
  loginUser,
};

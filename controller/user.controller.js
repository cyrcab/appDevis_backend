import prisma from '../helpers/prismaClient.js';
import formatDate from '../helpers/formatDate';
import { newToken } from '../services/auth';
import { hashPassword, verifyPassword } from '../services/hashPassword';

async function getAllUsers(req, res, next) {
  try {
    const listOfUsers = await prisma.user.findMany();
    listOfUsers.map((user) => delete user.password);
    return res.status(200).json({ data: listOfUsers });
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

async function getUniqueUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user) {
      delete user.password;
      return res.status(200).json({ data: user });
    } else {
      return res.status(404).json({ message: `no user found with id : ${id}` });
    }
  } catch (error) {
    next(error);
    return res.status(500).end();
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
      return res.status(409).json({ message: 'User already exist', isCreated: false });
    } else {
      const hashedPassword = await hashPassword(password);
      const userToCreate = await prisma.user.create({
        data: {
          ...req.body,
          created_at: dateCreation,
          password: hashedPassword,
        },
      });
      delete userToCreate.password;
      return res.status(201).json({ data: userToCreate });
    }
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}
async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (user) {
      const userToDelete = await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      return res.status(200).json({ data: userToDelete });
    } else {
      return res.status(404).json({
        message: `user with id : ${id} does not exist`,
      });
    }
  } catch (error) {
    next(error);
    return res.status(500).end();
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
      delete updatedUser.password;
      return res.status(200).json({ data: updatedUser });
    } else {
      return res.status(404).json({
        message: `user with id : ${id} does not exist`,
      });
    }
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

export { createUser, getAllUsers, getUniqueUser, deleteUser, updateUser };

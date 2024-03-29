import prisma from '../helpers/prismaClient.js';
import jwt from 'jsonwebtoken';
import formatDate from '../helpers/formatDate.js';
import { newToken } from '../services/auth.js';
import { hashPassword, verifyPassword } from '../services/hashPassword.js';

async function getAllUsers(req, res, next) {
  try {
    const listOfUsers = await prisma.user.findMany();
    listOfUsers.map((user) => delete user.password);
    return res.status(200).json(listOfUsers);
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
      return res.status(200).json(user);
    } else {
      return res.status(404).end();
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
      return res.status(409).json({ message: 'User already exist' });
    }
    const hashedPassword = await hashPassword(password);
    const userToCreate = await prisma.user.create({
      data: {
        ...req.body,
        created_at: dateCreation,
        password: hashedPassword,
      },
    });

    if (!userToCreate) {
      return res.status(400).end();
    }

    delete userToCreate.password;
    return res.status(201).json(userToCreate);
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
      return res.status(200).json(userToDelete);
    } else {
      return res.status(404).end();
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
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

export { createUser, getAllUsers, getUniqueUser, deleteUser, updateUser };

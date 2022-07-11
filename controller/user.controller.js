import prisma from '../helpers/prismaClient.js';
import formatDate from '../helpers/formatDate';
import { generateToken } from '../services/auth';
import { hashPassword, verifyPassword } from '../services/hashPassword';

async function getAllUsers(req, res, next) {
  try {
    const listOfUsers = await prisma.user.findMany();
    listOfUsers.map((user) => delete user.password);
    res.status(200).json(listOfUsers);
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
    });
    delete user.password;
    if (user) {
      res.status(200).json(user);
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
    const { mail } = req.body;
    const userExist = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
      select: {
        ...defaultSelectOption,
        password: true,
      },
    });
    if (userExist) {
      const isVerifiedPass = await verifyPassword(req.body.password, userExist.password);
      if (isVerifiedPass) {
        const token = generateToken(userExist);
        delete userExist.password;
        res.status(201).json({
          message: 'User connected',
          isConnected: true,
          ...userExist,
          userToken: token,
        });
      } else {
        res.status(401).json({ message: 'Incorrect password', isConnected: false });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
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
      });
      delete userToCreate.password;
      res.status(201).json({ userToCreate, message: 'user created with succes', isCreated: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error when creating user', isCreated: false });
    next(error);
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
        ...defaultSelectOption,
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
        ...defaultSelectOption,
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
          ...defaultSelectOption,
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

export { createUser, getAllUsers, getUniqueUser, deleteUser, updateUser, loginUser };

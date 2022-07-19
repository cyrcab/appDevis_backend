import prisma from '../helpers/prismaClient';
import formatDate from '../helpers/formatDate';
import updateFilePrice from '../services/updateFilePrice';

async function handleCreateOption(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const { price_ht, pack_id } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.user_id,
      },
    });
    const userName = user.firstName + ' ' + user.lastName;
    const pack = await prisma.pack.findUnique({
      where: {
        id: pack_id,
      },
    });
    if (pack) {
      const optionCreated = await prisma.option.create({
        data: {
          ...req.body,
          created_by: userName,
          created_at: dateCreation,
          price_ttc: price_ht + price_ht * 0.2,
        },
      });
      if (!optionCreated) {
        return res.status(400).end();
      }
      const fileIsUpdated = updateFilePrice(pack, optionCreated);

      if (!fileIsUpdated) {
        await prisma.option.delete({
          where: {
            id: optionCreated.id,
          },
        });
        return res.status(400).end();
      }

      return res.status(201).json(optionCreated);
    } else {
      return res.status(404).json({ message: "Il n'y a pas de pack avec cet id" });
    }
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

async function handleGetAllOptions(req, res, next) {
  try {
    const listOfOptions = await prisma.option.findMany();
    res.status(200).json(listOfOptions);
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
    next(error);
    return res.status(500).end();
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
    next(error);
    return res.status(500).end();
  }
}

async function handleUpdateOption(req, res, next) {
  try {
    const updateDate = formatDate(new Date());
    const { id } = req.params;
    // search if option exist
    const option = await prisma.option.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const { user_id } = req.body;
    // search the user who is updating this option
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    const userName = user.firstName + ' ' + user.lastName;

    const { price_ht } = req.body;
    if (option) {
      // update option with differents datas
      const updatedOption = await prisma.option.update({
        where: { id: option.id },
        data: {
          ...req.body,
          updated_by: userName,
          updated_at: updateDate,
          price_ttc: price_ht + price_ht * 0.2,
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
      res.status(200).json({ message: 'option updated', option: updatedOption });
    } else {
      res.status(404).json({
        message: `option with id : ${id} does not exist`,
        isUpdated: false,
      });
    }
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

export {
  handleCreateOption,
  handleGetAllOptions,
  handleGetUniqueOption,
  handleDeleteOption,
  handleUpdateOption,
};

import prisma from '../helpers/prismaClient';
import formatDate from '../helpers/formatDate';
import {
  addPackPriceAndUpdate,
  substractPriceAndUpdate,
  updatePackPriceAndUpdate,
} from '../services/updateFilePrice';

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
      include: {
        option: true,
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
      const packUpdated = addPackPriceAndUpdate(pack, optionCreated);

      if (!packUpdated) {
        await prisma.option.delete({
          where: {
            id: optionCreated.id,
          },
        });
        return res.status(400).end();
      }

      return res.status(201).json({ data: optionCreated });
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
}

async function handleGetAllOptions(req, res, next) {
  try {
    const listOfOptions = await prisma.option.findMany();
    res.status(200).json({ data: listOfOptions });
  } catch (error) {
    next(error);
    return res.status(500).end();
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
      res.status(200).json({ data: option });
    } else {
      res.status(404).end();
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
      include: {
        pack: true,
      },
    });
    if (!option) {
      res.status(404).end();
    }

    const optionToDelete = await prisma.option.delete({
      where: { id: option.id },
    });
    if (!optionToDelete) {
      return res.status(400).end();
    }
    const packUpdated = await substractPriceAndUpdate(option.pack, option);

    if (!packUpdated) {
      await prisma.option.create({
        data: {
          ...optionToDelete,
        },
      });
      return res.status(400).end();
    }
    res.status(200).json({ data: option });
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
    if (!option) {
      res.status(404).end();
    }
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
        pack: {
          include: {
            option: true,
          },
        },
      },
    });
    if (!updatedOption) {
      return res.status(400).end();
    }
    const packUpdated = updatePackPriceAndUpdate(updatedOption.pack);
    if (!packUpdated) {
      return res.status(400).end();
    }
    res.status(200).json({ data: updatedOption });
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

const prisma = require('../helpers/prismaClient');
const formatDate = require('../helpers/formatDate');

const defaultSelectOption = {
  id: true,
  created_at: true,
  price: true,
  category_id: true,
  Category: {
    select: {
      name: true,
    },
  },
  Customer: true,
  type: true,
  created_by: true,
  Estimate_has_Answer: {
    select: {
      Answer: true,
    },
  },
};
const userInfo = {
  select: {
    lastName: true,
    firstName: true,
    mail: true,
    Role: {
      select: {
        Name: true,
      },
    },
  },
};

async function handleCreateEstimate(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const estimateToCreate = await prisma.estimate.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
    });
    res.status(201).json(estimateToCreate);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleGetAllEstimate(req, res, next) {
  try {
    const listOfEstimates = await prisma.estimate.findMany({
      select: {
        ...defaultSelectOption,
        User: { ...userInfo },
      },
      take: 10,
    });
    if (listOfEstimates.length) {
      res.status(200).json(listOfEstimates);
    } else {
      res.status(404).json({ message: 'no estimate found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleDeleteEstimate(req, res, next) {
  try {
    const { id } = req.params;
    const estimate = await prisma.estimate.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (estimate) {
      const estimateToDelete = await prisma.estimate.delete({
        where: {
          id: parseInt(id),
        },
      });
      if (estimateToDelete) {
        res.status(200).json({ message: 'estimate deleted' });
      } else {
        res.status(400).json({ message: 'error when deleting estimate' });
      }
    } else {
      res.status(404).json({ message: 'estimate not found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleUpdateEstimate(req, res, next) {
  try {
    const { id } = req.params;
    const estimate = await prisma.estimate.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (estimate) {
      const estimateToUpdate = await prisma.estimate.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...req.body,
        },
      });
      if (estimateToUpdate) {
        res.status(200).json({ message: 'estimate updated', estimateToUpdate });
      } else {
        res.status(400).json({ message: 'error when updating estimate' });
      }
    } else {
      res.status(404).json({ message: 'estimate not found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  handleCreateEstimate,
  handleGetAllEstimate,
  handleDeleteEstimate,
  handleUpdateEstimate,
};

const prisma = require('../helpers/prismaClient.js');
const formatDate = require('../helpers/formatDate');

async function handleCreateOffer(req, res, next) {
  try {
    const dateCreation = formatDate(new Date());
    const offerToCreate = await prisma.offer.create({
      data: {
        ...req.body,
        created_at: dateCreation,
      },
    });
    res.status(201).json({ offerToCreate, message: 'offer created with succes', isCreated: true });
  } catch (error) {
    console.next(error);
    if (error) {
      res.status(400).json({ message: 'error when creating offer', isCreated: false });
    }
    next(error);
  }
}

async function handleGetAllOffers(req, res, next) {
  try {
    const listOfOffer = await prisma.offer.findMany({
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        name: true,
        modified_by: true,
        description: true,
        price: true,
        User: {
          select: {
            FirstName: true,
            LastName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(listOfOffer);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleGetUniqueOffer(req, res, next) {
  try {
    const { id } = req.params;
    const offer = await prisma.offer.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        name: true,
        modified_by: true,
        description: true,
        price: true,
        User: {
          select: {
            FirstName: true,
            LastName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
      },
    });
    if (offer) {
      res.status(200).json({
        offer,
        message: 'offer found',
        isFounded: true,
      });
    } else {
      res.status(404).json({
        message: `no offer found with id : ${id}`,
        isFounded: false,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleDeleteOffer(req, res, next) {
  try {
    const { id } = req.params;
    const offer = await prisma.offer.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        name: true,
        modified_by: true,
        description: true,
        price: true,
        User: {
          select: {
            FirstName: true,
            LastName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
      },
    });
    if (offer) {
      await prisma.offer.delete({
        where: {
          id: offer.id,
        },
      });
      res.status(200).json({
        message: `offer with id : ${id} correctly deleted`,
        category: { ...offer },
        isDeleted: true,
      });
    } else {
      res.status(404).json({
        message: `offer with id : ${id} does not exist`,
        isDeleted: false,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function handleUpdateOffer(req, res, next) {
  try {
    const { id } = req.params;
    const updateDate = formatDate(new Date());
    const dataToUpdate = req.body;
    const offer = await prisma.offer.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        User_id: false,
        id: true,
        created_at: true,
        updated_at: true,
        name: true,
        modified_by: true,
        description: true,
        price: true,
        User: {
          select: {
            FirstName: true,
            LastName: true,
            mail: true,
            Role: {
              select: {
                Name: true,
              },
            },
          },
        },
      },
    });
    if (offer) {
      const offerUpdated = await prisma.offer.update({
        where: {
          id: offer.id,
        },
        data: {
          ...dataToUpdate,
          updated_at: updateDate,
        },
        select: {
          User_id: false,
          id: true,
          created_at: true,
          updated_at: true,
          name: true,
          modified_by: true,
          description: true,
          price: true,
          User: {
            select: {
              FirstName: true,
              LastName: true,
              mail: true,
              Role: {
                select: {
                  Name: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json({
        message: `offer with id : ${id} correctly updated`,
        isUpdated: true,
        offerBeforeUpdate: { ...offer },
        datasUpdated: { ...dataToUpdate, updated_at: updateDate },
        offerAfterUpdate: { ...offerUpdated },
      });
    } else {
      res.status(404).json({
        message: `offer with id : ${id} does not exist`,
        isDeleted: false,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  handleCreateOffer,
  handleGetAllOffers,
  handleGetUniqueOffer,
  handleDeleteOffer,
  handleUpdateOffer,
};

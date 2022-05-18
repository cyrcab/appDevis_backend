const offerRouter = require('express').Router();
const {
  handleCreateOffer,
  handleGetAllOffers,
  handleGetUniqueOffer,
  handleDeleteOffer,
  handleUpdateOffer,
} = require('../controller/offer');
const {
  offerCreationValidation,
  offerUpdateValidation,
} = require('../middlewares/validation/offer');

offerRouter.post('/', [offerCreationValidation, handleCreateOffer]);
offerRouter.get('/', handleGetAllOffers);
offerRouter.get('/:id', handleGetUniqueOffer);
offerRouter.delete('/:id', handleDeleteOffer);
offerRouter.put('/:id', [offerUpdateValidation, handleUpdateOffer]);

module.exports = offerRouter;

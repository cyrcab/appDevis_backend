const offerRouter = require('express').Router();
const {
  handleCreateOffer,
  handleGetAllOffers,
  // handleGetUniqueOffer,
  // handleDeleteOffer,
  // handleUpdateOffer,
} = require('../controller/offer');

offerRouter.post('/', handleCreateOffer);
offerRouter.get('/', handleGetAllOffers);
// offerRouter.get('/:id', handleGetUniqueOffer);
// offerRouter.delete('/:id', handleDeleteOffer);
// offerRouter.put('/:id', handleUpdateOffer);

module.exports = offerRouter;
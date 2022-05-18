const Joi = require('joi');

const offerCreateSchema = Joi.object({
  user_id: Joi.number().required(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  modified_by: Joi.string(),
  description: Joi.string().max(255),
  name: Joi.string().max(255).required(),
  price: Joi.number().min(1).required(),
});

const offerUpdateSchema = Joi.object({
  user_id: Joi.number(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  modified_by: Joi.string(),
  description: Joi.string().max(255),
  name: Joi.string().max(255),
  price: Joi.number().min(1),
});

const offerCreationValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = offerCreateSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
};

const offerUpdateValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = offerUpdateSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
};

module.exports = {
  offerCreationValidation,
  offerUpdateValidation,
};

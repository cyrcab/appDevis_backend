import Joi from 'joi';

const optionCreateSchema = Joi.object({
  user_id: Joi.number().required(),
  pack_id: Joi.number().required(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  created_by: Joi.string().required(),
  content: Joi.string().max(400).required(),
  price_ht: Joi.number(),
  price_ttc: Joi.number(),
});

const optionUpdateSchema = Joi.object({
  user_id: Joi.number().required(),
  pack_id: Joi.number().required(),
  updated_at: Joi.date(),
  updated_by: Joi.string().required(),
  content: Joi.string().max(400),
  price_ht: Joi.number(),
});

const optionCreationValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = optionCreateSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
};

const optionUpdateValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = optionUpdateSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
};

export { optionCreationValidation, optionUpdateValidation };

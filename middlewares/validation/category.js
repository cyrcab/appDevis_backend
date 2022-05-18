const Joi = require('joi');

const categoryCreateSchema = Joi.object({
  user_id: Joi.number().required(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  name: Joi.string().max(255).required(),
  modified_by: Joi.string(),
});

const categoryUpdateSchema = Joi.object({
  user_id: Joi.number(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  name: Joi.string().max(255),
  modified_by: Joi.string(),
});

const categoryCreationValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = categoryCreateSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
};

const categoryUpdateValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = categoryUpdateSchema.validate(payload, {
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
  categoryCreationValidation,
  categoryUpdateValidation,
};

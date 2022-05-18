const Joi = require('joi');

const answerCreateSchema = Joi.object({
  user_id: Joi.number().required(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  content: Joi.string().max(400).required(),
  price: Joi.number().min(1).required(),
  has_multiple_choice: Joi.boolean().required(),
  modified_by: Joi.string(),
});

const answerUpdateSchema = Joi.object({
  user_id: Joi.number().required(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  content: Joi.string().max(400),
  price: Joi.number().min(1),
  has_multiple_choice: Joi.boolean(),
  modified_by: Joi.string(),
});

const answerCreationValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = answerCreateSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
};

const answerUpdateValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = answerUpdateSchema.validate(payload, {
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
  answerCreationValidation,
  answerUpdateValidation,
};

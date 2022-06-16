const Joi = require('joi');

const questionCreateSchema = Joi.object({
  user_id: Joi.number().required(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  has_multiple_choice: Joi.boolean(),
  is_public: Joi.boolean(),
  content: Joi.string().max(255).required(),
  indication: Joi.string().max(255),
  modified_by: Joi.string(),
});

const questionUpdateSchema = Joi.object({
  user_id: Joi.number(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  is_public: Joi.boolean(),
  has_multiple_choice: Joi.boolean(),
  content: Joi.string().max(255),
  indication: Joi.string().max(255),
  modified_by: Joi.string(),
});

const questionCreationValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = questionCreateSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
};

const questionUpdateValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = questionUpdateSchema.validate(payload, {
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
  questionCreationValidation,
  questionUpdateValidation,
};

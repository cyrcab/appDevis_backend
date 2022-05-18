const Joi = require('joi');

const answerCreateSchema = Joi.object({
  created_at: Joi.date(),
  updated_at: Joi.date(),
  user_id: Joi.number().required(),
  modified_by: Joi.string(),
  content: Joi.string().max(400),
  price: Joi.number().min(1)
});

const answerUpdateSchema = Joi.object({
  firstName: Joi.string().max(45),
  lastName: Joi.string().max(45),
  role_id: Joi.number(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  password: Joi.string().max(255).min(6),
  mail: Joi.string().max(255).email(),
  modified_by: Joi.string(),
});

const answerCreationValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = userCreateSchema.validate(payload, {
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
  const { error } = userUpdateSchema.validate(payload, {
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

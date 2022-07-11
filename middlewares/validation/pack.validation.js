import Joi from 'joi';

const packCreateSchema = Joi.object({
  user_id: Joi.number().required(),
  name: Joi.string().max(255).required(),
});

const packUpdateSchema = Joi.object({
  user_id: Joi.number().required(),
  name: Joi.string().max(255),
});

const packCreationValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = packCreateSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
};

const packUpdateValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = packUpdateSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
};

export { packCreationValidation, packUpdateValidation };

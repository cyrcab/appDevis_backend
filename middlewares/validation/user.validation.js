import Joi from 'joi';

const userCreateSchema = Joi.object({
  firstName: Joi.string().max(45).required(),
  lastName: Joi.string().max(45).required(),
  role_id: Joi.number().required(),
  created_at: Joi.date(),
  password: Joi.string().max(255).min(6).required(),
  mail: Joi.string().max(255).email().required(),
});

const userUpdateSchema = Joi.object({
  firstName: Joi.string().max(45),
  lastName: Joi.string().max(45),
  role_id: Joi.number(),
  password: Joi.string().max(255).min(6),
  mail: Joi.string().max(255).email(),
});

const userLoginSchema = Joi.object({
  mail: Joi.string().max(255).email().required(),
  password: Joi.string().required(),
});

const userCreationValidation = (req, res, next) => {
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

const userUpdateValidation = (req, res, next) => {
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

const userLoginValidation = (req, res, next) => {
  const payload = req.body;
  const { error } = userLoginSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    next(error);
    console.error(error);
  } else {
    next();
  }
}

export { userCreationValidation, userUpdateValidation, userLoginValidation };

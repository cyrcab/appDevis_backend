const argon = require('argon2');

const hashingOptions = {
  type: argon.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon.hash(plainPassword, hashingOptions);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon.verify(hashedPassword, plainPassword, hashingOptions);
};

module.exports = {
  hashPassword,
  verifyPassword,
};

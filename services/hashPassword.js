import argon2id, { hash, verify } from 'argon2';

const hashingOptions = {
  type: argon2id.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return hash(plainPassword, hashingOptions);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return verify(hashedPassword, plainPassword, hashingOptions);
};

export { hashPassword, verifyPassword };

const roles = [
  {
    Name: 'Admin',
  },
];
const users = [
  {
    mail: 'admin@mail.fr',
    password:
      '$argon2id$v=19$m=65536,t=5,p=1$5fHcVfQYCTVaKSWrA6LzUA$M4POlUs1M+EF6pXaCbWt0hZEW8VOKezwFeiHtuDeYI4',
    firstName: 'admin',
    lastName: 'admin',
    role_id: 1,
  },
];

export { users, roles };

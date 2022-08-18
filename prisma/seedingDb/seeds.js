const { SUPERADMIN_PASS, SUPERADMIN_MAIL } = process.env;

const roles = [
  {
    Name: 'Super Admin',
  },
  {
    Name: 'Admin',
  },
  {
    Name: 'Invité',
  },
];
const users = [
  {
    mail: SUPERADMIN_MAIL,
    password: SUPERADMIN_PASS,
    firstName: 'admin',
    lastName: 'admin',
    role_id: 1,
  },
];

export { users, roles };

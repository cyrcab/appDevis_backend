const roles = [
  {
    Name: 'Admin',
  },
  {
    Name: 'Sales',
  },
  {
    Name: 'Guest',
  },
];
const users = [
  {
    mail: 'exemple@mail.fr',
    password:
      '$argon2id$v=19$m=65536,t=5,p=1$Lkg7EVeCiXDvYUrh6OFsrw$cJ9Gz3NlHS/FDkgPSZvroqkUczpnCQx7dPzDemzGX8A',
    firstName: 'Cyril',
    lastName: 'Cabrolier',
    role_id: 1,
  },
  {
    mail: 'sale@mail.fr',
    password:
      '$argon2id$v=19$m=65536,t=5,p=1$Lkg7EVeCiXDvYUrh6OFsrw$cJ9Gz3NlHS/FDkgPSZvroqkUczpnCQx7dPzDemzGX8A',
    firstName: 'Claude',
    lastName: 'Dubois',
    role_id: 2,
  },
  {
    mail: 'guest@mail.fr',
    password:
      '$argon2id$v=19$m=65536,t=5,p=1$Lkg7EVeCiXDvYUrh6OFsrw$cJ9Gz3NlHS/FDkgPSZvroqkUczpnCQx7dPzDemzGX8A',
    firstName: 'Jules',
    lastName: 'Benetto',
    role_id: 3,
  },
];

export { users, roles };

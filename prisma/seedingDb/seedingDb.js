const prisma = require('../../helpers/prismaClient');
const { roles, users } = require('./seeds');

async function main() {
  await prisma.role.createMany({
    data: roles,
  });
  await prisma.user.createMany({
    data: users,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

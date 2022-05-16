const prisma = require('../../helpers/prismaClient');
const roles = require('./roleSeed');

async function main() {
  await prisma.role.createMany({
    data: roles,
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

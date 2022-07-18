import prisma from '../../helpers/prismaClient.js';
import { users, roles } from './seeds.js';

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

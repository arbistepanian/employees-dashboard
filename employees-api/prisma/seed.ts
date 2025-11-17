import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const apiKey = randomBytes(24).toString('hex');

  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      apiKeys: {
        create: {
          key: apiKey,
          label: 'Demo key',
        },
      },
    },
    include: { apiKeys: true },
  });

  console.log('Seeded user with API key:');
  console.log('Email:', user.email);
  console.log('API KEY:', user.apiKeys[0].key);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newPost = await prisma.post.create({
    data: { title: 'Meu primeiro post com Prisma 🚀' },
  });
  console.log('Post criado:', newPost);

  const allPosts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  console.log('Todos os posts:', allPosts);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });

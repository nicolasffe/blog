const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Rota GET posts
app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.send(posts);
});

// Rota POST criar post
app.post('/posts', async (req, res) => {
  const { title } = req.body;

  const post = await prisma.post.create({
    data: { title }
  });

  res.status(201).send(post);
});

// Rota DELETE post
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  await prisma.post.delete({
    where: { id }
  });

  res.send({ message: 'Post deletado com sucesso' });
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});


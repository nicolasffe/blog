const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Listar comentários de um post
app.get('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const comments = await prisma.comment.findMany({
    where: { postId: id },
    orderBy: { createdAt: 'desc' }
  });
  res.send(comments);
});

// Criar comentário
app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const comment = await prisma.comment.create({
    data: { content, postId: id }
  });

  res.status(201).send(comment);
});

// Deletar comentário
app.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;

  await prisma.comment.delete({ where: { id } });

  res.send({ message: 'Comentário deletado com sucesso' });
});

app.listen(4001, () => {
  console.log('🚀 Comments service running on 4001');
});



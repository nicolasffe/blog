// comments/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());
app.use(cors());


// CRIAR COMENTÁRIO
app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).send({ message: 'Content is required' });

    try {
        const comment = await prisma.comment.create({
            data: { content, postId: req.params.id, status: 'pending' }
        });
        await axios.post('http://localhost:4005/events', { type: 'CommentCreated', data: comment });
        res.status(201).send(comment);
    } catch (error) {
        res.status(500).send({ message: 'Error creating comment' });
    }
});

// DELETAR COMENTÁRIO
app.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await prisma.comment.delete({ where: { id: req.params.id } });
        await axios.post('http://localhost:4005/events', {
            type: 'CommentDeleted',
            data: { id: req.params.id, postId: comment.postId }
        });
        res.status(200).send({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting comment' });
    }
});

// CURTIR COMENTÁRIO
app.post('/comments/:id/like', async (req, res) => {
    try {
        const comment = await prisma.comment.update({
            where: { id: req.params.id },
            data: { likes: { increment: 1 } }
        });
        await axios.post('http://localhost:4005/events', { type: 'CommentLiked', data: comment });
        res.status(200).send(comment);
    } catch (error) {
        res.status(500).send({ message: 'Error liking comment' });
    }
});

// OUVIR EVENTOS
app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('[Comments Service] Event Received:', type);

    if (type === 'CommentModerated') {
        await prisma.comment.update({
            where: { id: data.id },
            data: { status: data.status }
        });
    }
    res.send({});
});

app.listen(4001, () => {
    console.log('🚀 Comments Service (v2) rodando na porta 4001');
});
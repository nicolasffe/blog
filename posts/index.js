// posts/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// --- ROTAS ---

// CRIAR POST
app.post('/posts', async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).send({ message: 'Title is required' });

    try {
        const post = await prisma.post.create({ data: { title } });
        await axios.post('http://localhost:4005/events', { type: 'PostCreated', data: post });
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ message: 'Error creating post' });
    }
});

// DELETAR POST
app.delete('/posts/:id', async (req, res) => {
    try {
        await prisma.post.delete({ where: { id: req.params.id } });
        await axios.post('http://localhost:4005/events', { type: 'PostDeleted', data: { id: req.params.id } });
        res.status(200).send({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting post' });
    }
});

// CURTIR POST
app.post('/posts/:id/like', async (req, res) => {
    try {
        const post = await prisma.post.update({
            where: { id: req.params.id },
            data: { likes: { increment: 1 } }
        });
        await axios.post('http://localhost:4005/events', { type: 'PostLiked', data: post });
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ message: 'Error liking post' });
    }
});

// OUVIR EVENTOS
app.post('/events', (req, res) => {
    console.log('[Posts Service] Event Received:', req.body.type);
    res.send({});
});


app.listen(4000, () => {
    console.log('Posts Service (v2) rodando na porta 4000');
});
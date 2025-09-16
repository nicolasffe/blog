// query/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    console.log(`[Query Service] Processing Event: ${type}`);

    if (type === 'PostCreated') {
        posts[data.id] = { ...data, comments: [] };
    }

    if (type === 'CommentCreated') {
        const post = posts[data.postId];
        if (post) post.comments.push(data);
    }

    if (type === 'PostDeleted') {
        delete posts[data.id];
    }
    
    if (type === 'CommentDeleted') {
        const post = posts[data.postId];
        if (post) {
            post.comments = post.comments.filter(c => c.id !== data.id);
        }
    }

    if (type === 'PostLiked') {
        const post = posts[data.id];
        if (post) post.likes = data.likes;
    }

    if (type === 'CommentLiked') {
        const post = posts[data.postId];
        if (post) {
            const comment = post.comments.find(c => c.id === data.id);
            if (comment) comment.likes = data.likes;
        }
    }

    if (type === 'CommentModerated') {
        const post = posts[data.postId];
        if (post) {
            const comment = post.comments.find(c => c.id === data.id);
            if (comment) comment.status = data.status;
        }
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    handleEvent(req.body.type, req.body.data);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Query Service (v2) escutando na porta 4002');
    try {
        const res = await axios.get('http://localhost:4005/events');
        for (let event of res.data) {
            handleEvent(event.type, event.data);
        }
    } catch (error) {
        console.log('[Query Service] Falha ao buscar eventos históricos.', error.message);
    }
});
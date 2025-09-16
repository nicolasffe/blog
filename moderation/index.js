// moderation/index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Evento Recebido (Moderation):', type);

    if (type === 'CommentCreated') {
        // Lógica de moderação: rejeita comentários com a palavra "orange"
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        // Emite o evento de moderação
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content // repassa o conteúdo
            }
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Serviço de Moderação escutando na porta 4003');
});
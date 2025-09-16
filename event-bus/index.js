// event-bus/index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Armazena todos os eventos que já aconteceram
const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post('http://localhost:4000/events', event).catch(err => console.log(err.message)); // Posts
  axios.post('http://localhost:4001/events', event).catch(err => console.log(err.message)); // Comments
  axios.post('http://localhost:4002/events', event).catch(err => console.log(err.message)); // Query
  axios.post('http://localhost:4003/events', event).catch(err => console.log(err.message)); // Moderation (NOVO)

  console.log(`Evento ${event.type} emitido.`);
  res.send({ status: 'OK' });
});

// Rota para fornecer todos os eventos para serviços que ficaram offline
app.get('/events', (req, res) => {
  res.send(events);
});


app.listen(4005, () => {
  console.log('Event-Bus escutando na porta 4005');
});
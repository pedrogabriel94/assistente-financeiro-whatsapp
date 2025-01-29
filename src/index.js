const express = require('express');
const app = express();
var usuarios = require('./db_fake/usuarios.json');
const natural = require('./natural/natural.js');
const db = require('./config/db_config.js');

app.use(express.json({limit: '5mb'}));

app.use('/', require('./route/generalRouter'));

app.get('/users', async (req, res) => {
  let users = await db.select('*').from('users');
  res.json(users);
});

app.get('/integrity', (req, res) => {
  res.send('Application is live');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


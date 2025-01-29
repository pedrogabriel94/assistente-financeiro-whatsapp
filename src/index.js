const express = require('express');
const app = express();
var usuarios = require('./db_fake/usuarios.json');
const messages = require('./db_fake/messages.json');
const natural = require('./natural/natural.js');
const db = require('./config/db_config.js');

app.use(express.json({limit: '5mb'}));

app.use('/', require('./route/generalRouter'));

app.post('/send-message', (req, res) => {
  sendMessage(req.body);
  res.send('Mensagem enviada com sucesso!');
});

app.get('/users', async (req, res) => {
  let users = await db.select('*').from('users');
  res.json(users);
});

app.post('/recive-message', (req, res) => {
  console.log(req.body);
  let data = req.body;
  let usuario = usuarios.find(user => user.phone === data.phone);
  if(!usuario){
    usuarios.push({
      senderName: data.senderName,
      phone: data.phone,
      numberOfMessages: 0
    });
    usuario = usuarios.find(user => user.phone === data.phone);
  } 
  if(usuario.numberOfMessages === 0) {
    let message = messages.boasVindas.replace('{{nome}}', data.senderName);
    sendMessage({
      phone: data.phone,
      message: message
    });
    usuario.numberOfMessages++;
  } else if(usuario.numberOfMessages === 1) {
    let classificacao = natural.classificar(data.text.message);
    let message = messages.registro.replace('{{tipo}}', classificacao.tipo).replace('{{valor}}', classificacao.valor);
    sendMessage({
      phone: data.phone,
      message: message
    });
    usuario.numberOfMessages++;
  } else if(usuario.numberOfMessages === 2) {
    let message = messages.confirmacao.replace('{{nome}}', data.senderName);
    sendMessage({
      phone: data.phone,
      message: message
    });
    usuario.numberOfMessages = 0;
  }
  res.send('Mensagem recebida com sucesso!');
});

app.get('/integrity', (req, res) => {
  res.send('Application is live');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


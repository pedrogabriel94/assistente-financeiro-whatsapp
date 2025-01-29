const express = require('express');
const app = express();
var usuarios = require('./db_fake/usuarios.json');
const messages = require('./db_fake/messages.json');
const natural = require('./natural/natural.js');
const db = require('./config/db_config.js');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

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

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

function sendMessage({phone, message}) {
  fetch('https://api.z-api.io//instances/3DBBBBA0188530266E0B7682C9F3CB63/token/011C19759073CF7A34B7EFF1/send-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'F8aa0edc1d04b4a15ba5f9153aa6dc976S', 
    },
    body: JSON.stringify({
      "phone": phone,
      "message": message,
    }),
  }).then((response) => response.json()).then((data) => {
    console.log(data);
  });
}
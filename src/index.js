const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/send-message', (req, res) => {
  sendMessage(req.body);
  res.send('Mensagem enviada com sucesso!');
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
      "delayMessage": 10
    }),
  }).then((response) => response.json()).then((data) => {
    console.log(data);
  });
}
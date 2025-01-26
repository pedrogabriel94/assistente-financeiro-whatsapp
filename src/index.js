const express = require('express');
const app = express();
var usuarios = require('./db/usuarios.json');
var zapiClient = require('./client/zApi-client');
var maritacaClient = require('./client/maritacaClient');

app.use(express.json());

app.get('/live', (req, res) => {
  res.send('Application is live');
});

app.post('/recive-message', async (req, res)  => {
  let data = req.body;
  let usuario = usuarios.find(user => user.phone === data.phone);
  if (!usuario) {
    usuarios.push({
      senderName: data.senderName,
      phone: data.phone
    });
  }


  let objetoResponse = await maritacaClient.classificacao(data.text.message);

  if(objetoResponse.registrar){
    // registrar despesa ou receita aqui
  }
  
  let message = objetoResponse.mensagem.replace('{nome}', data.senderName);

  // zapiClient.sendMessage({
  //   phone: data.phone,
  //   message: message
  // });

  // res.send('Mensagem recebida com sucesso!');

  res.send(message);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


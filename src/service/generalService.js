var usuarios = require('./../db_fake/usuarios.json');
var zapiClient = require('./../client/zApi-client');
var venomClient = require('./../client/venomClient');
var maritacaClient = require('./../client/maritacaClient');

async function reciveMessage(data) {
  let usuario = usuarios.find(user => user.phone === data.phone);
  if (!usuario) {
    usuarios.push({
      senderName: data.senderName,
      phone: data.phone
    });
  }

  let objetoResponse = await maritacaClient.classificacao(data.text.message);

  if (objetoResponse.registrar) {
    // registrar despesa ou receita aqui
  }

  let message = objetoResponse.mensagem.replace('{nome}', data.senderName);

  try {
    venomClient.sendMessage({
      phone: data.phone,
      message: message
    });
  } catch (error) {
    //vá pra frente
  }
}

module.exports = {
  reciveMessage
};
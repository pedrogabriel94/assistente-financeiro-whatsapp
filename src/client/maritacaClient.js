
require('dotenv').config();
const MARITACA_TOKEN = process.env.MARITACA_TOKEN;

async function classificacao(message) {
    try {
        const response = await fetch('https://chat.maritaca.ai/api/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MARITACA_TOKEN}`,
            },
            body: JSON.stringify(mountObjetoRequestMaritaca(message)),
        });

        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
    } catch (error) {
        console.error('Erro ao classificar a mensagem:', error);
        throw new Error('Erro ao processar a classificação');
    }
}

function mountObjetoRequestMaritaca(message) {
    return {
        "model": "sabia-3",
        "messages": [
            {
                "role": "system",
                "content": "Você é um assistente financeiro especializado em extrair informações de uma frase. Forneça um objeto com os seguintes atributos: 'Valor', 'Categoria', 'Tipo' (Despesa/Receita). Inclua também os atributos 'registrar' (true ou false) e 'mensagem'. A resposta deve ser uma string com o objeto, sem a palavra 'json' e sem quebras de linha. Se a frase contiver uma transação válida, o atributo 'registrar' deve ser true, e a 'mensagem' deve ser uma resposta atenciosa ao cliente, confirmando o registro. Se não for uma transação válida, 'registrar' deve ser false e a 'mensagem' deve ser algo relacionado à resposta. Sempre deve ser um objeto com essas respostas, quero que na mensagem, tenha a variavel {nome}, para que eu possa susbtituir e colocar o nome do cliente. ignore as saudaçõs"
            },
            {
                "role": "user",
                "content": message
            }
        ]
    }
}

module.exports = {
    classificacao
};

require('dotenv').config();
var prompt = require('./../db_fake/prompt.json');
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
        return JSON.parse(cleanJsonString(data.choices[0].message.content));
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
                "content": prompt.prompt
            },
            {
                "role": "user",
                "content": message
            }
        ]
    }
}

function cleanJsonString(str) {
    // Passo 1: Remover as crases
    let cleanedString = str.replace(/`/g, '');

    return cleanedString;
}

module.exports = {
    classificacao
};
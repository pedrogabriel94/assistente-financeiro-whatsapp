require('dotenv').config();
const ZAPI_INSTACE = process.env.ZAPI_INSTACE;
const ZAPI_TOKEN = process.env.ZAPI_TOKEN;
const ZAPI_CLIENT_TOKEN = process.env.ZAPI_CLIENT_TOKEN;

function sendMessage({ phone, message }) {
    fetch(`https://api.z-api.io//instances/${ZAPI_INSTACE}/token/${ZAPI_TOKEN}/send-text`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Client-Token': ZAPI_CLIENT_TOKEN,
        },
        body: JSON.stringify({
            "phone": phone,
            "message": message,
        }),
    }).then((response) => response.json()).then((data) => {
        console.log(data);
    });
}

module.exports = {
    sendMessage
};
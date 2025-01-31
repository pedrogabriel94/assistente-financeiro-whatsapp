
function sendMessage({ phone, message }) {
    fetch(`localhost:9000/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
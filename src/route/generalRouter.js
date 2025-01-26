const express = require('express');
const router = express.Router();
const generalService = require('./../service/generalService')

router.post('/recive-message', async function (req, res, next) {
    let response = await generalService.reciveMessage(req.body);
    res.send(response);
});

module.exports = router;
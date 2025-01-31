const express = require('express');
const router = express.Router();
const generalService = require('./../service/generalService')

router.post('/recive-message', async function (req, res, next) {
    await generalService.reciveMessage(req.body);
    res.end();
});

module.exports = router;
require("dotenv").config();

const express = require('express');
const router = express.Router();
verify = require('../verifyToken');

router.get('/', verify.verifyToken, async (req, res) => {
    let data = req.body;
    res.send({'message': 'Hello from recipes'});
});

module.exports = router;
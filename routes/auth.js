require("dotenv").config();

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SHA256  = require('crypto-js/sha256');


router.post('/register', async (req, res) => {
    const userData = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: SHA256(req.body.password).toString()
    })
    try {
        const newUser = await userData.save();
        let payload = { subject : newUser._id}
        let token = jwt.sign(payload, `${process.env.JWT_SECRET}`)
        res.status(200).send({token});
    } catch(err) {
        res.status(400).json({message: err.message});
    }

})

router.post('/login', async (req, res) => {
    try {
        let userData = req.body;
        const user = await User.findOne({ username: userData.username });
        if (!user) {
            res.status(401).send('Invalid username');
        } else if (user.password !== SHA256(userData.password).toString()) { 
            res.status(401).send('Invalid password');
        } else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
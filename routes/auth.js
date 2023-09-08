require("dotenv").config();

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SHA256  = require('crypto-js/sha256');


router.post('/register', async (req, res) => {
    // Create a database entry for the user from data sent in the request body
    const userData = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        // Hash the password before storing it in the database
        password: SHA256(req.body.password).toString()
    })
    try {
        // Validate that the username and email are unique
        if (await User.findOne({'username' : req.body.username})) {
            return res.status(401).send('Username already exists');
        }
        if (await User.findOne({'email' : req.body.email})) {
            return res.status(401).send('Email already exists');
        }
        // Save the user to the database
        const newUser = await userData.save();
        // Create a token for the user
        let payload = { subject : newUser._id}
        let token = jwt.sign(payload, `${process.env.JWT_SECRET}`)

        // Find the user in the database and send the token and userID to the client
        let user = await User.findOne({ username: userData.username })
        let userID = user._id;

        res.status(200).send({token, userID});

    } catch(err) {
        // If there is an error, send the error message to the client
        res.status(400).json({message: err.message});
    }

})

router.post('/login', async (req, res) => {
    try {
        // Find the user in the database
        let userData = req.body;
        const user = await User.findOne({ username: userData.username });
        // If the user is not found, return 401 with an error message
        if (!user) {
            res.status(401).send('Invalid username');
        } 
        else if (user.password !== SHA256(userData.password).toString()) { 
            res.status(401).send('Invalid password');
        } 
        // If the user is found, create a token and send it to the client
        else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, `${process.env.JWT_SECRET}`);
            let userID = user._id;
            res.status(200).send({ token, userID });
        }
    } catch (err) {
        // If there is an error, send the error message to the client
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
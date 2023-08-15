const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    const userData = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    })
    // TODO: Hash password for encryption
    try {
        const newUser = await userData.save();
        let payload = { subject : newUser._id}
        // TODO: Change secretKey to a more secure key
        let token = jwt.sign(payload, 'secretKey')
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
        } else if (user.password !== userData.password) { // TODO: check against hashed password
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
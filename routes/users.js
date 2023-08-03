const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

// Get one user
router.get('/:id', getUser,(req, res) => {
    res.json(res.user);
});

// Create one user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

// Update one user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.phoneNumber != null) {
        res.user.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try{
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err){
        res.status(400).json({message: err.message});
    }
});

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.deleteOne()
        res.json({ message : 'Deleted user'})

    } catch (err){
        res.status(500).json({message: err.message});
    }
});


// Middleware to get the user by ID
async function getUser(req, res, next){
    try{
        user = await User.findById(req.params.id);
        if (user == null){
            return res.status(404).json({message: 'Cannot find user'});
        }
    } catch (err){
        return res.status(500).json({message: err.message});
    }
    res.user = user;
    next();
}

module.exports = router;
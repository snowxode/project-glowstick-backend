require("dotenv").config();

const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
verify = require('../verifyToken');

// Get all recipes - This is just for testing purposes
router.get('/', verify.verifyToken, async (req, res) => {
    try{
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

// Get all recipes for a user
router.get('/:id', verify.verifyToken, getRecipes, (req, res) => {
    res.json(res.recipe);
});

async function getRecipes(req, res, next){
    try{
        recipe = await Recipe.find({'userID' : req.params.id});
        if (recipe == null){
            return res.status(404).json({message: 'Cannot find any recipies for this user'});
        }
    } catch (err){
        return res.status(500).json({message: err.message});
    }
    res.recipes = recipe;
    next();
}

module.exports = router;
const express = require('express');
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe } = require("../controller/recipe")
const router = express.Router();

router.get("/",getRecipes) //Get all recipes
router.get("/:id",getRecipe) //Get recipe by id
router.post("/",addRecipe) // Add Recipe
router.put("/:id",editRecipe) //Edit recipe
router.delete("/:id",deleteRecipe) //Delete Recipe

module.exports = router
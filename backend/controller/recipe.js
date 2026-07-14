const Recipes = require("../models/recipe")

const getRecipes = async(req, res)=>{
    const recipes = await Recipes.find()
    return res.json(recipes)
}
const getRecipe = async(req, res)=>{
    const recipe = await Recipes.findById(req.params.id)
    res.json(recipe)
}
const addRecipe = async (req, res) => {
    const { title, ingredients, instructions } = req.body;

    if (!title || !ingredients || !instructions) {
        return res.status(400).json({
            message: "Required fields can't be empty"
        });
    }

    const recipe = await Recipes.create(req.body);

    res.status(201).json(recipe);
};
const editRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.json(recipe);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const deleteRecipe = (req, res)=>{
    res.json({message: "hello"})
}

module.exports = {getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe}
const Recipes = require("../models/recipe")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.fieldname
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

const getRecipes = async(req, res)=>{
    const recipes = await Recipes.find()
    return res.json(recipes)
}
const getRecipe = async(req, res)=>{
    const recipe = await Recipes.findById(req.params.id)
    res.json(recipe)
}
const addRecipe = async (req, res) => {
    console.log(req.user)
    const { title, ingredients, instructions, time } = req.body;
    const coverImage = req.file.filename;

    if (!title || !ingredients || !instructions) {
        return res.status(400).json({
            message: "Required fields can't be empty"
        });
    }

    if (!req.file) {
        return res.status(400).json({
            message: "Cover image is required"
        });
    }

    const recipe = await Recipes.create({
        title,
        ingredients,
        instructions,
        time,
        coverImage: req.file.filename
    });

    return res.status(201).json(recipe);
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

module.exports = {getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload}
const Recipes = require("../models/recipe");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },

    filename: function (req, file, cb) {
        const filename =
            Date.now() +
            "-" +
            file.fieldname +
            path.extname(file.originalname);

        cb(null, filename);
    }
});

const upload = multer({ storage: storage });


// GET ALL RECIPES
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipes.find();
        return res.json(recipes);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


// GET SINGLE RECIPE
const getRecipe = async (req, res) => {
    try {

        const recipe = await Recipes.findById(req.params.id);

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


// ADD RECIPE
const addRecipe = async (req, res) => {

    try {

        const { title, ingredients, instructions, time } = req.body;

        // Check text fields
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({
                message: "Required fields can't be empty"
            });
        }

        // Check image
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
            coverImage: req.file.filename,
            createdBy: req.user.id
        });

        return res.status(201).json(recipe);

    } catch (err) {

        console.log("ADD RECIPE ERROR:", err);

        return res.status(500).json({
            message: err.message
        });
    }
};


// EDIT RECIPE
const editRecipe = async (req, res) => {

    try {

        // 1️⃣ First find the existing recipe
        const oldRecipe = await Recipes.findById(req.params.id);

        if (!oldRecipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }


        // 2️⃣ If user selected a new image,
        // use the new image.
        // Otherwise keep the old image.
        const coverImage = req.file
            ? req.file.filename
            : oldRecipe.coverImage;


        // 3️⃣ Update recipe
        const recipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                coverImage
            },
            {
                new: true
            }
        );


        // 4️⃣ Send updated recipe
        res.json(recipe);

    } catch (err) {

        console.log("EDIT RECIPE ERROR:", err);

        res.status(500).json({
            message: err.message
        });
    }
};


// DELETE RECIPE
const deleteRecipe = async(req, res) => {
    
};


module.exports = {
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe,
    upload
};
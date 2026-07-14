const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userSignUp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password is required"
        });
    }

    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({
            error: "Email already exists"
        });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        password: hashPwd
    });

    const token = jwt.sign(
        {
            email,
            id: newUser._id
        },
        process.env.SECRET_KEY
    );

    return res.status(201).json({
        token,
        user: newUser
    });
};
const userLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password is required"
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            error: "Invalid credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            error: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        {
            email: user.email,
            id: user._id
        },
        process.env.SECRET_KEY
    );

    return res.status(200).json({
        token,
        user
    });
};
const getUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


module.exports = {userSignUp,userLogin,getUser}
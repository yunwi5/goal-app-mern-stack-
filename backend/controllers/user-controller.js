const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user-model');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d' // expires in 1 day
    });
}

// @desc Authenticate new user
// @router POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add name, email and password!');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists!');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        console.log(user);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data!');
    }
});

// @desc Authenticate existing user
// @router POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for the availability
    const user = await User.findOne({ email });
    if (!email || !password || !user) {
        res.status(404);
        throw new Error('User info not foud.');
    }

    // left is plain password, right is hashed password
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(400);
        throw new Error('Invalid user credentials!');
    }

    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    });
});

// @desc Get user data
// @router GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({ id: _id, name, email });
});

module.exports = {
    registerUser,
    loginUser,
    getMe
};

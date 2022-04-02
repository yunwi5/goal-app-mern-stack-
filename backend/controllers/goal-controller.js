const asyncHandler = require('express-async-handler');

// @route GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals!' });
});

// route POST /api/goals
const postGoal = asyncHandler(async (req, res) => {
    console.log(req.body);
    if (!req.body.text) {
        res.status(400);
        throw new Error('Plase add a new textfield!');
    }
    res.status(201).json({ message: 'Post goals!' });
});

// @route PUT /api/goals/:id
const putGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Update goal ${id}!` });
});

// @route DELETE /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete goal ${id}!` });
});

module.exports = {
    getGoals,
    postGoal,
    putGoal,
    deleteGoal,
};

const asyncHandler = require('express-async-handler');
const Goal = require('../models/goal-model'); // Goal model
const User = require('../models/user-model');

// @route GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

// route POST /api/goals
const postGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Plase add a new textfield!');
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    });
    res.status(201).json(goal);
});

// @route PUT /api/goals/:id
const putGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const goal = await Goal.findById(id);
    if (!goal) {
        res.status(404);
        throw new Error('Goal not found.');
    }

    const user = await User.findById(req.user.id);
    // check for user
    if (!user) {
        res.status(401);
        throw new Error('User not found.');
    }
    // Make sure the loggedIn user matches the goal owner.
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User is not the owner.');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedGoal);
});

// @route DELETE /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const goal = await Goal.findById(id);
    if (!goal) {
        res.status(404);
        throw new Error('Goal not found.');
    }
    await goal.remove();

    const user = await User.findById(req.user.id);
    // check for user
    if (!user) {
        res.status(401);
        throw new Error('User not found.');
    }
    // Make sure the loggedIn user matches the goal owner.
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User is not the owner.');
    }

    res.json({ id });
});

module.exports = {
    getGoals,
    postGoal,
    putGoal,
    deleteGoal,
};

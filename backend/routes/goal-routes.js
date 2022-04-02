const express = require('express');
const router = express.Router();

const { getGoals, postGoal, putGoal, deleteGoal } = require('../controllers/goal-controller');
const { protect } = require('../middleware/auth-middleware');

router.route('/').get(protect, getGoals).post(protect, postGoal);
router.route('/:id').put(protect, putGoal).delete(protect, deleteGoal);

module.exports = router;

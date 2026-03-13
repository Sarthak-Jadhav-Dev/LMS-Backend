const express = require('express');
const { getAchievements, getMyRewards, createAchievement } = require('../controllers/achievements');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
    .route('/')
    .get(getAchievements)
    .post(authorize('admin'), createAchievement);

router.get('/my-rewards', authorize('student'), getMyRewards);

module.exports = router;

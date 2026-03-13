const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const Achievement = require('../models/Achievement');
const StudentReward = require('../models/StudentReward');

// @desc    Get all achievements
// @route   GET /api/v1/achievements
// @access  Private
exports.getAchievements = asyncHandler(async (req, res, next) => {
    const achievements = await Achievement.find();
    res.status(200).json({ success: true, count: achievements.length, data: achievements });
});

// @desc    Get my rewards
// @route   GET /api/v1/achievements/my-rewards
// @access  Private/Student
exports.getMyRewards = asyncHandler(async (req, res, next) => {
    const rewards = await StudentReward.find({ student: req.user.id }).populate('achievement');
    res.status(200).json({ success: true, count: rewards.length, data: rewards });
});

// @desc    Create achievement
// @route   POST /api/v1/achievements
// @access  Private/Admin
exports.createAchievement = asyncHandler(async (req, res, next) => {
    const achievement = await Achievement.create(req.body);
    res.status(201).json({ success: true, data: achievement });
});

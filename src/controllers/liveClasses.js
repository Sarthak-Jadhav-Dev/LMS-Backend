const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const LiveClass = require('../models/LiveClass');

// @desc    Get live classes
// @route   GET /api/v1/live-classes
// @access  Private
exports.getLiveClasses = asyncHandler(async (req, res, next) => {
    const classes = await LiveClass.find().populate('course teacher');
    res.status(200).json({ success: true, count: classes.length, data: classes });
});

// @desc    Schedule a live class
// @route   POST /api/v1/live-classes
// @access  Private/Teacher
exports.scheduleLiveClass = asyncHandler(async (req, res, next) => {
    req.body.teacher = req.user.id;
    const liveClass = await LiveClass.create(req.body);
    res.status(201).json({ success: true, data: liveClass });
});

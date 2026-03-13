const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const Progress = require('../models/Progress');
const QuizAttempt = require('../models/QuizAttempt');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate('children').populate('studentProfile.enrolledCourses');
    if (!user) return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    res.status(200).json({ success: true, data: user });
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: user });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
});

// PARENT DASHBOARD APIs

// @desc    Get parent's children
// @route   GET /api/v1/users/parent/children
// @access  Private/Parent
exports.getChildren = asyncHandler(async (req, res, next) => {
    const parent = await User.findById(req.user.id).populate({
        path: 'children',
        populate: { path: 'studentProfile.enrolledCourses' }
    });

    if (!parent || parent.role !== 'parent') {
        return next(new ErrorResponse('Not authorized or not a parent', 403));
    }

    res.status(200).json({ success: true, count: parent.children.length, data: parent.children });
});

// @desc    Get child progress
// @route   GET /api/v1/users/parent/children/:childId/progress
// @access  Private/Parent
exports.getChildProgress = asyncHandler(async (req, res, next) => {
    // Ensure the requesting parent actually owns this child
    const parent = await User.findById(req.user.id);
    if (!parent.children.includes(req.params.childId)) {
        return next(new ErrorResponse('Not authorized to access this child', 403));
    }

    const progress = await Progress.find({ student: req.params.childId }).populate('course');
    res.status(200).json({ success: true, data: progress });
});

// @desc    Get child quiz results
// @route   GET /api/v1/users/parent/children/:childId/quizzes
// @access  Private/Parent
exports.getChildQuizzes = asyncHandler(async (req, res, next) => {
    const parent = await User.findById(req.user.id);
    if (!parent.children.includes(req.params.childId)) {
        return next(new ErrorResponse('Not authorized to access this child', 403));
    }

    const attempts = await QuizAttempt.find({ student: req.params.childId }).populate('quiz');
    res.status(200).json({ success: true, data: attempts });
});

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const Course = require('../models/Course');
const QuizAttempt = require('../models/QuizAttempt');

// @desc    Get admin analytics overview
// @route   GET /api/v1/admin/analytics
// @access  Private/Admin
exports.getAnalytics = asyncHandler(async (req, res, next) => {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();

    // Dummy calculations for revenue and rates:
    const revenue = totalCourses * 50; // assuming $50 average

    const allAttempts = await QuizAttempt.find();
    const passedAttempts = allAttempts.filter(a => a.passed);
    const quizSuccessRate = allAttempts.length > 0 ? (passedAttempts.length / allAttempts.length) * 100 : 0;

    res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalStudents,
            totalCourses,
            revenue,
            quizSuccessRate: quizSuccessRate.toFixed(2) + '%'
        }
    });
});

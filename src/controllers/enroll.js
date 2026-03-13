const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Progress = require('../models/Progress');

// @desc    Enroll in a course
// @route   POST /api/v1/enroll/:courseId
// @access  Private/Student
exports.enrollCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
        return next(new ErrorResponse(`No course with id ${req.params.courseId}`, 404));
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ student: req.user.id, course: req.params.courseId });
    if (existingEnrollment) {
        return next(new ErrorResponse(`Student is already enrolled in this course`, 400));
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
        student: req.user.id,
        course: req.params.courseId
    });

    // Create initial progress record
    await Progress.create({
        student: req.user.id,
        course: req.params.courseId
    });

    res.status(201).json({ success: true, data: enrollment });
});

// @desc    Get student enrollments
// @route   GET /api/v1/enroll/my-enrollments
// @access  Private/Student
exports.getMyEnrollments = asyncHandler(async (req, res, next) => {
    const enrollments = await Enrollment.find({ student: req.user.id }).populate('course');
    res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
});

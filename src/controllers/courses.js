const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find().populate('teacher', 'name email avatar').populate('modules');
    res.status(200).json({ success: true, count: courses.length, data: courses });
});

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id)
        .populate('teacher', 'name email')
        .populate({
            path: 'modules',
            populate: { path: 'lessons' }
        });

    if (!course) {
        return next(new ErrorResponse(`No course found with the id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: course });
});

// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private/Teacher
exports.createCourse = asyncHandler(async (req, res, next) => {
    req.body.teacher = req.user.id; // user connected to the course

    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
});

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private/Teacher
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`No course found with the id of ${req.params.id}`, 404));
    }

    // Make sure user is course owner or admin
    if (course.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update course`, 401));
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: course });
});

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private/Teacher
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`No course found with the id of ${req.params.id}`, 404));
    }

    // Make sure user is course owner
    if (course.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete course`, 401));
    }

    await course.deleteOne();
    res.status(200).json({ success: true, data: {} });
});

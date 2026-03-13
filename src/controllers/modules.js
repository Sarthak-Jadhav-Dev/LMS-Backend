const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const Module = require('../models/Module');
const Course = require('../models/Course');

// @desc    Get modules
// @route   GET /api/v1/modules
// @route   GET /api/v1/courses/:courseId/modules
// @access  Public
exports.getModules = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.courseId) {
        query = Module.find({ course: req.params.courseId }).populate('lessons');
    } else {
        query = Module.find().populate({ path: 'course', select: 'title description' });
    }

    const modules = await query;
    res.status(200).json({ success: true, count: modules.length, data: modules });
});

// @desc    Add a module to course
// @route   POST /api/v1/courses/:courseId/modules
// @access  Private/Teacher
exports.addModule = asyncHandler(async (req, res, next) => {
    req.body.course = req.params.courseId;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
        return next(new ErrorResponse(`No course with id of ${req.params.courseId}`, 404));
    }

    // Make sure user is course teacher
    if (course.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User is not authorized to add a module to course ${course._id}`, 401));
    }

    const moduleObj = await Module.create(req.body);

    // add module to course's modules array
    course.modules.push(moduleObj._id);
    await course.save();

    res.status(201).json({ success: true, data: moduleObj });
});

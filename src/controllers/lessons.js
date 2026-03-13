const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const Lesson = require('../models/Lesson');
const Module = require('../models/Module');
const Course = require('../models/Course'); // To check teacher ownership

// @desc    Get lessons
// @route   GET /api/v1/lessons
// @route   GET /api/v1/modules/:moduleId/lessons
// @access  Public
exports.getLessons = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.moduleId) {
        query = Lesson.find({ module: req.params.moduleId });
    } else {
        query = Lesson.find().populate({ path: 'module', select: 'title course' });
    }

    const lessons = await query;
    res.status(200).json({ success: true, count: lessons.length, data: lessons });
});

// @desc    Get single lesson
// @route   GET /api/v1/lessons/:id
// @access  Public
exports.getLesson = asyncHandler(async (req, res, next) => {
    const lesson = await Lesson.findById(req.params.id).populate({
        path: 'module',
        select: 'title course'
    });

    if (!lesson) {
        return next(new ErrorResponse(`No lesson found with the id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: lesson });
});

// @desc    Add lesson
// @route   POST /api/v1/modules/:moduleId/lessons
// @access  Private/Teacher
exports.addLesson = asyncHandler(async (req, res, next) => {
    req.body.module = req.params.moduleId;

    const moduleObj = await Module.findById(req.params.moduleId).populate('course');

    if (!moduleObj) {
        return next(new ErrorResponse(`No module with the id of ${req.params.moduleId}`, 404));
    }

    // Make sure user is course teacher
    if (moduleObj.course.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User is not authorized to add lesson to module ${moduleObj._id}`, 401));
    }

    const lesson = await Lesson.create(req.body);

    // add lesson to module's lessons array
    moduleObj.lessons.push(lesson._id);
    await moduleObj.save();

    res.status(201).json({ success: true, data: lesson });
});

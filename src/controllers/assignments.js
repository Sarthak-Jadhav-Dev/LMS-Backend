const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Course = require('../models/Course');

// @desc    Get assignments for a course
// @route   GET /api/v1/courses/:courseId/assignments
// @route   GET /api/v1/assignments
// @access  Private
exports.getAssignments = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.courseId) {
        query = Assignment.find({ course: req.params.courseId });
    } else {
        query = Assignment.find().populate({ path: 'course', select: 'title' });
    }

    const assignments = await query;
    res.status(200).json({ success: true, count: assignments.length, data: assignments });
});

// @desc    Create an assignment
// @route   POST /api/v1/courses/:courseId/assignments
// @access  Private/Teacher
exports.createAssignment = asyncHandler(async (req, res, next) => {
    req.body.course = req.params.courseId;

    const course = await Course.findById(req.params.courseId);
    if (!course) return next(new ErrorResponse(`No course with id ${req.params.courseId}`, 404));

    if (course.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to add assignment to course`, 401));
    }

    const assignment = await Assignment.create(req.body);
    res.status(201).json({ success: true, data: assignment });
});

// @desc    Submit assignment
// @route   POST /api/v1/assignments/:id/submit
// @access  Private/Student
exports.submitAssignment = asyncHandler(async (req, res, next) => {
    req.body.student = req.user.id;
    req.body.assignment = req.params.id;

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return next(new ErrorResponse('Assignment not found', 404));

    // Handle file uploads (assuming URLs are passed in body for now)
    const submission = await Submission.create(req.body);
    res.status(201).json({ success: true, data: submission });
});

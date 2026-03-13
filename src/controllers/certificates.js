const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const Certificate = require('../models/Certificate');

// @desc    Get user's certificates
// @route   GET /api/v1/certificates
// @access  Private/Student
exports.getCertificates = asyncHandler(async (req, res, next) => {
    const certificates = await Certificate.find({ student: req.user.id }).populate('course');
    res.status(200).json({ success: true, count: certificates.length, data: certificates });
});

// @desc    Issue a certificate
// @route   POST /api/v1/certificates
// @access  Private/Admin
exports.issueCertificate = asyncHandler(async (req, res, next) => {
    const certificate = await Certificate.create(req.body);
    res.status(201).json({ success: true, data: certificate });
});

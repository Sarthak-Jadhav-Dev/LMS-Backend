const express = require('express');
const { getAssignments, createAssignment, submitAssignment } = require('../controllers/assignments');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
    .route('/')
    .get(getAssignments)
    .post(authorize('teacher', 'admin'), createAssignment);

router.post('/:id/submit', authorize('student'), submitAssignment);

module.exports = router;

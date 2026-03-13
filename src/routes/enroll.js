const express = require('express');
const { enrollCourse, getMyEnrollments } = require('../controllers/enroll');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('student'));

router.post('/:courseId', enrollCourse);
router.get('/my-enrollments', getMyEnrollments);

module.exports = router;

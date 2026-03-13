const express = require('express');
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courses');

// Include other resource routers
const moduleRouter = require('./modules');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:courseId/modules', moduleRouter);

router
    .route('/')
    .get(getCourses)
    .post(protect, authorize('teacher', 'admin'), createCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(protect, authorize('teacher', 'admin'), updateCourse)
    .delete(protect, authorize('teacher', 'admin'), deleteCourse);

module.exports = router;

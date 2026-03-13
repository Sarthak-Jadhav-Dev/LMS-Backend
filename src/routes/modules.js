const express = require('express');
const { getModules, addModule } = require('../controllers/modules');

// Include lesson router
const lessonRouter = require('./lessons');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:moduleId/lessons', lessonRouter);

router
    .route('/')
    .get(getModules)
    .post(protect, authorize('teacher', 'admin'), addModule);

module.exports = router;

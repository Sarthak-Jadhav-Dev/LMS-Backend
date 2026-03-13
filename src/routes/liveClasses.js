const express = require('express');
const { getLiveClasses, scheduleLiveClass } = require('../controllers/liveClasses');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
    .route('/')
    .get(getLiveClasses)
    .post(authorize('teacher', 'admin'), scheduleLiveClass);

module.exports = router;

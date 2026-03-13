const express = require('express');
const { getLessons, getLesson, addLesson } = require('../controllers/lessons');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(getLessons)
    .post(protect, authorize('teacher', 'admin'), addLesson);

router
    .route('/:id')
    .get(getLesson);

module.exports = router;

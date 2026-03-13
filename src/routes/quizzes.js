const express = require('express');
const { getQuiz, submitQuiz } = require('../controllers/quizzes');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/lessons/:lessonId/quiz', getQuiz);
router.post('/:id/attempt', authorize('student'), submitQuiz);

module.exports = router;

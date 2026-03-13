const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const Question = require('../models/Question');

// @desc    Get quiz for a lesson
// @route   GET /api/v1/lessons/:lessonId/quiz
// @access  Private
exports.getQuiz = asyncHandler(async (req, res, next) => {
    const quiz = await Quiz.findOne({ lesson: req.params.lessonId }).populate('questions');
    if (!quiz) return next(new ErrorResponse('Quiz not found for this lesson', 404));

    // Hide correctness from questions when sending to student
    const sanitizedQuiz = quiz.toObject();
    if (req.user.role === 'student' || req.user.role === 'parent') {
        sanitizedQuiz.questions.forEach(q => {
            q.options.forEach(opt => delete opt.isCorrect);
            delete q.explanation;
        });
    }

    res.status(200).json({ success: true, data: sanitizedQuiz });
});

// @desc    Submit a quiz attempt
// @route   POST /api/v1/quizzes/:id/attempt
// @access  Private/Student
exports.submitQuiz = asyncHandler(async (req, res, next) => {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id).populate('questions');

    if (!quiz) return next(new ErrorResponse('Quiz not found', 404));

    // Calculate score
    let correctCount = 0;
    const attemptAnswers = [];

    for (const answer of answers) {
        const question = quiz.questions.find(q => q._id.toString() === answer.questionId);
        if (!question) continue;

        const selectedOption = question.options.find(opt => opt.text === answer.selectedOptionText);
        const isCorrect = selectedOption ? selectedOption.isCorrect : false;
        if (isCorrect) correctCount++;

        attemptAnswers.push({
            question: question._id,
            selectedOptionText: answer.selectedOptionText,
            isCorrect
        });
    }

    const score = (correctCount / quiz.questions.length) * 100;
    const passed = score >= quiz.passingScore;

    const attempt = await QuizAttempt.create({
        student: req.user.id,
        quiz: quiz._id,
        score,
        answers: attemptAnswers,
        passed
    });

    res.status(201).json({ success: true, data: attempt });
});

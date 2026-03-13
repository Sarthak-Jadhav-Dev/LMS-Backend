const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    answers: [{
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        selectedOptionText: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
    passed: { type: Boolean, required: true },
    attemptedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);

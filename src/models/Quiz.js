const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    passingScore: { type: Number, required: true, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    questionText: { type: String, required: true },
    options: [{
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true, default: false }
    }],
    explanation: { type: String } // Explanation for the correct answer
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);

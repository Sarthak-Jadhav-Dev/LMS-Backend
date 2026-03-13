const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    files: [{
        name: { type: String },
        url: { type: String }
    }],
    grade: { type: Number, min: 0, max: 100 },
    feedback: { type: String },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['submitted', 'graded', 'late'], default: 'submitted' }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);

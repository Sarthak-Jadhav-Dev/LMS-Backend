const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    progressPercentage: { type: Number, default: 0, min: 0, max: 100 },
    lastAccessed: { type: Date, default: Date.now }
}, { timestamps: true });

// Ensure one progress record per student per course
progressSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);

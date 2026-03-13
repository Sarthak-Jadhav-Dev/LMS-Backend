const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    attachments: [{
        name: { type: String },
        url: { type: String }
    }],
    dueDate: { type: Date, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' } // Optional, if assignment is attached to a specific lesson
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);

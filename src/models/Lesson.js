const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    type: { type: String, enum: ['video', 'pdf', 'quiz', 'game'], required: true },
    videoUrl: { type: String },
    content: { type: String }, // For text/pdf based lessons, could be HTML or text
    attachments: [{
        name: { type: String },
        url: { type: String }
    }],
    duration: { type: Number }, // in minutes
    order: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);

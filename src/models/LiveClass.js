const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meetingLink: { type: String, required: true },
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // duration in minutes
    status: { type: String, enum: ['scheduled', 'ongoing', 'completed', 'cancelled'], default: 'scheduled' }
}, { timestamps: true });

module.exports = mongoose.model('LiveClass', liveClassSchema);

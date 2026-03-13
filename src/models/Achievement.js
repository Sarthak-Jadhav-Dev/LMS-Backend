const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    badgeIcon: { type: String }, // URL or identifier for the badge image
    pointsRequired: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);

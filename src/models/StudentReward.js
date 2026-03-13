const mongoose = require('mongoose');

const studentRewardSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    achievement: { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement', required: true },
    earnedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// A student can earn a specific achievement only once
studentRewardSchema.index({ student: 1, achievement: 1 }, { unique: true });

module.exports = mongoose.model('StudentReward', studentRewardSchema);

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    ageGroup: { type: String, required: true },
    difficultyLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
    thumbnail: { type: String },
    price: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    ratings: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0 }
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['admin', 'teacher', 'student', 'parent'], default: 'student' },
    avatar: { type: String, default: '' },
    phone: { type: String, trim: true },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },

    // Parent specific
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Student specific
    studentProfile: {
        grade: { type: String },
        enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
        achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }]
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const courses = require('./routes/courses');
const modules = require('./routes/modules');
const lessons = require('./routes/lessons');
const enroll = require('./routes/enroll');
const quizzes = require('./routes/quizzes');
const assignments = require('./routes/assignments');
const achievements = require('./routes/achievements');
const notifications = require('./routes/notifications');
const liveClasses = require('./routes/liveClasses');
const certificates = require('./routes/certificates');
const analytics = require('./routes/analytics');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Base Route
app.get('/', (req, res) => {
    res.json({ message: 'Kids LMS Backend API is running' });
});

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/courses', courses);
app.use('/api/v1/modules', modules);
app.use('/api/v1/lessons', lessons);
app.use('/api/v1/enroll', enroll);
app.use('/api/v1/quizzes', quizzes);
app.use('/api/v1/assignments', assignments);
app.use('/api/v1/achievements', achievements);
app.use('/api/v1/notifications', notifications);
app.use('/api/v1/live-classes', liveClasses);
app.use('/api/v1/certificates', certificates);
app.use('/api/v1/admin/analytics', analytics);

// Global Error Handler
app.use(errorHandler);

module.exports = app;

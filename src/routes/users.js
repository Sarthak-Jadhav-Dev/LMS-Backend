const express = require('express');
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getChildren,
    getChildProgress,
    getChildQuizzes
} = require('../controllers/users');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Apply protection to all routes
router.use(protect);

// Parent specific routes
router.get('/parent/children', authorize('parent'), getChildren);
router.get('/parent/children/:childId/progress', authorize('parent'), getChildProgress);
router.get('/parent/children/:childId/quizzes', authorize('parent'), getChildQuizzes);

// Admin specific routes
router.use(authorize('admin'));
router.route('/').get(getUsers);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;

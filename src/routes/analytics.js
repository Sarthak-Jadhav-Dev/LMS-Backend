const express = require('express');
const { getAnalytics } = require('../controllers/analytics');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/', getAnalytics);

module.exports = router;

const express = require('express');
const { getCertificates, issueCertificate } = require('../controllers/certificates');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
    .route('/')
    .get(authorize('student'), getCertificates)
    .post(authorize('admin'), issueCertificate);

module.exports = router;

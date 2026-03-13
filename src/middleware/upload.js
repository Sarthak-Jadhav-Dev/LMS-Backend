const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

// Storage config
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter(req, file, cb) {
        // Only allow specific mimetypes
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'video/mp4'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new ErrorResponse(`File type ${file.mimetype} completely not supported`, 400), false);
        }
    }
});

module.exports = upload;

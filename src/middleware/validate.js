const ErrorResponse = require('../utils/errorResponse');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errMessages = error.details.map((detail) => detail.message).join(', ');
        return next(new ErrorResponse(errMessages, 400));
    }
    next();
};

module.exports = validate;

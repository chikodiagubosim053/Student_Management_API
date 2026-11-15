const { body, validationResult } = require('express-validator');

const studentValidation = [

    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Enter a valid email address'),

    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required'),

    body('department')
        .trim()
        .notEmpty()
        .withMessage('Department is required')

];

const validateStudent = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });

    }

    next();

};

const updateStudentValidation = [

    body('fullName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Full name cannot be empty'),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Enter a valid email address'),

    body('phoneNumber')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Phone number cannot be empty'),

    body('department')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Department cannot be empty')

];

module.exports = {
    studentValidation,
    validateStudent,
    updateStudentValidation
}
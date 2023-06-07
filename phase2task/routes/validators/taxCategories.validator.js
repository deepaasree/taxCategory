const { check, body, param, query } = require('express-validator');

const taxCategoryValidator = {
    createCategoryValidator: [body('name').isString().withMessage('Category Name is Invalid').trim().notEmpty().withMessage('Category Name cannot be Empty'),
    body('taxFor').isIn(['SPECIFIC_POSTAL_CODE', 'ALL_POSTAL_CODES']),body('otherZoneRate').isFloat(),
    body('isEnabled').isBoolean(),body('taxCategoryId').isInt()],
    
    categoryIdValidator: [param('id').isInt().withMessage('Category ID must be an integer').notEmpty().withMessage('Category ID cannot be Empty')],
    categoryBodyValidator: [body('name').isString().withMessage('Category Name must be String').trim().notEmpty().withMessage('Category name nust not be Empty')]
}
module.exports.taxCategoryValidator = taxCategoryValidator;
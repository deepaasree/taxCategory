const { to, ReS, ReE, TE } = require('../global_functions');
const TaxCategoriesService = require('../services/taxCategories.service');
const router = require('express').Router({ mergeParams: true });
const Validation = require('../middleware/validate-schema');
const TaxCategoryValidation = require('../routes/validators/taxCategories.validator').taxCategoryValidator;

/**
 * Original Author : DEEPAASREE VK
 * Author	       : DEEPAASREE VK
 * Created On	   : 22-05-2023
 * Modified on     : 22-05-2023	
 * Function        : addCategory
 * Function is used to add Tax Category details along with Zone Mapping details based on Speific Zone
 */

// const addCategory = async function (req, res) {
//     let [error, newData] = await to(TaxCategoriesService.findCategory(req.body));
//     if(newData===undefined){
//         let [categoryErr, categoryData]
//     }
//     if (error) return ReE(res, error, 422);
//     if (newData) return ReS(res, newData, 200);
// }

/**
 * Original Author : DEEPAASREE VK
 * Author	       : DEEPAASREE VK
 * Created On	   : 22-05-2023
 * Modified on     : 22-05-2023	
 * Function        : findAllCategory
 * Function is used to display all catgories
 */

const findAllCategory = async function (req, res) {
    let [error, allCategory] = await to(TaxCategoriesService.getAllCategories());
    if (error) return ReE(res, error, 422);
    if (allCategory) return ReS(res, allCategory, 200);
}
module.exports.findAllCategory = findAllCategory;
/**
 * Original Author : DEEPAASREE VK
 * Author	       : DEEPAASREE VK
 * Created On	   : 22-05-2023
 * Modified on     : 22-05-2023	
 * Function        : editCategory
 * Function is used to edit the Tax Category details based on given ID
 */

const editCategory = async function (req, res) {
    const categoryId = req && req.params.id ? req && req.params.id : null;
    const categoryData = req && req.body ? req && req.body : null;
    let [error, data] = await to(TaxCategoriesService.editCategory(categoryId, categoryData));
    if (error) return ReE(res, error, 422);
    if (data) return ReS(res, data, 200);
}

/**
 * Original Author : DEEPAASREE VK
 * Author	       : DEEPAASREE VK
 * Created On	   : 22-05-2023
 * Modified on     : 22-05-2023	
 * Function        : softDeleteCategoryById
 * Function is used to soft delete the category based on ID
 */

const softDeleteCategoryById = async function (req, res) {
    const categoryId = req && req.params.id ? req && req.params.id : null;
    let [err, deletedCategory] = await to(TaxCategoriesService.softDeleteCategoryById(categoryId));
    if (err) return ReE(res, err, 422);
    if (deletedCategory) return ReS(res, deletedCategory, 200)
}


// router.post('/', TaxCategoryValidation.createCategoryValidator, Validation.validate, addCategory);
router.get('/category', findAllCategory);
router.post('/category/:id', TaxCategoryValidation.categoryIdValidator, TaxCategoryValidation.categoryBodyValidator, editCategory);
router.get('/taxcategories/:id', TaxCategoryValidation.categoryIdValidator, softDeleteCategoryById);

module.exports.router = router;
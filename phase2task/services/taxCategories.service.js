const { to, ReS, ReE, TE } = require('../global_functions');
const TaxCategories = require('../models').taxCategories;
const TaxZonesMapping = require('../models').taxZoneMapping;

/**
 * Original Author : DEEPAASREE VK
 * Author          : DEEPAASREE VK
 * Created On      : 22-05-2023
 * Modified on     : 22-05-2023
 * Function        : createCategory
 * Method createCategory which is used to Create a new Tax Category by MApping it with Zone Mappings 
 * @param {*} body it hold the details about TaxCategory and zoneMapping details 
 * @returns if data fetched then return else run null or error message
 */

const zoneMapping = async function(obj, tId) {
    let forZoneMap;
    if(obj.taxFor === "SPECIFIC_ZONE"){
        forZoneMap = true;
    }
    if(obj.taxFor === "SPECIFIC_POSTAL_CODE"){
        forZoneMap = false;
    }
    let [err, data] = await to(TaxZonesMapping.create({
        zoneName: obj.zoneName,
        zipCode: obj.zipCode,
        isForZoneMap: ZoneMap,
        taxPercent: obj.taxPercentobj,
        storeId: obj.storeId,
        taxCategoryId: tId
    }));
    if (err) return TE(err.message);
    if (data) return data
}
module.exports.zoneMapping = zoneMapping

/**
 * Original Author : DEEPAASREE VK
 * Author          : DEEPAASREE VK
 * Created On      : 22-05-2023
 * Modified on     : 22-05-2023
 * Function        : getAllCategories
 * Method getAllCategories which is used to find all the catgories 
 * @param {*} body it hold the details about TaxCategory and zoneMapping details 
 * @returns if data fetched then return else run null or error message
 */

const getAllCategories = async function () {
    let [error, categories] = await to(TaxCategories.findAll())
    if (error) TE("Couldn't find all Categories");
    return categories;
}
module.exports.getAllCategories = getAllCategories;

/**
 * Original Author : DEEPAASREE VK
 * Author          : DEEPAASREE VK
 * Created On      : 22-05-2023
 * Modified on     : 22-05-2023
 * Function        : editCategory
 * Method editCategory which is used to update the category based on id
 * @param {*} categoryId it hold the details about ID of the Tax Category
 * @param {*} categoryData it holds the details of the Values to be Edited
 * @returns if data fetched then return else run null or error message
 */

const editCategory = async function (categoryId, categoryData) {
    let [error, editData] = await to(TaxCategories.findByPk(categoryId));
    if (error) return TE(error.message);
    if (!editData) return TE('Category Not Found');
    if (editData) {
        editData.name = categoryData.name;
    }
    await editData.save();
    return editData;
}
module.exports.editCategory = editCategory;

/**
 * Original Author : DEEPAASREE VK
 * Author          : DEEPAASREE VK
 * Created On      : 22-05-2023
 * Modified on     : 22-05-2023
 * Function        : editCategory
 * Method editCategory which is used to update the category based on id
 * @param {*} categoryId it hold the details about ID of the Tax Category
 * @param {*} categoryData it holds the details of the Values to be Edited
 * @returns if data fetched then return else run null or error message
 */

const softDeleteCategoryById = async function (id) {
    if (id) {
        let [err, deletedCategory] = await to(TaxCategories.update(
            { isDeleted: true }, { where: { id } }
        ));
        if (err) return TE(err.message);
        return deletedCategory;
    }
}
module.exports.softDeleteCategoryById = softDeleteCategoryById;

const a = "Deepaasree"
console.log(a);
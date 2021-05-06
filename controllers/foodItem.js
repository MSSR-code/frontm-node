const uuidv4 = require('uuid/v4');
const FoodItem = require('../models/FoodItem');
const customValidator = require('../utils/customValidator');

/**
 * Add Food Item Controller
 */
exports.addFoodItem = (req, res, next) => {
    const validationErrors = [];
    
    customValidator.validationWrapper(req.body, validationErrors, "foodItemName", 0,120);
    customValidator.validationWrapper(req.body, validationErrors, "foodItemCategory", undefined , 120);
    customValidator.validationWrapper(req.body, validationErrors, "foodItemCuisine", undefined , 120);
    customValidator.validationWrapper(req.body, validationErrors, "foodItemPrice");

    if (validationErrors.length) {
        return next(validationErrors);
    }

    const foodItem = new FoodItem({
        foodId: uuidv4(),
        name: req.body.foodItemName,
        category: req.body.foodItemCategory,
        cuisine: req.body.foodItemCuisine,
        price: req.body.foodItemPrice,
        active: req.body.foodItemActive || false,
    });

    foodItem.save()
        .then(() => {
            res.status(200).send({
                message: 'Successfully Created Food Item',
                foodId: foodItem.foodId
            });
        })
        .catch(err => {
            return next({ message: err });
        });
};

/**
 * Update Food Item Controller
 */
exports.updateFoodItem = (req, res, next) => {
    const validationErrors = [];
    let foodItemUpdateObj = {}

    customValidator.validationWrapper(req.body, validationErrors, "foodId");

    if("foodItemName" in req.body ) {
        customValidator.validationWrapper(req.body, validationErrors, "foodItemName", 0,120);
        foodItemUpdateObj.name = req.body.foodItemName
    }
    if("foodItemCategory" in req.body ) {
        customValidator.validationWrapper(req.body, validationErrors, "foodItemCategory", undefined,120);
        foodItemUpdateObj.category = req.body.foodItemCategory
    }
    if("foodItemCuisine" in req.body ) {
        customValidator.validationWrapper(req.body, validationErrors, "foodItemCuisine", undefined,120);
        foodItemUpdateObj.cuisine = req.body.foodItemCuisine
    }
    if("foodItemPrice" in req.body ) {
        customValidator.validationWrapper(req.body, validationErrors, "foodItemPrice");
        foodItemUpdateObj.price = req.body.foodItemPrice
    }
    if("foodItemActive" in req.body ) {
        customValidator.validationWrapper(req.body, validationErrors, "foodItemActive");
        foodItemUpdateObj.active = req.body.foodItemActive
    }

    if (validationErrors.length) {
        return next(validationErrors);
    }

    FoodItem.findOneAndUpdate(
        { foodId: req.body.foodId},
        foodItemUpdateObj,
        { new: true }
    )
        .then(foodItem => {
            if (!foodItem) {
                return next({
                    message: 'Food Item not found with the foodId',
                });
            }
            res.status(200).send({
                message: 'Updated Food Item Data Successfully',
            });
        })
        .catch(err => {
            return next({ message: err });
        });
};

/**
 * Delete Food Item Controller
 */
exports.deleteFoodItem = (req, res, next) => {
    const validationErrors = [];
    
    customValidator.validationWrapper(req.body, validationErrors, "foodId");

    if (validationErrors.length) {
        return next(validationErrors);
    }

    FoodItem.findOneAndDelete({
        foodId: req.body.foodId
    })
        .then(foodItem => {
            if (!foodItem) {
                return next({
                    message: 'No food item found with the foodId',
                });
            }
            res.status(200).send({
                message: 'Deleted Food Item Data Successfully',
            });
        })
        .catch(err => {
            return next({ message: err });
        });
};

/**
 * Get Food Item Controller
 */
exports.getFoodItem = (req, res, next) => {
    const validationErrors = [];
    
    customValidator.validationWrapper(req.query, validationErrors, "foodId");

    if (validationErrors.length) {
        return next(validationErrors);
    }

    FoodItem.findOne(
        { foodId: req.query.foodId },
        { _id: 0, __v: 0, foodId: 0 }
    )
        .then(foodItemData => {
            if (!foodItemData) {
                return next({
                    message: 'No food item found with the foodId',
                });
            }
            res.status(200).send({
                message: 'Fetched Food Item Data Successfully',
                data: foodItemData,
            });
        })
        .catch(err => {
            return next({ message: err });
        });
};


/**
 * Food Items Search Controller
 */
exports.searchFoodItems = (req, res, next) => {

    console.log(req.query,(new Date()).toUTCString());

    const validationErrors = [];
    let searchObj = {}
    let sortObj = { _id: 1}

    customValidator.validationWrapper(req.query, validationErrors, "searchParam");

    if(req.query.searchParam != "") {
        searchObj.$text = { $search: req.query.searchParam }
    }
    
    if("sort" in req.query) {
        if(req.query.sort == "DSC") {
            sortObj._id = -1;
        }
        else if(req.query.sort != "ASC") {
            validationErrors.push({ message: 'Improper sort parameter. Use ASC or DSC'});
        }
    }
    
    if("priceFrom" in req.query) {
        searchObj.price = {$gte: req.query.priceFrom};
    }
    
    if("priceTo" in req.query) {
        searchObj.price = {$lte: req.query.priceTo};
    }

    if("paginateFrom" in req.query && req.query.pagniateFrom < 1 ) {
        validationErrors.push({ message: 'Invalid paginateFrom paramenter. Min: 1'});
    }
    
    if (validationErrors.length) {
        return next(validationErrors);
    }

    var query = FoodItem.find( searchObj, { _id: 0, __v: 0 }).sort(sortObj)
        if("paginateFrom" in req.query) {
            query.skip(parseInt(req.query.paginateFrom,10)-1)
        }
        if("paginateTo" in req.query) {
            query.limit(parseInt(req.query.paginateTo,10))
        }
        query.then(foodItemData => {
            if (!foodItemData) {
                return next({
                    message: 'No food items found with the parameters',
                });
            }
            res.status(200).send({
                message: 'Fetched food Items Data Successfully',
                data: foodItemData,
            });
        })
        .catch(err => {
            return next({ message: err });
        });
};


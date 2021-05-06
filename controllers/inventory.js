const customValidator = require('../utils/customValidator');

/**
 * Update Inventory Controller
 */
exports.updateInventory = (req, res, next) => {
    const validationErrors = [];
    

    customValidator.validationWrapper(req.body, validationErrors, "inventory");

    if(!Array.isArray(req.body.inventory)){
        validationErrors.push({ message: 'Invalid inventory type'});
    } else if(req.body.inventory.length == 0){
        validationErrors.push({ message: 'Empty Inventory'});
    } 

    let addItems = [];
    let errorItems = [];

    for(foodItemIdx in req.body.inventory) {
        if('foodId' in req.body.inventory[foodItemIdx]) {
            if('quantity' in req.body.inventory[foodItemIdx] && req.body.inventory[foodItemIdx].quantity > 0 ) {
                addItems.push(req.body.inventory[foodItemIdx].foodId, req.body.inventory[foodItemIdx].quantity);
            } else {
                errorItems.push(req.body.inventory[foodItemIdx].foodId);
            }
        }
    }

    if (validationErrors.length) {
        return next(validationErrors);
    }

    req.redis.hmset('inventory', ...addItems);

    let sendObj = {
        message: 'Successfully Updated the Inventory.'
    };

    if(errorItems.length > 0) {
        sendObj.message += ' Some Ids Missed out';
        sendObj.errorFoodIds = errorItems;
    }

    res.status(200).send(sendObj);

};

/**
 * Get Inventory Status Controller
 */
 exports.getFoodIteminInventory = (req, res, next) => {
    const validationErrors = [];
    

    customValidator.validationWrapper(req.query, validationErrors, "foodId");

    if (validationErrors.length) {
        return next(validationErrors);
    }

    req.redis.hget('inventory', req.query.foodId ,function(err, foodItemQuantity) {
        if(err) {
            return next({ message: err });
        }

        if(foodItemQuantity == null) {
            return res.status(200).send({
                message: 'No Food Available with foodId'
            });    
        }

        res.status(200).send({
            message: 'Successfully fetched quantity',
            quantity: foodItemQuantity
        });
    });

};

/**
 * Delete Food Item in Inventory
 */
 exports.deleteFoodIteminInventory = (req, res, next) => {
    const validationErrors = [];
    
    customValidator.validationWrapper(req.query, validationErrors, "foodId");

    if (validationErrors.length) {
        return next(validationErrors);
    }

    req.redis.hdel('inventory', req.query.foodId ,function(err, result) {
        if(err) {
            return next({ message: err });
        }

        if(result == 1) {
            res.status(200).send({
                message: 'Successfully deleted food item'
            });
        }
        else {
            res.status(200).send({
                message: 'No Food quantity Available with foodId'
            });    
        }

        
    });
};

/**
 * Get Inventory Status Controller
 */
 exports.getInventoryStatus = (req, res, next) => {

    req.redis.hgetall('inventory',function(err, result) {
        if(err) {
            return next({ message: err });
        }

        if(result == null) {
            return res.status(200).send({
                message: 'Inventory is empty.'
            });    
        }

        res.status(200).send({
            message: 'Successfully fetched quantity',
            inventory: result
        });
    });

};
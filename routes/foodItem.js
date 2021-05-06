const foodItemRoutes = require('express').Router();
const foodItemController = require('../controllers/foodItem');

foodItemRoutes.get('/', (req, res) => {
    res.status(200).send({
        message: 'Food Item Api.',
    });
});

/**
 * @api {put} /addFoodItem
 * @apiName Add Food Item
 */
foodItemRoutes.put('/addFoodItem', foodItemController.addFoodItem);

/**
 * @api {put} /updateFoodItem
 * @apiName Update Food Item
 */
foodItemRoutes.patch('/updateFoodItem', foodItemController.updateFoodItem);

/**
 * @api {delete} /deleteFoodItem
 * @apiName Delete Food Item
 */
foodItemRoutes.delete('/deleteFoodItem', foodItemController.deleteFoodItem);

/**
 * @api {get} /getFoodItem
 * @apiName Get Food Item
 */
foodItemRoutes.get('/getFoodItem', foodItemController.getFoodItem);

/**
 * @api {get} /searchFoodItems
 * @apiName Search for all food Items
 */
foodItemRoutes.get('/searchFoodItems', foodItemController.searchFoodItems);


module.exports = foodItemRoutes;

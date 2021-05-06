const inventoryRoutes = require('express').Router();
const inventoryController = require('../controllers/inventory');

inventoryRoutes.get('/', (req, res) => {
    res.status(200).send({
        message: 'Inventory Api',
    });
});

/**
 * @api {put} /updateInventory
 * @apiName Update Inventory
 */
inventoryRoutes.patch('/updateInventory', inventoryController.updateInventory);

/**
 * @api {delete} /deleteFoodItem
 * @apiName Delete Food Item in Inventory
 */
inventoryRoutes.delete('/deleteFoodItem', inventoryController.deleteFoodIteminInventory);

/**
 * @api {get} /getFoodItemQuantity
 * @apiName Get Food Item Quantity in Inventory
 */
inventoryRoutes.get('/getFoodItemQuantity', inventoryController.getFoodIteminInventory);

/**
 * @api {get} /getInventoryStatus
 * @apiName Get all available food items in Inventory
 */
inventoryRoutes.get('/getInventoryStatus', inventoryController.getInventoryStatus);


module.exports = inventoryRoutes;

const orderRoutes = require('express').Router();
const orderController = require('../controllers/order');

orderRoutes.get('/', (req, res) => {
    res.status(200).send({
        message: 'Order Food Item Api.',
    });
});

/**
 * @api {put} /addOrder
 * @apiName Add Food Item Order
 */
orderRoutes.put('/addOrder', orderController.addOrder);

/**
 * @api {get} /getOrder
 * @apiName Get Order
 */
orderRoutes.get('/getOrder', orderController.getOrder);


module.exports = orderRoutes;

const uuidv4 = require('uuid/v4');
const Order = require('../models/Order');
const customValidator = require('../utils/customValidator');

/**
 * Add Food Order Controller
 */
exports.addOrder = (req, res, next) => {
    const validationErrors = [];
    
    customValidator.validationWrapper(req.body, validationErrors, "orderedItems");

    if(!Array.isArray(req.body.orderedItems)){
        validationErrors.push({ message: 'Invalid orderedItems Type'});
    } else if(req.body.orderedItems.length == 0){
        validationErrors.push({ message: 'Empty Ordered Items'});
    } 

    if (validationErrors.length) {
        return next(validationErrors);
    }

    orderedIds = [];
    orderedIdsFull = [];
    errorIds = [];
    unavailableIds = [];
    
    for(itemIndex in req.body.orderedItems) {
        orderedIds.push(req.body.orderedItems[itemIndex].foodId);
        orderedIdsFull.push(req.body.orderedItems[itemIndex].foodId, req.body.orderedItems[itemIndex].quantity);
    }

    req.redis.hmget('inventory', orderedIds,function(err, availableItems) {
        if(err) {
            return next({ message: err });
        }

        for(orderIndex in req.body.orderedItems) {
            if(availableItems[orderIndex] == null) {
                errorIds.push(req.body.orderedItems[orderIndex].foodId);
                continue;
            }

            if(req.body.orderedItems[orderIndex].quantity > availableItems[orderIndex]) {
                unavailableIds.push(req.body.orderedItems[orderIndex].foodId);
            }
            orderedIdsFull[(2*orderIndex)+1] = availableItems[orderIndex]- orderedIdsFull[(2*orderIndex)+1];
        }
        
        if(unavailableIds.length || errorIds.length) {
            return res.status(200).send({
                message: 'Error in placing order',
                errorIds: unavailableIds.concat(errorIds)
            });   
        }

        const order = new Order({
            orderId: uuidv4(),
            name: req.body.customerName,
            order: req.body.orderedItems
        });

        order.save()
            .then(() => {
                
                req.redis.hmset('inventory', ...orderedIdsFull);
                
                res.status(200).send({
                    message: 'Successfully Created Order',
                    orderId: order.orderId
                });
            })
            .catch(err => {
                return next({ message: err });
            });
    });
};


/**
 * Get Order Controller
 */
 exports.getOrder = (req, res, next) => {
    const validationErrors = [];
    
    customValidator.validationWrapper(req.query, validationErrors, "orderId");

    if (validationErrors.length) {
        return next(validationErrors);
    }

    Order.findOne(
        { orderId: req.query.orderId },
        { _id: 0, __v: 0, orderId: 0 }
    )
        .then((orderData,err) => {
            if (!orderData) {
                return next({
                    message: 'No order found with the orderId',
                });
            }
            res.status(200).send({
                message: 'Fetched Order Data Successfully',
                data: orderData,
            });
        })
        .catch(err => {
            return next({ message: err });
        });
};

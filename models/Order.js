const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderId: { type: String, unique: true },
        order: Array,
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

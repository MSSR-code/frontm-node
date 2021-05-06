const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema(
    {
        foodId: { type: String, unique: true },
        name: String,
        category: String,
        cuisine: String,
        price: Number,
        active: Boolean
    },
    { timestamps: true }
);

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;

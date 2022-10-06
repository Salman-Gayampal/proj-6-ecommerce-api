const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    ordersCart: [
        {
            productId: {
                type: String,
                required: [true, "Please enter the product ID."]
            },
            quantity: {
                type: Number,
                required: [true, "Please enter quantity."]
            },
            totalAmount: {
                type: Number,
                required: [true, "Total must not be empty."]
            },
            purchasedOn: {
                type: Date,
                default: new Date()
            }
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
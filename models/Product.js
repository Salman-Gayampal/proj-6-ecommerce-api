const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter the product name."]
	},
	description: {
		type: String,
		required: [true, "Please enter a description"]
	},
	price: {
		type: Number,
		required: [true, "Please enter a price"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	orders: [
		{
			userId: {
				type: String,
				required: [true, "UserID is required"]
			},
            purchasedOn: {
                type: Date,
                default: new Date()
            }
			
		}
	]
});

module.exports = mongoose.model("Product", productSchema);
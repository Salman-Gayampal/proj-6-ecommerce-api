const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const auth = require('../auth');

// CREATE PRODUCT - ADMIN ACCESS
module.exports.createProduct = async (reqBody, isAdminData) => {
	if (isAdminData == true) {
		let newProduct = new Product({
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price
		});
		return newProduct.save().then((product, error) => {
			if (error) {
				return false
			} else {
				return `${true} === Product was created!`
			}
		})
	} else {
		return `${false} === This action requires an administrator access!`
	}
};

// RETRIEVE ALL ACTIVE PRODUCTS
module.exports.getAllProducts = () => {
	return Product.find({ isActive: true }).then(result => {
		return result
	})
};

// RETRIEVE SINGLE PRODUCT
module.exports.getSingleProduct = (reqParams) => {
	return Product.findById(reqParams.productId).then(result => {
		return result
	})
};

// UPDATE PRODUCT - ADMIN ACCESS
module.exports.updateProduct = async (reqParams, reqBody, data) => {
	if (data.isAdmin === true) {
		let updatedProduct = {
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price
		}
		return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product, error) => {
			if (error) {
				return false
			} else {
				return true
			}
		})
	} else {
		return "This action requires Admin Access!"
	}
};

// ARCHIVE PRODUCT - ADMIN ACCESS
module.exports.archiveProduct = async (data) => {
	return Product.findById(data.productId).then((result, error) => {
		if (data.payload === true) {
			result.isActive = false
			return result.save().then((archivedProduct, error) => {
				if (error) {
					return false
				} else {
					return true
				}
			})
		} else {
			return "This action requires Admin Access!"
		}
	})
};


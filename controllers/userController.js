const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const auth = require('../auth');

// USER REGISTRATION 
module.exports.registerUser = async(reqBody) => {

    let isEmailTaken = await User.find({
        email: reqBody.email
    })
    if (isEmailTaken.length){
        return  "The email address you have provided is already taken!"
    } else{

    let newUser = new User({
        email: reqBody.email,
        password: bcrypt.hashSync(reqBody.password, 10)
    })
    
    return await newUser.save().then((user, error) => {
        if (error) {
            return false
        } else {
            return `${true} === Successfully Registered! === ${user}`
            
        }
    })
    }
};

// USER AUTHENTICATION - LOGIN
module.exports.loginUser = (reqBody) => {
    return User.findOne({ email: reqBody.email }).then(result => {
        if (result == null) {
            return `${false} === Please enter your email address`
        } else {
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)
            if (isPasswordCorrect) {
                return { access: auth.createAccessToken(result) }
            } else {
                return `${false} === Your email address and password doesn't match.`
            }
        }
    })
};

// SET USER AS ADMIN - ADMIN ACCESS
module.exports.setUserToAdmin = (data) => {
    return User.findById(data.userId).then((result, error) => {

        if (data.payload) {
            result.isAdmin = true

            return result.save().then((updatedUser, error) => {
                if (error) {
                    return false
                } else {
                    return `${true} === User is now an admin.`
                }
            })
        } else {
            return `${false} === This action requires admin access!`
        }
    })
};

// PLACE ORDER - USER ACCESS
module.exports.userOrder = async (data) => {
    if (data.isAdmin == true) {
        return "Admins are not eligible to place an order."
    } else {
        let isUserUpdated = await User.findById(data.userId).then(user => {
            let newTotalAmount = (data.totalAmount * data.quantity)
            user.ordersCart.push({ productId: data.productId, quantity: data.quantity, totalAmount: newTotalAmount });
            return user.save().then((user, error) => {
                if (error) {
                    return false
                } else {
                    return true
                }
            })
        })
        let isProductUpdated = await Product.findById(data.productId).then(product => {
            product.orders.push({ userId: data.userId })
            return product.save().then((product, error) => {
                if (error) {
                    return false
                } else {
                    return true
                }
            })
        })
        if (isUserUpdated && isProductUpdated) {
            return "Order Placed!"
        } else {
            return "Oops! There is an error."
        }
    }
};

// RETRIEVE USER DETAILS
module.exports.getUserDetails = (userData) => {
    return User.findById(userData.id)
        .then(result => {
            console.log(userData)
            if (result == null) {
                return false
            } else {
                console.log(result)
                result.password = "***********";
                return result
            }
        })
};

// RETRIEVE USER ORDERS
module.exports.getMyOrders = (reqParams, data) => {
	
	if(data){
		return User.findById(reqParams.userId).then(result => {
			return result.ordersCart
		})
	}
};

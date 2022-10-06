const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth');

// REGISTER ROUTE
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
});

// LOGIN ROUTE
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
});

// SET USER AS ADMIN ROUTE - ADMIN ONLY
router.put("/:userId/setAdmin", auth.verify, (req, res) => {
	const data = {
		userId: req.params.userId,
		payload: auth.decode(req.headers.authorization).isAdmin
	}
	userController.setUserToAdmin(data).then(resultFromController => res.send(resultFromController))
});

// PLACE ORDER ROUTE - USER ACCESS
router.post("/userOrders", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization)
	let data = {
		userId: userData.id,
		isAdmin: userData.isAdmin,
		productId: req.body.productId,
		totalAmount: req.body.totalAmount,
		quantity: req.body.quantity
	}
	userController.userOrder(data).then(resultFromController => res.send(resultFromController))
});

// RETRIEVE USER DETAILS
router.get("/details", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)
	console.log(userData)

	userController.getUserDetails({ id: userData.id })
		.then(resultFromController =>
			res.send(resultFromController))
});

// RETRIEVE USER ORDERS
router.get("/:userId/myOrders", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization)

	let data = {
		userId: userData.id
	}

	userController.getMyOrders(req.params, data).then(resultFromController => res.send(resultFromController))
});


module.exports = router;
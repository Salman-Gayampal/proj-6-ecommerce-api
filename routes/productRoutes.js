const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../auth');

// CREATE A PRODUCT - ADMIN ACCESS
router.post("/", auth.verify, (req, res) => {

	const isAdminData = auth.decode(req.headers.authorization).isAdmin;
	console.log(isAdminData)
	productController.createProduct(req.body, isAdminData).then(resultFromController => res.send(resultFromController))
});

// RETRIEVE ALL ACTIVE PRODUCTS
router.get("/all", (req, res) => {
	productController.getAllProducts().then(resultFromController => res.send(resultFromController))
});

// RETRIEVE SINGLE PRODUCT
router.get("/:productId", (req, res) => {
	productController.getSingleProduct(req.params).then(resultFromController => res.send(resultFromController))
});

// UPDATE PRODUCT - ADMIN ACCESS
router.put("/:productId", auth.verify, (req, res) => {

	const data = auth.decode(req.headers.authorization)
	productController.updateProduct(req.params, req.body, data).then(resultFromController => res.send(resultFromController))
});

// ARCHIVE PRODUCT - ADMIN ACCESS
router.put("/:productId/archive", auth.verify, (req, res) => {

	const data = {
		productId: req.params.productId,
		payload: auth.decode(req.headers.authorization).isAdmin
	}
	console.log(data)

	productController.archiveProduct(data).then(resultFromController => res.send(resultFromController))
});

module.exports = router;

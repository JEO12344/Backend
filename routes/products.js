const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const cartsController = require("../controllers/cartsControllers");


router.get('/', productsController.getAllProducts);
router.get('/:pid', productsController.getProductById);
router.post('/', productsController.createProduct);
router.put('/:pid', productsController.updateProduct);
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsControllers');

router.post('/', cartsController.createCart);
router.get('/:cid', cartsController.getCartProducts);
router.post('/:cid/products/:pid', cartsController.addProductToCart);
router.delete('/:cid/products/:pid', cartsController.removeProductFromCart);

module.exports = router;
